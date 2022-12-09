import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ArticleCategoryDisplay } from './article-category-display.enum';
import { ArticleCategoryPosition } from './article-category-position.enum';
import { ArticleCategoryStatus } from './article-category-status.enum';
import { ArticleToArticleCategoryEntity } from './article-to-article-category.entity';

@Entity({ name: 'article_category' })
export class ArticleCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;


  @Column({ nullable: false, default: 0 })
  amountDisplay: number;

  @Column({ nullable: false, default: 0 })
  amountInLine: number;

  @Column({ nullable: false })
  displayOrder: number;

  @OneToMany(
    () => ArticleToArticleCategoryEntity,
    (article_to_articlecategory) => article_to_articlecategory.articleCategory,
  )
  article_to_articlecategories: ArticleToArticleCategoryEntity[];
}
