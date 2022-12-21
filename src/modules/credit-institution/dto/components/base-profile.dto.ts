import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType("BaseProfileInputDto")
@ObjectType()
export class BaseProfileDto {
  @Field()
  profileId: string;

  @Field()
  year: string;
}
