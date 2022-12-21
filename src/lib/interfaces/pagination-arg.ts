import { SortableByDefinitionType } from '../types/sortable-by-definition.type';

export interface PaginationArg<SearchObject = any> {
  page: number;
  limit: number;
  sortBy?: SortableByDefinitionType;
  searchBy?: SearchObject;
}
