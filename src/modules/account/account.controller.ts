import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Me } from '../../lib/decorators/me.decorator';
import { Roles } from '../../lib/enums';
import { Auth } from '../../lib/decorators/auth.decorator';
import { UserSessionDto } from './dto/user-session.dto';
import { AccountService } from './account.service';
import { AccountDto } from './dto/account.dto';
import { GetAccountsArgsDto } from './dto/arguments/get-accounts-arg.dto';
import { NewAccountInputDto } from './dto/inputs/new-account-input.dto';
import { EditAccountInputDto } from './dto/inputs/edit-account.dto';
import { PaginatedAccountsDto } from './dto/paginated-accounts.dto';

@Resolver(AccountDto)
@Injectable()
export class AccountController {
  constructor(private readonly _accountService: AccountService) {}

  @Mutation(() => AccountDto)
  register(@Args('input') input: NewAccountInputDto): Promise<AccountDto> {
    return this._accountService.register(input);
  }

  @Query(() => UserSessionDto)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserSessionDto> {
    return this._accountService.login(email, password);
  }

  @Query(() => AccountDto)
  @Auth()
  async me(@Me() account: AccountDto): Promise<AccountDto> {
    return account;
  }

  @Query(() => UserSessionDto)
  async refreshToken(@Args('refreshToken') refreshToken: string): Promise<UserSessionDto> {
    return this._accountService.refreshToken(refreshToken);
  }

  @Mutation(() => AccountDto)
  @Auth()
  async accountsEditSelf(
    @Me() account: AccountDto,
    @Args('input') input: EditAccountInputDto,
  ): Promise<AccountDto | undefined> {
    return this._accountService.accountsEditOne(account._id, input);
  }

  @Query(() => PaginatedAccountsDto)
  @Auth(Roles.ADMIN)
  async accounts(@Args() args: GetAccountsArgsDto): Promise<PaginatedAccountsDto> {
    return this._accountService.paginatedSearch(args);
  }
}

export default AccountController;
