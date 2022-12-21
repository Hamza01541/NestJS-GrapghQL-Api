import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { FinancialsDto } from "../../dto/components/financials.dto";

@InputType("TBTotalCoveredAssetInputDto")
@ObjectType()
export class TradingBookTotalCoveredAssetDto {
  @Field(() => FinancialsDto)
  total: FinancialsDto;

  @Field(() => FinancialsDto)
  counterpartiesNoNfrd: FinancialsDto;

  @Field(() => FinancialsDto)
  debtSecurity: FinancialsDto;

  @Field(() => FinancialsDto)
  equityInstruments: FinancialsDto;
}
