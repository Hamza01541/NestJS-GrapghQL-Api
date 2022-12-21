import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CurrencyTypeEnum } from "greenomy-common/common/enums";
import { BaseDto } from "src/lib/interfaces/base-dto";
import { BankingBookDto } from "../../banking-book/dto/banking-book.dto";
import { CommissionBookDto } from "../../commission-book/dto/commission-book.dto";
import { FinancialsDto } from "../../dto/components/financials.dto";
import { OffBalanceBookDto } from "../../off-balance-book/dto/off-balance-book.dto";
import { TradingBookDto } from "../../trading-book/dto/trading-book.dto";

@InputType("CIProfileInputDto")
@ObjectType()
export class CIProfileDto extends BaseDto {
  @Field()
  name: string;

  @Field(() => CurrencyTypeEnum)
  country: CurrencyTypeEnum;

  @Field()
  lei: string;

  @Field()
  size: string;

  @Field(() => CurrencyTypeEnum, { nullable: true })
  currency?: CurrencyTypeEnum;

  @Field(() => FinancialsDto, { nullable: true })
  totalAssets?: FinancialsDto;

  @Field(() => FinancialsDto, { nullable: true })
  banksExposure?: FinancialsDto;

  @Field(() => FinancialsDto, { nullable: true })
  totalSovereignExposures?: FinancialsDto;

  @Field(() => FinancialsDto, { nullable: true })
  totalTradingBook?: FinancialsDto;

  @Field()
  year: string;

  @Field(() => BankingBookDto, { nullable: true })
  bankingBook?: BankingBookDto;

  @Field(() => TradingBookDto, { nullable: true })
  tradingBook?: TradingBookDto;

  @Field(() => OffBalanceBookDto, { nullable: true })
  offBalanceBook?: OffBalanceBookDto;

  @Field(() => CommissionBookDto, { nullable: true })
  commissionBook?: CommissionBookDto;
}
