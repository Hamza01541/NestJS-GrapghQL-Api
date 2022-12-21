import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { SortByDirection } from "../../lib/enums/sort-by-direction";
import {
  AccountAlreadyExistsError,
  BadCredentialsError,
  LoginFailedError,
  NewAccountValidationError,
  PasswordConfirmationError,
  RegisterNewAccountError,
  SignUpFailedError,
} from "../../lib/errors";
import { Roles } from "../../lib/enums";
import { AuthService } from "./auth.service";
import { UserSessionDto } from "./dto/user-session.dto";
import { AccountRepository } from "./dal/account.repository";
import { AccountDto } from "./dto/account.dto";
import { EditAccountInputDto } from "./dto/inputs/edit-account.dto";
import { NewAccountInputDto } from "./dto/inputs/new-account-input.dto";
import { GetAccountsArgsDto } from "./dto/arguments/get-accounts-arg.dto";

@Injectable()
export class AccountService {
  constructor(
    private readonly _accountRepository: AccountRepository,
    private readonly _authService: AuthService
  ) {}

  async register(
    info: NewAccountInputDto,
    roles: Roles[] = [Roles.USER]
  ): Promise<AccountDto> {
    if (info.password !== info.passwordConfirmation) {
      throw PasswordConfirmationError();
    }

    const AccountExists = await this._accountRepository.count({
      query: { email: info.email },
    });

    if (AccountExists) {
      throw AccountAlreadyExistsError();
    }

    try {
      const authAccount = await this._authService.createUser(
        info.email,
        info.password,
        true
      );

      return this._accountRepository.createOne({
        payload: {
          cognitoId: authAccount.uid,
          verified: true, // @TODO: @cle: implement sms verification
          email: info.email,
          firstName: info.firstName,
          lastName: info.lastName,
          country: info.country,
          gender: info.gender,
          birthDate: info.birthDate,
          phoneNumber: info.phoneNumber,
          hasAcceptedTerms: info.hasAcceptedTerms,
          roles,
          // settings: info.accountSettings,
          createdAt: new Date(),
          updatedAt: new Date(),
          _id: uuid(), // add _id to fix error from change objectId to string
        },
      });
    } catch (error) {
      if (SignUpFailedError.hasInstance(error)) {
        throw NewAccountValidationError();
      }

      throw RegisterNewAccountError();
    }
  }

  login(email: string, password: string): Promise<UserSessionDto> {
    try {
      return this._authService.loginWithEmailPassword(email, password);
    } catch (error) {
      if (BadCredentialsError.hasInstance(error)) {
        throw LoginFailedError();
      }

      throw error;
    }
  }
  
  accountsEditOne(
    id: string,
    input: EditAccountInputDto
  ): Promise<AccountDto | undefined> {
    return this._accountRepository.updateOne({
      query: { _id: id },
      payload: {
        $set: { ...input, updatedAt: new Date() },
      },
    });
  }

  paginatedSearch(opts: GetAccountsArgsDto) {
    const $skip = (opts.page - 1) * opts.limit;

    return this._accountRepository.paginatedSearch(opts.page, {
      $sort: opts.sortBy || { _id: SortByDirection.ASC },
      $limit: opts.limit,
      $skip,
      $match: opts.searchBy,
    });
  }
}

export default AccountService;
