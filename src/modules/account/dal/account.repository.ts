import { MongoDatabase } from '@makeit-studio/database';
import { Injectable } from '@nestjs/common';
import { PaginatedSearchRepository } from '../../../lib/interfaces/paginated-search.repository';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountRepository extends PaginatedSearchRepository<AccountEntity> {
  static readonly COLLECTION_NAME = 'accounts';

  constructor(db: MongoDatabase) {
    super(db);
  }
}

export default AccountRepository;
