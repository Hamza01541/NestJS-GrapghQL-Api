import { Field, InputType } from "@nestjs/graphql";
import { CommissionBookDto } from "src/modules/credit-institution/commission-book/dto/commission-book.dto";

@InputType()
export class CommissionBookFinancialAssetInput {
  @Field(() => CommissionBookDto)
  income: CommissionBookDto;
}
