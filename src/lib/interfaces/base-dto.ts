import { Field, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export abstract class BaseDto {
  @Field()
  _id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
