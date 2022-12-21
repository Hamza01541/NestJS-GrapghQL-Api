import { ObjectType, InputType, Field } from "@nestjs/graphql";
import { BaseFinancialAssetDto } from "../../dto/components/base-financial-asset";

@InputType("TBFinancialAssetInputDto")
@ObjectType()
export class TradingBookFinancialAssetDto extends BaseFinancialAssetDto {
  @Field({ nullable: true })
  reportRequested?: boolean;
}
