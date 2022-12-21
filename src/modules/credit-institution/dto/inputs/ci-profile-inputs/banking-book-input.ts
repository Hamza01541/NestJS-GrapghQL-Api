import { Field, InputType } from "@nestjs/graphql";
import { FinancialsDto } from "../../components/financials.dto";
import { NonEUCounterpartiesDto } from "../../components/non-eu-counterparties.dto";

@InputType()
export class BankingBookInput {
  @Field(() => FinancialsDto)
  householdsLoans: FinancialsDto;

  @Field(() => FinancialsDto)
  governmentFinancing: FinancialsDto;

  @Field(() => FinancialsDto)
  interbankLoans: FinancialsDto;

  @Field(() => FinancialsDto)
  cashAssets: FinancialsDto;

  @Field(() => FinancialsDto)
  otherAssets: FinancialsDto;

  @Field(() => FinancialsDto)
  derivatives: FinancialsDto;

  @Field(() => NonEUCounterpartiesDto)
  nonNfrd: NonEUCounterpartiesDto;

  @Field(() => NonEUCounterpartiesDto)
  nonEu: NonEUCounterpartiesDto;
}
