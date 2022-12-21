import { Type } from '@nestjs/common';
import { ArgsType, Field, IntersectionType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { SortableByDefinitionType } from '../types/sortable-by-definition.type';
import { PaginationArg } from './pagination-arg';

export const PaginationArgDto = <SearchByInputDto, SortByInputDto>({
  SearchByDtoClass,
  SortByDtoClass,
}: {
  SearchByDtoClass?: Type<SearchByInputDto>;
  SortByDtoClass?: Type<SortByInputDto>;
}) => {
  @ArgsType()
  class _SearchByArgDto {
    @Field(() => SearchByDtoClass!, { nullable: true })
    searchBy?: SearchByInputDto;
  }

  @ArgsType()
  class _SortByArgDto {
    @Field(() => SortByDtoClass!, { nullable: true })
    sortBy?: SortableByDefinitionType;
  }

  @ArgsType()
  class _PaginationArgDto implements PaginationArg {
    @Field({ nullable: true, defaultValue: 1 })
    @Min(1)
    page: number;

    @Field({ nullable: true, defaultValue: 20 })
    @Min(1)
    limit: number;
  }

  if (SearchByDtoClass && !SortByDtoClass) {
    @ArgsType()
    class _PaginationSearchArgDto extends IntersectionType(_PaginationArgDto, _SearchByArgDto) {}

    return _PaginationSearchArgDto as Type<PaginationArg<SearchByInputDto>>;
  }

  if (!SearchByDtoClass && SortByDtoClass) {
    @ArgsType()
    class _PaginationSortArgDto extends IntersectionType(_PaginationArgDto, _SortByArgDto) {}

    return _PaginationSortArgDto as Type<PaginationArg>;
  }

  if (SearchByDtoClass && SortByDtoClass) {
    @ArgsType()
    class _PaginationSearchAndSortArgDto extends IntersectionType(
      _PaginationArgDto,
      IntersectionType(_SearchByArgDto, _SortByArgDto),
    ) {}

    return _PaginationSearchAndSortArgDto as Type<PaginationArg<SearchByInputDto>>;
  }

  return _PaginationArgDto as Type<PaginationArg>;
};
