import { InputType, ObjectType, Field } from "@nestjs/graphql";
import { BaseAmountDto } from "../../dto/components/base-amount.dto";

@InputType("TBAmountAvailableInputDto")
@ObjectType()
export class TradingBookAmountAvailableDto {
  @Field(() => BaseAmountDto)
  nonNFRD: BaseAmountDto;

  @Field(() => Number)
  other: number;
}
