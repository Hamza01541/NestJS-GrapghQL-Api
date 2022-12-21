import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { OffBalanceBookAumDto } from "src/modules/credit-institution/off-balance-book/dto/obb-aum.dto";
import { FinancialsDto } from "../../components/financials.dto";

@InputType()
@ObjectType()
export class OffBalanceBookInput {
  @Field(() => FinancialsDto)
  financialGuarantees: FinancialsDto;

  @Field(() => OffBalanceBookAumDto)
  aum: OffBalanceBookAumDto;
}
