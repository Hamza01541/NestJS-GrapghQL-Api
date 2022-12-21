import { Field, InputType } from "@nestjs/graphql";
import { FinancialsDto } from "../../components/financials.dto";

@InputType()
export class TradingBookFinancialAssetInput {
  @Field(() => FinancialsDto)
  purchaseAmount: FinancialsDto;

  @Field(() => FinancialsDto)
  salesAmount: FinancialsDto;
}
