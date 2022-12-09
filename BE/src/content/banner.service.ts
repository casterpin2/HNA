import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdDto } from 'src/common/dto/id.dto';
import { FindManyOptions, Repository, In, Connection, Not } from 'typeorm';
import {
  CreateBannerDto,
  UpdateBannerDisplayOrderDto,
  UpdateBannerDto,
  UpdateBannerSatusDto,
} from './banner/banner.controller';
import { BannerEntity } from './entity/banner.entity';

@Injectable()
export class BannerService {
  constructor(
    @InjectRepository(BannerEntity)
    private readonly bannerRepository: Repository<BannerEntity>,
    private connection: Connection,
  ) {}

  async create(createBannerDto: CreateBannerDto) {
    const checkBanner = await this.bannerRepository.findOne({
      where: {
        name: createBannerDto.name,
      },
    });

    if (checkBanner) {
      throw new BadRequestException(`Banner quảng cáo này đã tồn tại`);
    }

    const banner = await this.bannerRepository.create(createBannerDto);

    await this.bannerRepository.save(banner);
    return banner;
  }

  async update(bannerId: string, updateBannerDto: UpdateBannerDto) {
    const banner = await this.bannerRepository.findOne({where:{id:bannerId}});
    if (!banner) {
      throw new NotFoundException(`Banner ${bannerId} not found.`);
    }

    const checkBanner = await this.bannerRepository.findOne({
      where: {
        name: updateBannerDto.name,
        id: Not(banner.id),
      },
    });

    if (checkBanner) {
      throw new BadRequestException(`Banner quảng cáo này đã tồn tại`);
    }

    await this.bannerRepository.save({ id: bannerId, ...updateBannerDto });
  }

  async delete(bannerId: string) {
    const banner = await this.bannerRepository.findOne({where:{id:bannerId}});
    if (!banner) {
      throw new NotFoundException(`Banner ${banner} not found.`);
    }

    await this.bannerRepository.softDelete(bannerId);
  }

  async deleteMul(bannerIds: IdDto[]) {
    if (bannerIds.length > 0) {
      const queryRunner = this.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        for (const bannerid of bannerIds) {
          const banner = await this.bannerRepository.findOne({where:{id:bannerid.id}});
          if (!banner) {
            throw new NotFoundException(`Banner ${banner.id} not found.`);
          }

          await this.bannerRepository.softDelete(bannerid);
        }
        await queryRunner.commitTransaction();
        await queryRunner.release();
      } catch (error) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        throw error;
      }
    }
  }

  async findAll(searchStr: string) {
    const query = this.bannerRepository
      .createQueryBuilder('banner')

    if (searchStr !== undefined) {
      query.orWhere('banner.name like :name', {
        name: `%${searchStr}%`,
      });
    }

    return query.getManyAndCount();
  }

  async arrangeDisplayOrder(
    updateBannerDisplayOrderDto: UpdateBannerDisplayOrderDto[],
  ) {
    const bannerIds = updateBannerDisplayOrderDto.map((e) => e.id);

    //2. Get list category
    const query: FindManyOptions<BannerEntity> = {
      where: { id: In(bannerIds) },
    };

    const banners = await this.bannerRepository.find(query);

    //3. Update category
    for (const banner of banners) {
      await this.bannerRepository.save(banner);
    }

    return updateBannerDisplayOrderDto;
  }

  async findOne(bannerId: string) {
    const banner = await this.bannerRepository.findOne({where:{id:bannerId}});
    if (!banner) {
      throw new NotFoundException(`Banner ${bannerId} not found.`);
    }

    return banner;
  }

  async updateStatus(updateStatusDto: UpdateBannerSatusDto) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (updateStatusDto.bannerIds.length > 0) {
        for (const bannerId of updateStatusDto.bannerIds) {
          const banner = await this.bannerRepository.findOne({where:{id:bannerId.id}});
          if (!banner) {
            throw new NotFoundException(`Banner ${bannerId} not found.`);
          }
          banner.status = updateStatusDto.status;

          await queryRunner.manager.save(banner);
        }
      }
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }
}
