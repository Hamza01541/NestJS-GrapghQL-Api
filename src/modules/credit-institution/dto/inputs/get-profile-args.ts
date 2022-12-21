import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GetCIProfileInputDto {
  @Field(() => [String], { nullable: true })
  years?: string[];

  @Field({ nullable: true })
  year?: string;

  @Field({ nullable: true })
  organisationId?: string;

  @Field({ nullable: true })
  lei?: string;

  @Field({ nullable: true })
  _id?: string;
}
