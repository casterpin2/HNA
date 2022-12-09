import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { InformationEntity } from './entity/information.entity';
import {
  CreateInformationDto,
  UpdateInformationDto,
} from './Information/information.controller';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(InformationEntity)
    private readonly informationRepository: Repository<InformationEntity>,
  ) {}

  async create(createInformationDto: CreateInformationDto) {
    const checkInformation = await this.informationRepository.findOne({
      where: {
        name: createInformationDto.name,
      },
    });

    if (checkInformation) {
      throw new BadRequestException(`Thông tin  này đã tồn tại`);
    }

    const information = await this.informationRepository.create(
      createInformationDto,
    );

    await this.informationRepository.save(information);
    return information;
  }

  async update(
    informationId: string,
    updateInformationDto: UpdateInformationDto,
  ) {
    const information = await this.informationRepository.findOne({where:{id:informationId}});
    if (!information) {
      throw new NotFoundException(`Information ${informationId} not found.`);
    }

    const checkInformation = await this.informationRepository.findOne({
      where: {
        name: updateInformationDto.name,
        id: Not(information.id),
      },
    });

    if (checkInformation) {
      throw new BadRequestException(`Thông tin  này đã tồn tại`);
    }

    await this.informationRepository.save({
      id: informationId,
      ...updateInformationDto,
    });
  }

  async delete(informationId: string) {
    const information = await this.informationRepository.findOne({where:{id:informationId}});
    if (!information) {
      throw new NotFoundException(`Information ${informationId} not found.`);
    }

    await this.informationRepository.softDelete(informationId);
  }

  async findOne(informationId: string) {
    const information = await this.informationRepository.findOne({where:{id:informationId}});
    if (!information) {
      throw new NotFoundException(`Information ${informationId} not found.`);
    }

    return information;
  }

  async findAll(searchStr: string) {
    const query = this.informationRepository
      .createQueryBuilder('information')
      .orderBy(`information.createdAt`, 'DESC');

    if (searchStr !== undefined) {
      query.orWhere('information.name like :name', {
        name: `%${searchStr}%`,
      });
    }

    return query.getManyAndCount();
  }
}
