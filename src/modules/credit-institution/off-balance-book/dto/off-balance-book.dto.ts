import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { OffBalanceBookAmountAvailableDto } from "./obb-amount-available.dto";
import { OffBalanceBookFinancialAssetDto } from "./obb-financial-asset.dto";
import { OffBalanceBookFormDataDto } from "./obb-form-data.dto";

@InputType("OffBalanceBookInputDto")
@ObjectType()
export class OffBalanceBookDto {
  @Field(() => OffBalanceBookAmountAvailableDto, { nullable: true })
  amountAvailable?: OffBalanceBookAmountAvailableDto;

  @Field(() => [OffBalanceBookFinancialAssetDto], { nullable: true })
  financialAssets?: OffBalanceBookFinancialAssetDto[];

  @Field(() => OffBalanceBookFormDataDto, { nullable: true })
  formData?: OffBalanceBookFormDataDto;
}
