import { BaseEntity } from 'src/common/entity/base.entity';
import {
  BannerDisplay,
  BannerPosition,
} from 'src/content/entity/banner-enum.entity';
import { Column, ManyToOne, OneToMany, Tree } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ArticleCategoryStatus } from './article-category-status.enum';
import { ArticleToArticleCategoryEntity } from './article-to-article-category.entity';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'article_related' })
export class ArticleRelatedEntity extends BaseEntity {
  @Column({ nullable: false })
  articleRelatedId: string;

  @Column({ nullable: false })
  articleCategoryRelatedId: string;

  @Column({ nullable: false })
  articleId: string;

  @Column({ nullable: false, default: true })
  isRelated: boolean;

  @ManyToOne(() => ArticleEntity, (article) => article.articleRelateds)
  article: ArticleEntity;
}
