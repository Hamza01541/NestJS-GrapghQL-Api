import { Field, InputType } from "@nestjs/graphql";
import { FinancialsDto } from "../../components/financials.dto";

@InputType()
export class OffBalanceBookFinancialAssetInput {
  @Field(() => FinancialsDto)
  grossAmount: FinancialsDto;

  @Field()
  guaranteeIsin: string;
}
