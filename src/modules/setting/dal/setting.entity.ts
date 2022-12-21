import { SettingsType } from '../../../lib/enums';
import { BaseEntity } from '../../../lib/interfaces/base-entity';

export interface SettingEntity extends BaseEntity {
  type: SettingsType;
  key: string;
  value: string;
}
