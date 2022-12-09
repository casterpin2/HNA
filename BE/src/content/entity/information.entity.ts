import { IsNotEmpty } from 'class-validator';
import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'information' })
export class InformationEntity extends BaseEntity {
  @Column({ nullable: false })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;
}
