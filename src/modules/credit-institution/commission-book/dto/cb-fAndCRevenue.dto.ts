import { InputType, ObjectType, Field } from "@nestjs/graphql";
import { FinancialsDto } from "../../dto/components/financials.dto";

@InputType("CBfAndCRevenueInputDto")
@ObjectType()
export class CommissionBookFAndCRevenueDto {
  @Field(() => FinancialsDto)
  total: FinancialsDto;

  @Field(() => FinancialsDto)
  counterpartiesNoNfrd: FinancialsDto;
}
