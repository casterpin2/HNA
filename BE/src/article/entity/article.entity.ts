import { BaseEntity } from 'src/common/entity/base.entity';
import {
  BannerDisplay,
  BannerPosition,
} from 'src/content/entity/banner-enum.entity';
import { Column, OneToMany, Tree } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { ArticleCategoryStatus } from './article-category-status.enum';
import { ArticleRelatedEntity } from './article-related.entity';
import { ArticleToArticleCategoryEntity } from './article-to-article-category.entity';

@Entity({ name: 'article' })
export class ArticleEntity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  tag: string;

  @Column({ nullable: true })
  urlRedirect: string;

  @Column({ nullable: true })
  titleSeo: string;

  @Column({ nullable: true })
  descriptionSeo: string;

  @Column({ nullable: true })
  urlRedirectToThis: string;

  @Column({ nullable: true })
  shortDescription: string;

  @Column({ nullable: false, type: 'text' })
  content: string;

  @Column({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;

  @Column({ nullable: true })
  imgArticleUrl: string;

  @Column({ nullable: true })
  imgLink: string;

  @Column({ nullable: true })
  videoTag: string;

  @Column({ nullable: true })
  keyWord: string;

  // @Column({
  //   type: 'enum',
  //   enum: BannerPosition,
  //   default: BannerPosition.NEWS,
  // })
  // positionDisplay: BannerPosition;

  @Column({
    type: 'enum',
    enum: BannerDisplay,
    default: BannerDisplay.ALL,
  })
  deviceDisplay: BannerDisplay;

  @OneToMany(
    () => ArticleRelatedEntity,
    (articlerelated) => articlerelated.article,
  )
  articleRelateds: ArticleRelatedEntity[];

  @OneToMany(
    () => ArticleToArticleCategoryEntity,
    (article_to_articlecategory) => article_to_articlecategory.article,
  )
  article_to_articlecategories: ArticleToArticleCategoryEntity[];
}
