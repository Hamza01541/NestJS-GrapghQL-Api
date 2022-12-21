import { MongoDatabase, MongoRepository } from '@makeit-studio/database';
import { Injectable } from '@nestjs/common';

import { SettingsType } from '../../../lib/enums';
import { SettingEntity } from './setting.entity';

@Injectable()
export class SettingRepository extends MongoRepository<SettingEntity> {
  static readonly COLLECTION_NAME = 'settings';

  constructor(db: MongoDatabase) {
    super(db);
  }

  findAllEnvSettings(): Promise<SettingEntity[]> {
    return this.findMany({ query: { type: SettingsType.env } });
  }
}
