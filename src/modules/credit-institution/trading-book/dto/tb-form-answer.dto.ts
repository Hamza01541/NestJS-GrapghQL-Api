import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AnswerEnum } from "greenomy-common/common/enums";

@InputType("TradingBookFormAnswerInputDto")
@ObjectType()
export class TradingBookFormAnswerDto {
  @Field(() => AnswerEnum)
  less: AnswerEnum;

  @Field(() => AnswerEnum)
  exceeds: AnswerEnum;
}
