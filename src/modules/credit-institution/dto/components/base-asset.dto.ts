import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AssetResourceType } from "../enums/asset-ressource-type.enum";
import { CounterPartyType } from "../enums/counter-party.enum";
import { FinancialAssetType } from "../enums/financial-asset.enum";

@InputType("BaseAssetInputDto")
@ObjectType()
export class BaseAssetDto {
  @Field()
  financialAssetId: string;

  @Field(() => FinancialAssetType)
  FinancialAssetType: FinancialAssetType;

  @Field({ nullable: true })
  financialAssetName?: string;

  @Field(() => Number)
  amountInvested: Number;

  @Field(() => AssetResourceType, { nullable: true })
  ressourceType?: AssetResourceType;

  @Field(() => CounterPartyType, { nullable: true })
  counterpartyType?: CounterPartyType;

  @Field({ nullable: true })
  counterpartyName?: string;

  @Field({ nullable: true })
  counterpartyId?: string;

  @Field({ nullable: true })
  country?: string;
}
