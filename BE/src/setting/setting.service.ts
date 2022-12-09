import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateSettingDto } from './controller/setting.controller';
import { SettingEntity } from './entity/setting.entity';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(SettingEntity)
    private readonly settingRepository: Repository<SettingEntity>,
  ) {}

  async update(settingId: string, updateSettingDto: UpdateSettingDto) {
    const setting = await this.settingRepository.findOne({where:{id:settingId}});
    if (!setting) {
      throw new NotFoundException(`Setting ${settingId} not found.`);
    }
    await this.settingRepository.save({ id: settingId, ...updateSettingDto });
  }

  async findOne() {
    const query = this.settingRepository.createQueryBuilder('setting');
    return query.getOne();
  }
  async getBannerHome(){
    
  }
}
