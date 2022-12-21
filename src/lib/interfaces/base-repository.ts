import { MongoDatabase, MongoRepository } from "@makeit-studio/database";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class BaseRepository<Entity> extends MongoRepository<Entity> {
  constructor(db: MongoDatabase) {
    super(db);

    db.registerRepository(this);
  }
}

export default BaseRepository;