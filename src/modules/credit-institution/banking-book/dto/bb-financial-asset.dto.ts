import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BaseFinancialAssetDto } from "../../dto/components/base-financial-asset";

@InputType("BBFinancialAssetInputDto")
@ObjectType()
export class BankingBookFinancialAssetDto extends BaseFinancialAssetDto {
  @Field({ nullable: true })
  screeningId?: string;

  @Field({ nullable: true })
  reportRequested?: boolean;

  @Field({ nullable: true })
  screeningScore?: number;
}
