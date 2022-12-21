import { Module } from '@nestjs/common';
import { SettingRepository } from './dal/setting.repository';

@Module({
  providers: [SettingRepository],
  exports: [SettingRepository],
})
export class SettingModule {}
