import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';
import { BannerDisplay, BannerPosition } from '../entity/banner-enum.entity';

export class BannerDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ nullable: false })
  name: string;


  @ApiProperty({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;

  @ApiProperty({ nullable: true })
  imgUrl: string;


  @ApiProperty({
    type: 'enum',
    enum: BannerPosition,
    default: BannerPosition.HOME,
  })
  positionDisplay: BannerPosition;

}
