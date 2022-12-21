import { PaginatedSearchRepository } from "src/lib/interfaces/paginated-search.repository";
import { MongoDatabase } from "@makeit-studio/database";

import { Injectable } from "@nestjs/common";
import { CreditInstitutionEntity } from "greenomy-common/credit-institution/dal/credit-institution-entity";

// import { CreditInstitutionEntity } from "./ci.entity";

@Injectable()
export class CreditInstitutionRepository extends PaginatedSearchRepository<CreditInstitutionEntity> {
  static readonly COLLECTION_NAME = "credit_institution";

  constructor(db: MongoDatabase) {
    super(db);
  }

  //   profiles(
  //     id: string,
  //     years: string[]
  //   ): Promise<CreditInstitutionEntity | null> {
  //     return this.getCollection()
  //       .aggregate<CreditInstitutionEntity>([
  //         {
  //           $match: { _id: id },
  //         },
  //         {
  //           $lookup: {
  //             from: "ci-profile",
  //             pipeline: [
  //               {
  //                 $match: {
  //                   $expr: { $in: ["$$year", years] },
  //                 },
  //               },
  //             ],
  //             as: "getProfiles",
  //           },
  //         },
  //       ])
  //       .next();
  //   }
}

export default CreditInstitutionRepository;
