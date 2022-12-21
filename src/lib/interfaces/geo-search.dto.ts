import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsPositive, IsArray, ArrayMinSize, ArrayMaxSize } from 'class-validator';

@ArgsType()
@InputType()
export class GeoSearchArgsDto {
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @Field(() => [Number])
  coordinates: number[];

  @IsPositive()
  @Field()
  radius: number;
}
