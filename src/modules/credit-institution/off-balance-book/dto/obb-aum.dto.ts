import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { FinancialsDto } from "../../dto/components/financials.dto";

@InputType("offBalanceBookAumInputDto")
@ObjectType()
export class OffBalanceBookAumDto {
  @Field(() => FinancialsDto)
  total: FinancialsDto;

  @Field(() => FinancialsDto)
  debtSecurity: FinancialsDto;

  @Field(() => FinancialsDto)
  equityInstruments: FinancialsDto;
}
