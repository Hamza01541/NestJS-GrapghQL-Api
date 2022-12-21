import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { FinancialsDto } from "../../dto/components/financials.dto";
import { OffBalanceBookAumDto } from "./obb-aum.dto";

@InputType("OffBalanceBookFormDataInputDto")
@ObjectType()
export class OffBalanceBookFormDataDto {
  @Field(() => FinancialsDto)
  financialGuarantees: FinancialsDto;

  @Field(() => OffBalanceBookAumDto)
  totalAuM: OffBalanceBookAumDto;
}
