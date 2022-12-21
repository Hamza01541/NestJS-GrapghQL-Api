import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { FinancialsDto } from "../../dto/components/financials.dto";

@InputType("CBFormDataInputDto")
@ObjectType()
export class CommissionBookFormDataDto {
  @Field(() => FinancialsDto)
  totalRevenue: FinancialsDto;

  @Field(() => FinancialsDto)
  counterpartiesIncome: FinancialsDto;
}
