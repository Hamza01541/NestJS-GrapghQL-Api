import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { TradingBookAmountAvailableDto } from "./tb-amount-available";
import { TradingBookFinancialAssetDto } from "./tb-financial-asset";
import { TradingBookFormDataDto } from "./tb-form-data.dto";

@InputType("TradingOutputDto")
@ObjectType()
export class TradingBookDto {
  @Field(() => [TradingBookFinancialAssetDto], { nullable: true })
  financialAssets?: TradingBookFinancialAssetDto[];

  @Field(() => TradingBookFormDataDto, { nullable: true })
  formData?: TradingBookFormDataDto;

  @Field(() => TradingBookAmountAvailableDto, { nullable: true })
  amountAvailable?: TradingBookAmountAvailableDto;
}
