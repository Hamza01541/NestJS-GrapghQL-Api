import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BaseFinancialAssetDto } from "../../dto/components/base-financial-asset";
import { FinancialsDto } from "../../dto/components/financials.dto";
import { FinancialServiceTypeEnum } from "../../dto/enums/financial-service-type.enum";

@InputType("CBFinancialAssetInputDto")
@ObjectType()
export class CommissionBookFinancialAssetDto extends BaseFinancialAssetDto {
  @Field(() => Boolean, { nullable: true })
  reportRequested?: boolean;

  @Field(() => FinancialServiceTypeEnum, { nullable: true })
  financialServiceType?: FinancialServiceTypeEnum;

  @Field(() => FinancialsDto, { nullable: true })
  income?: FinancialsDto;
}
