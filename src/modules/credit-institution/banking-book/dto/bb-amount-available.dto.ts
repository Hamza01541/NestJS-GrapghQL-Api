import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BankingBookAmountDto } from "../../dto/components/bb-amount.dto";

@InputType("BBAmountAvailableInputDto")
@ObjectType()
export class BankingBookAmountAvailableDto {
  @Field(() => BankingBookAmountDto)
  euNonNFRD: BankingBookAmountDto;

  @Field(() => BankingBookAmountDto)
  nonEu: BankingBookAmountDto;

  @Field(() => Number)
  household: number;

  @Field(() => Number)
  localGovernment: number;

  @Field(() => Number)
  other: number;
}
