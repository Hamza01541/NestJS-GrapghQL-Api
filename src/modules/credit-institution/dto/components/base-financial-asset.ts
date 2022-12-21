import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CountryCodesComponentEnum } from "greenomy-common/common/enums";
import { CounterPartyType } from "../enums/counter-party.enum";
import { FinancialAssetType } from "../enums/financial-asset.enum";

@InputType("baseFinancialAssetDo")
@ObjectType()
export class BaseFinancialAssetDto {
  @Field()
  financialAssetId: string;

  @Field(() => FinancialAssetType)
  financialAssetType: FinancialAssetType;

  @Field({ nullable: true })
  financialAssetTypeName?: string;

  @Field(() => CounterPartyType, { nullable: true })
  counterpartyType?: CounterPartyType;

  @Field({ nullable: true })
  counterpartyName?: string;

  @Field({ nullable: true })
  counterpartyId?: string;

  @Field(() => CountryCodesComponentEnum, { nullable: true })
  country?: CountryCodesComponentEnum;
}
