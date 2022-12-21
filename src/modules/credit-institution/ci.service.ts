import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { find } from "lodash";
import { CIErrorProfileNotFound } from "src/lib/errors/credit-institution";
import { CreditInstitutionEntity } from "greenomy-common/credit-institution/dal/credit-institution-entity";
import { CreditInstitutionRepository } from "./dal/ci.repository";
import { CreditInstitutionDto } from "./dto/ci.dto";
import { CIProfileDto } from "./ci-profile/dto/ci-profile.dto";
import { CIProfileService } from "./ci-profile/ci-profile.service";
import { NewCreditInstitutionProfileInput } from "./dto/inputs/new-ci-profile.input.dto";
import { GetCIProfileInputDto } from "./dto/inputs/get-profile-args";
import { BankingBookInput } from "./dto/inputs/ci-profile-inputs/banking-book-input";
import { TradingBookInput } from "./dto/inputs/ci-profile-inputs/trading-book-input";
import { OffBalanceBookInput } from "./dto/inputs/ci-profile-inputs/off-balance-book-input";
import { CommissionBookInput } from "./dto/inputs/ci-profile-inputs/commission-book-input";
import { BooksEnum } from "./dto/enums/books.enum";
import { BankingBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/banking-book-financial-asset-input";
import { TradingBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/trading-book-financial-asset-input";
import { CommissionBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/commission-book-financial-asset-input";
import { OffBalanceBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/off-balance-book-financial-asset-input";
import { EditCreditInstitionProfileInput } from "./dto/inputs/edit-ci-profile.input.dto";
import { BankingBookFinancialAssetDto } from "./banking-book/dto/bb-financial-asset.dto";
import { TradingBookFinancialAssetDto } from "./trading-book/dto/tb-financial-asset";
import { CommissionBookFinancialAssetDto } from "./commission-book/dto/cb-financial-asset.dto";
import { OffBalanceBookFinancialAssetDto } from "./off-balance-book/dto/obb-financial-asset.dto";

@Injectable()
export class CreditInstitutionService {
  private _ciProfileRepository: any;

  constructor(
    private readonly _creditInstitutionRepository: CreditInstitutionRepository,
    private readonly _ciProfileService: CIProfileService
  ) {}

  getOne(id: string): Promise<CreditInstitutionDto | undefined> {
    return this._creditInstitutionRepository.findOne({ query: { _id: id } });
  }

  profile(args: GetCIProfileInputDto): Promise<CIProfileDto | undefined> {
    return this._ciProfileService.getOne(args);
  }

  profiles(args: GetCIProfileInputDto): Promise<CIProfileDto[] | undefined> {
    return this._ciProfileService.getMany(args);
  }

  async createOne(
    input: NewCreditInstitutionProfileInput
  ): Promise<CreditInstitutionDto | Error> {
    // 1. create profile
    // 2. create credit institution + add profile id & year
    const id = uuid();

    const payload: CreditInstitutionEntity = {
      profiles: [],
      _id: id,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    return this._ciProfileService.createOne(input, id).then((profile) => {
      payload.profiles?.push({ profileId: profile._id, year: profile.year });
      return this._creditInstitutionRepository.createOne({ payload });
    });

    // await this._creditInstitutionRepository.transaction(async(ci) => {
    //     const profile = await this._ciProfileService.createOne(input, id);

    //         payload.profiles?.push({ profileId: profile._id, year: profile.year });

    //         await ci.createOne({ payload });
    // });

    // return payload;
  }

  async editProfile(
    id: string, // id of credit institution
    year: string, // year of profile
    input: NewCreditInstitutionProfileInput | EditCreditInstitionProfileInput
  ): Promise<CreditInstitutionDto | undefined> {
    // 1. get credit institution
    const creditInstitution = await this._creditInstitutionRepository.findOne({
      query: { _id: id },
    });

    // 2. edit profile with corresponding year
    const profile = find(creditInstitution?.profiles, { year });

    if (!profile) throw CIErrorProfileNotFound();

    await this._ciProfileService.editOne(profile.profileId, input);

    // 3. return credit institution
    return creditInstitution;
  }

  async editProfileBook(
    id: string,
    year: string,
    input:
      | BankingBookInput
      | TradingBookInput
      | CommissionBookInput
      | OffBalanceBookInput,
    book: BooksEnum
  ): Promise<CIProfileDto | undefined> {
    // TODO: adapt structure ?

    // 1. get credit institution
    const creditInstitution = await this._creditInstitutionRepository.findOne({
      query: { _id: id },
    });

    // 2. get profileId from corresponding year
    const profile = find(creditInstitution?.profiles, { year });

    if (!profile) throw CIErrorProfileNotFound();

    // 3. edit corresponding book
    return this._ciProfileService.editBookFormData(
      profile.profileId,
      input,
      book
    );
  }

  async addProfileBookFinancialAsset(
    id: string,
    year: string,
    input:
      | BankingBookFinancialAssetDto
      | TradingBookFinancialAssetDto
      | CommissionBookFinancialAssetDto
      | OffBalanceBookFinancialAssetDto,
    book: BooksEnum
  ): Promise<CIProfileDto | undefined> {
    // 1. get credit institution
    const creditInstitution = await this._creditInstitutionRepository.findOne({
      query: { _id: id },
    });

    // 2. get profileId from corresponding year
    const profile = find(creditInstitution?.profiles, { year });

    if (!profile) throw CIErrorProfileNotFound();

    // 3. edit corresponding book
    return this._ciProfileService.addBookFinancialAsset(
      profile.profileId,
      input,
      book
    );
  }

  async editProfileBookFinancialAsset(
    id: string,
    year: string,
    financialAssetId: string,
    input:
      | BankingBookFinancialAssetInput
      | TradingBookFinancialAssetInput
      | CommissionBookFinancialAssetInput
      | OffBalanceBookFinancialAssetInput,
    book: BooksEnum
  ): Promise<CIProfileDto | undefined> {
    // 1. get credit institution
    const creditInstitution = await this._creditInstitutionRepository.findOne({
      query: { _id: id },
    });

    // 2. get profileId from corresponding year
    const profile = find(creditInstitution?.profiles, { year });

    if (!profile) throw CIErrorProfileNotFound();

    // 3. edit corresponding book
    return this._ciProfileService.editBookFinancialAsset(
      profile?.profileId,
      financialAssetId,
      input,
      book
    );
  }
}

export default CreditInstitutionService;
