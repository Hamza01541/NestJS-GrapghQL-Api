import { Field, ObjectType, InputType } from "@nestjs/graphql";

@InputType("CBAmountAvailableInputDto")
@ObjectType()
export class CommissionBookAmountAvailableDto {
  @Field(() => Number)
  nonNFRD: number;

  @Field(() => Number)
  other: number;
}
