import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSessionDto {
  @Field()
  localId: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field()
  idToken: string;

  @Field({ nullable: true })
  registered?: boolean;

  @Field()
  refreshToken: string;

  @Field()
  expiresIn: string;
}
