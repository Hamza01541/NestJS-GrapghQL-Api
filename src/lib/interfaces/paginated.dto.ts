import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Paginated } from './paginated';
import { BaseDto } from './base-dto';

export const PaginatedDto = <Dto extends BaseDto>(clazz: Type<Dto>) => {
  @ObjectType({ isAbstract: true })
  abstract class _PaginatedDto implements Paginated<Dto> {
    @Field()
    page: number;

    @Field()
    limit: number;

    @Field()
    totalCount: number;

    @Field()
    count: number;

    @Field(() => [clazz])
    items: Dto[];

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;
  }

  return _PaginatedDto as Type<Paginated<Dto>>;
};
