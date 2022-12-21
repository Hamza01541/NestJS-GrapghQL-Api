import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CurrencyTypeEnum } from "greenomy-common/common/enums";

@InputType("FinancialsInputDto")
@ObjectType()
export class FinancialsDto {
  @Field(() => Number)
  value: number;

  @Field(() => CurrencyTypeEnum, { nullable: true })
  currency?: CurrencyTypeEnum;
}
