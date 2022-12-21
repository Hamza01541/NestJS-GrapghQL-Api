import { InputType, ObjectType, Field } from "@nestjs/graphql";
import { BaseFinancialAssetDto } from "../../dto/components/base-financial-asset";
import { FinancialsDto } from "../../dto/components/financials.dto";

@InputType("OffBalanceBookFinancialAssetInputDto")
@ObjectType()
export class OffBalanceBookFinancialAssetDto extends BaseFinancialAssetDto {
  @Field(() => Boolean, { nullable: true })
  reportRequested?: boolean;

  @Field(() => FinancialsDto)
  grossAmount: FinancialsDto;

  @Field({ nullable: true })
  guaranteeIsin?: string;
}
