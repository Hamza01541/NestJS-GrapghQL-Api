import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CommissionBookAmountAvailableDto } from "./cb-amount-available.dto";
import { CommissionBookFinancialAssetDto } from "./cb-financial-asset.dto";
import { CommissionBookFormDataDto } from "./cb-form-data.dto";

@InputType("CommissionBookInputDto")
@ObjectType()
export class CommissionBookDto {
  @Field(() => [CommissionBookFinancialAssetDto], { nullable: true })
  financialAssets?: CommissionBookFinancialAssetDto[];

  @Field(() => CommissionBookFormDataDto, { nullable: true })
  formData?: CommissionBookFormDataDto;

  @Field(() => CommissionBookAmountAvailableDto, { nullable: true })
  amountAvailable?: CommissionBookAmountAvailableDto;
}
