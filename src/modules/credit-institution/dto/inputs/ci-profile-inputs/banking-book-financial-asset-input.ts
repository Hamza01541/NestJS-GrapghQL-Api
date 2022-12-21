import { Field, InputType } from "@nestjs/graphql";
import { FinancialsDto } from "../../components/financials.dto";

@InputType()
export class BankingBookFinancialAssetInput {
  @Field(() => FinancialsDto)
  grossAmount: FinancialsDto;
}
