import { InputType, ObjectType, Field } from "@nestjs/graphql";

@InputType('EngineFileLinkInputDto')
@ObjectType()
export class EngineFileLinkDto {
    @Field()
    _id: string

    @Field({ nullable: true })
    accountId?: string;

    @Field()
    mime: string;

    @Field()
    fieldName: string;

    @Field({ nullable: true })
    indication?: string;

    @Field(() => Date)
    createdAt: Date;
}