import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BankingBookAmountAvailableDto } from "./bb-amount-available.dto";
import { BankingBookFinancialAssetDto } from "./bb-financial-asset.dto";
import { BankingBookFormDataDto } from "./bb-form-data.dto";

@InputType("BankingBookSchemaDto")
@ObjectType()
export class BankingBookDto {
  @Field(() => [BankingBookFinancialAssetDto], { nullable: true })
  financialAssets?: BankingBookFinancialAssetDto[];

  @Field(() => BankingBookFormDataDto, { nullable: true })
  formData?: BankingBookFormDataDto;

  @Field(() => BankingBookAmountAvailableDto, { nullable: true })
  amountAvailable?: BankingBookAmountAvailableDto;
}
