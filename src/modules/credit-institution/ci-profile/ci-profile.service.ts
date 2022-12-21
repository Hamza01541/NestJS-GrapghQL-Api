import { Injectable } from "@nestjs/common";
import { Args } from "@nestjs/graphql";
import { v4 as uuid } from "uuid";
import { CIProfileRepository } from "./dal/ci-profile.repository";
import { CIProfileDto } from "./dto/ci-profile.dto";
import { NewCreditInstitutionProfileInput } from "../dto/inputs/new-ci-profile.input.dto";
import { GetCIProfileInputDto } from "../dto/inputs/get-profile-args";
import { BankingBookInput } from "../dto/inputs/ci-profile-inputs/banking-book-input";
import { TradingBookInput } from "../dto/inputs/ci-profile-inputs/trading-book-input";
import { OffBalanceBookInput } from "../dto/inputs/ci-profile-inputs/off-balance-book-input";
import { CommissionBookInput } from "../dto/inputs/ci-profile-inputs/commission-book-input";
import { BooksEnum } from "../dto/enums/books.enum";
import { BankingBookFinancialAssetInput } from "../dto/inputs/ci-profile-inputs/banking-book-financial-asset-input";
import { TradingBookFinancialAssetInput } from "../dto/inputs/ci-profile-inputs/trading-book-financial-asset-input";
import { CommissionBookFinancialAssetInput } from "../dto/inputs/ci-profile-inputs/commission-book-financial-asset-input";
import { OffBalanceBookFinancialAssetInput } from "../dto/inputs/ci-profile-inputs/off-balance-book-financial-asset-input";
import { EditCreditInstitionProfileInput } from "../dto/inputs/edit-ci-profile.input.dto";
import { BankingBookFinancialAssetDto } from "../banking-book/dto/bb-financial-asset.dto";
import { TradingBookFinancialAssetDto } from "../trading-book/dto/tb-financial-asset";
import { CommissionBookFinancialAssetDto } from "../commission-book/dto/cb-financial-asset.dto";
import { OffBalanceBookFinancialAssetDto } from "../off-balance-book/dto/obb-financial-asset.dto";

@Injectable()
export class CIProfileService {
  constructor(private readonly _ciProfileRepository: CIProfileRepository) {}

  getOne(
    @Args() args: GetCIProfileInputDto
  ): Promise<CIProfileDto | undefined> {
    const { year, organisationId } = args;

    const query: any = { organisationId };
    if (year) query.year = year;

    return this._ciProfileRepository.findOne({ query });
  }

  getMany(
    @Args() args: GetCIProfileInputDto
  ): Promise<CIProfileDto[] | undefined> {
    const { years, organisationId } = args;

    const query: any = { organisationId };
    if (years) query.year = { $in: years };

    return this._ciProfileRepository.findMany({ query });
  }

  createOne(
    input: NewCreditInstitutionProfileInput,
    creditInstitutionId: string
  ): Promise<CIProfileDto> {
    return this._ciProfileRepository.createOne({
      payload: {
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
        organisationId: creditInstitutionId,
        _id: uuid(),
      },
    });
  }

  editOne(
    id: string,
    input: EditCreditInstitionProfileInput
  ): Promise<CIProfileDto | undefined> {
    return this._ciProfileRepository.updateOne({
      query: { _id: id },
      payload: { $set: { ...input, updatedAt: new Date() } },
    });
  }

  editBookFormData(
    id: string,
    input:
      | BankingBookInput
      | TradingBookInput
      | CommissionBookInput
      | OffBalanceBookInput,
    book: BooksEnum
  ): Promise<CIProfileDto | undefined> {
    return this._ciProfileRepository.updateOne({
      query: { _id: id },
      payload: { $set: { [`${book}.formData`]: input }, updatedAt: new Date() },
    });
  }

  addBookFinancialAsset(
    id: string,
    input:
      | BankingBookFinancialAssetDto
      | TradingBookFinancialAssetDto
      | CommissionBookFinancialAssetDto
      | OffBalanceBookFinancialAssetDto,
    book: BooksEnum
  ): Promise<CIProfileDto | undefined> {
    return this._ciProfileRepository.updateOne({
      query: { _id: id },
      payload: {
        $set: {
          $push: { [`${book}.financialAssets`]: input },
          updatedAt: new Date(),
        },
      },
    });
  }

  editBookFinancialAsset(
    id: string,
    financialAssetId: string,
    input:
      | BankingBookFinancialAssetInput
      | TradingBookFinancialAssetInput
      | CommissionBookFinancialAssetInput
      | OffBalanceBookFinancialAssetInput,
    book: BooksEnum
  ): Promise<CIProfileDto | undefined> {
    const toReturn = this._ciProfileRepository.updateOne({
      query: { _id: id, [`${book}.financialAssets`]: financialAssetId },
      payload: {
        $set: { [`${book}.financialAssets.$`]: input, updatedAt: new Date() },
      },
    });

    return toReturn;
  }
}

export default CIProfileService;
