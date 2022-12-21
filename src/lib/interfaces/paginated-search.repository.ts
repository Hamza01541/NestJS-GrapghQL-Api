import { MongoDatabase, MongoRepository } from '@makeit-studio/database';
import { SortableByDefinitionType } from '../types/sortable-by-definition.type';
import { Paginated } from './paginated';

export type PaginationSearchOptions = {
  $skip: number;
  $limit: number;
  $sort: SortableByDefinitionType;
  $match?: any;
  $geoNear?: any;
};

export abstract class PaginatedSearchRepository<Entity> extends MongoRepository<Entity> {
  constructor(db: MongoDatabase) {
    super(db);
}

  paginatedSearch(
    page: number,
    { $skip, $limit, $match, $sort, $geoNear }: PaginationSearchOptions,
  ): Promise<Paginated<Entity>> {
    const filters: any[] = [];

    if ($match) {
      filters.push({ $match });
    }

    if ($geoNear) {
      filters.push({ $geoNear });
    }

    return this.collection
      .aggregate<Paginated<Entity>>([
        {
          $facet: {
            totalCount: [{ $group: { _id: '', result: { $sum: 1 } } }],
            searchResult: [
              ...filters,
              { $sort },
              { $skip },
              { $limit },
              {
                $group: {
                  _id: '',
                  items: { $push: '$$ROOT' },
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
        { $unwind: '$totalCount' },
        { $unwind: '$searchResult' },
        {
          $project: {
            page: { $literal: page },
            limit: { $literal: $limit },
            totalCount: '$totalCount.result',
            count: '$searchResult.count',
            items: '$searchResult.items',
            hasNextPage: {
              $let: {
                vars: {
                  countAndSkipped: { $add: ['$searchResult.count', $skip] },
                },
                in: { $gt: ['$totalCount.result', '$$countAndSkipped'] },
              },
            },
            hasPreviousPage: { $gt: [page, 1] },
          },
        },
      ])
      .next()
      .then(
        (result) =>
          result ??
          ({
            page,
            limit: $limit,
            totalCount: 0,
            count: 0,
            items: [],
            hasNextPage: false,
            hasPreviousPage: false,
          } as Paginated<Entity>),
      );
  }
  
}
