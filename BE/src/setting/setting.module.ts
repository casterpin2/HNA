import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuSettingController } from './controller/menu-setting.controller';
import { SettingController } from './controller/setting.controller';
import { MenuSettingEntity } from './entity/menu-setting.entity';
import { SettingEntity } from './entity/setting.entity';
import { MenuSettingService } from './menu-setting.service';
import { SettingService } from './setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([SettingEntity, MenuSettingEntity])],
  controllers: [SettingController, MenuSettingController],
  providers: [SettingService, MenuSettingService],
  exports: [SettingService, MenuSettingService],
})
export class SettingModule {}
