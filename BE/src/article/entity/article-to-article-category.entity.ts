import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, ManyToOne } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ArticleCategoryEntity } from './article-category.entity';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'article_to_articlecategory' })
export class ArticleToArticleCategoryEntity extends BaseEntity {
  
  @Column({ nullable: false })
  articleId: string;

  @Column({ nullable: false })
  articleCategoryId: string;

  @Column({ nullable: false })
  displayOrder: number;

  @ManyToOne(
    () => ArticleEntity,
    (article) => article.article_to_articlecategories,
  )
  article: ArticleEntity;

  @ManyToOne(
    () => ArticleCategoryEntity,
    (articleCategory) => articleCategory.article_to_articlecategories,
  )
  articleCategory: ArticleCategoryEntity;
}
