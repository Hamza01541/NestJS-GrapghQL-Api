export interface Paginated<T> {
  page: number;
  limit: number;
  totalCount: number;
  count: number;
  items: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
