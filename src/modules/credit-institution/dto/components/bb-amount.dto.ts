import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BaseAmountDto } from "./base-amount.dto";

@InputType('BBAmountInputDto')
@ObjectType()
export class BankingBookAmountDto extends BaseAmountDto {
    @Field(() => Number)
    loan: number;
}