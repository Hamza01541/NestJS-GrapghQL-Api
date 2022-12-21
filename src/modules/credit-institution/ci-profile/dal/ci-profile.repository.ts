import { PaginatedSearchRepository } from "src/lib/interfaces/paginated-search.repository";
import { MongoDatabase } from "@makeit-studio/database";

import { Injectable } from "@nestjs/common";
import { CIProfileEntity } from "greenomy-common/credit-institution/profile/dal/profile-entity";

@Injectable()
export class CIProfileRepository extends PaginatedSearchRepository<CIProfileEntity> {
  static readonly COLLECTION_NAME = "institution.profiles";

  constructor(db: MongoDatabase) {
    super(db);
  }
}

export default CIProfileRepository;
