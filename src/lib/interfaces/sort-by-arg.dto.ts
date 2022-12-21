import { Type } from '@nestjs/common';
import { ArgsType, Field } from '@nestjs/graphql';
import { SortableByDefinitionType } from '../types/sortable-by-definition.type';
import { SortByArg } from './sort-by-arg';

export const SortByArgDto = <SortableByDefinitionDto>(clazz: Type<SortableByDefinitionDto>) => {
  @ArgsType()
  class _SortByArgDto {
    @Field(() => clazz, { nullable: true })
    sortBy?: SortableByDefinitionType;
  }

  return _SortByArgDto as Type<SortByArg>;
};
