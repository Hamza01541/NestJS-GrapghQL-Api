import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
@InputType()
export class GetArgs {
  @Field({ nullable: true })
  @Min(1)
  @Max(100)
  limit?: number;

  @Field({ nullable: true })
  @Min(0)
  skip?: number;

  @Field({ nullable: true })
  sort?: string;
}

export default GetArgs;
