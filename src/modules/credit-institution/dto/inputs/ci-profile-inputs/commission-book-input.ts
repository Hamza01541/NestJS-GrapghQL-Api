import { Field, InputType } from "@nestjs/graphql";
import { CommissionBookFAndCRevenueDto } from "src/modules/credit-institution/commission-book/dto/cb-fAndCRevenue.dto";

@InputType()
export class CommissionBookInput {
  @Field(() => CommissionBookFAndCRevenueDto)
  fAndCRevenue: CommissionBookFAndCRevenueDto;
}
