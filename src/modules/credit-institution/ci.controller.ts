import { Injectable } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreditInstitutionService } from "./ci.service";
import { CIProfileDto } from "./ci-profile/dto/ci-profile.dto";
import { CreditInstitutionDto } from "./dto/ci.dto";
import { NewCreditInstitutionProfileInput } from "./dto/inputs/new-ci-profile.input.dto";
import { BankingBookInput } from "./dto/inputs/ci-profile-inputs/banking-book-input";
import { TradingBookInput } from "./dto/inputs/ci-profile-inputs/trading-book-input";
import { OffBalanceBookInput } from "./dto/inputs/ci-profile-inputs/off-balance-book-input";
import { CommissionBookInput } from "./dto/inputs/ci-profile-inputs/commission-book-input";
import { BooksEnum } from "./dto/enums/books.enum";
import { BankingBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/banking-book-financial-asset-input";
import { TradingBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/trading-book-financial-asset-input";
import { EditCreditInstitionProfileInput } from "./dto/inputs/edit-ci-profile.input.dto";
import { OffBalanceBookFinancialAssetDto } from "./off-balance-book/dto/obb-financial-asset.dto";
import { CommissionBookFinancialAssetDto } from "./commission-book/dto/cb-financial-asset.dto";
import { CommissionBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/commission-book-financial-asset-input";
import { OffBalanceBookFinancialAssetInput } from "./dto/inputs/ci-profile-inputs/off-balance-book-financial-asset-input";
import { BankingBookFinancialAssetDto } from "./banking-book/dto/bb-financial-asset.dto";
import { TradingBookFinancialAssetDto } from "./trading-book/dto/tb-financial-asset";

@Resolver(CreditInstitutionDto)
@Injectable()
export class CreditInstitutionController {
  constructor(
    private readonly _creditInstitutionService: CreditInstitutionService
  ) {}

  /* QUERIES */
  @Query(() => CreditInstitutionDto, {
    nullable: true,
    description: "get one credit institution",
  })
  creditsInstitution(
    @Args("id", { description: "id of credit institution" }) id: string
  ): Promise<CreditInstitutionDto | undefined> {
    return this._creditInstitutionService.getOne(id);
  }

  /* MUTATIONS */
  @Mutation(() => CreditInstitutionDto, {
    description: "create credit institution",
  })
  createCreditInstitution(
    @Args("input") input: NewCreditInstitutionProfileInput
  ): Promise<CreditInstitutionDto | Error> {
    return this._creditInstitutionService.createOne(input);
  }

  @Mutation(() => CreditInstitutionDto, {
    description: "edit profile of credit institution",
  })
  editCreditInstitutionProfile(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: EditCreditInstitionProfileInput
  ): Promise<CreditInstitutionDto | undefined> {
    return this._creditInstitutionService.editProfile(id, year, input);
  }

  @Mutation(() => CIProfileDto, {
    description: "create/update banking book of profile",
  })
  handleBankingBook(
    @Args("id", { description: "if of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: BankingBookInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBook(
      id,
      year,
      input,
      BooksEnum.BANKING_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "create/update trading book of profile",
  })
  handleTradingBook(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: TradingBookInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBook(
      id,
      year,
      input,
      BooksEnum.TRADING_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "create/update off-balance book of profile",
  })
  handleOffBalanceBook(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: OffBalanceBookInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBook(
      id,
      year,
      input,
      BooksEnum.OFF_BALANCE_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "create/update commission book of profile",
  })
  handleCommissionBook(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: CommissionBookInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBook(
      id,
      year,
      input,
      BooksEnum.COMMISSION_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "add financial asset to banking book",
  })
  bankingBookAddFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: BankingBookFinancialAssetDto
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.addProfileBookFinancialAsset(
      id,
      year,
      input,
      BooksEnum.BANKING_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "add financial asset to trading book",
  })
  tradingBookAddFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: TradingBookFinancialAssetDto
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.addProfileBookFinancialAsset(
      id,
      year,
      input,
      BooksEnum.TRADING_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "add financial asset to off-balance book",
  })
  offBalanceBookAddFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: OffBalanceBookFinancialAssetDto
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.addProfileBookFinancialAsset(
      id,
      year,
      input,
      BooksEnum.OFF_BALANCE_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "add financial asset to commission book",
  })
  commissionBookAddFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("input") input: CommissionBookFinancialAssetDto
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.addProfileBookFinancialAsset(
      id,
      year,
      input,
      BooksEnum.COMMISSION_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "edit financial asset to banking book",
  })
  // FIXME: should only be able to edit financials of the asset -> purchaseAmount and salesAmount
  bankingBookEditFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("financialAssetId", { description: "id of financial asset" })
    financialAssetId: string,
    @Args("input") input: BankingBookFinancialAssetInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBookFinancialAsset(
      id,
      year,
      financialAssetId,
      input,
      BooksEnum.BANKING_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "edit financial asset to trading book",
  })
  tradingBookEditFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("financialAssetId", { description: "id of financial asset" })
    financialAssetId: string,
    @Args("input") input: TradingBookFinancialAssetInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBookFinancialAsset(
      id,
      year,
      financialAssetId,
      input,
      BooksEnum.TRADING_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "edit financial asset to commission book",
  })
  commissionBookEditFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("financialAssetId", { description: "id of financial asset" })
    financialAssetId: string,
    @Args("input") input: CommissionBookFinancialAssetInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBookFinancialAsset(
      id,
      year,
      financialAssetId,
      input,
      BooksEnum.COMMISSION_BOOK
    );
  }

  @Mutation(() => CIProfileDto, {
    description: "edit financial asset to off-balance book",
  })
  offBalanceBookEditFinancialAsset(
    @Args("id", { description: "id of credit institution" }) id: string,
    @Args("year", { description: "year of profile" }) year: string,
    @Args("financialAssetId", { description: "id of financial asset" })
    financialAssetId: string,
    @Args("input") input: OffBalanceBookFinancialAssetInput
  ): Promise<CIProfileDto | undefined> {
    return this._creditInstitutionService.editProfileBookFinancialAsset(
      id,
      year,
      financialAssetId,
      input,
      BooksEnum.OFF_BALANCE_BOOK
    );
  }
}
