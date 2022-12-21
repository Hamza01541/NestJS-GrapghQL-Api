import { Field, InputType } from "@nestjs/graphql";
import { TradingBookFormAnswerDto } from "src/modules/credit-institution/trading-book/dto/tb-form-answer.dto";

@InputType()
export class TradingBookInput {
  @Field(() => TradingBookFormAnswerDto)
  institutionSize: TradingBookFormAnswerDto;

  @Field(() => TradingBookFormAnswerDto)
  institutionSizeMarketRisk: TradingBookFormAnswerDto;
}
