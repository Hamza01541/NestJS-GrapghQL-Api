import { registerEnumType } from '@nestjs/graphql';

export enum SortByDirection {
  ASC = 1,
  DESC = -1,
}

registerEnumType(SortByDirection, {
  name: 'SortByDirection',
  description: 'Sort direction for Queries',
});
