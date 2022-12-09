import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerService } from './banner.service';
import { BannerController } from './banner/banner.controller';
import { BannerEntity } from './entity/banner.entity';
import { InformationEntity } from './entity/information.entity';
import { InformationService } from './information.service';
import { InformationController } from './Information/information.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InformationEntity, BannerEntity])],
  controllers: [InformationController, BannerController],
  providers: [InformationService, BannerService],
  exports: [InformationService, BannerService],
})
export class ContentModule {}
