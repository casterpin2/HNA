import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Column } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';

import { BannerDisplay, BannerPosition } from './banner-enum.entity';

@Entity({ name: 'banner' })
export class BannerEntity extends BaseEntity {
  @Column({ nullable: false })
  name: string;



  @Column({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;

  

  @Column({ nullable: true })
  imgUrl: string;

  

  @Column({
    type: 'enum',
    enum: BannerPosition,
    default: BannerPosition.HOME,
  })
  positionDisplay: BannerPosition;

}
