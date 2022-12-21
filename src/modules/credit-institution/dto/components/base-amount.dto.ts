import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType('BaseAmountInputDto')
@ObjectType()
export class BaseAmountDto {
    @Field(() => Number)
    debt: number;

    @Field(() => Number)
    equity: number;
}