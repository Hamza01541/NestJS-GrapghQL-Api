import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { FinancialsDto } from "../../dto/components/financials.dto";
import { NonEUCounterpartiesDto } from "../../dto/components/non-eu-counterparties.dto";

@InputType("BBFormDataInputDto")
@ObjectType()
export class BankingBookFormDataDto {
  @Field(() => FinancialsDto)
  householdLoans: FinancialsDto;

  @Field(() => FinancialsDto)
  governmentFinancing: FinancialsDto;

  @Field(() => FinancialsDto)
  onDemand: FinancialsDto;

  @Field(() => FinancialsDto)
  cashAssets: FinancialsDto;

  @Field(() => FinancialsDto)
  otherAssets: FinancialsDto;

  @Field(() => FinancialsDto)
  derivatives: FinancialsDto;

  @Field(() => NonEUCounterpartiesDto)
  sme: NonEUCounterpartiesDto;

  @Field(() => NonEUCounterpartiesDto)
  nonEUCounterparties: NonEUCounterpartiesDto;
}
