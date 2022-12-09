import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryController } from './article-category/article-category.controller';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleCategoryEntity } from './entity/article-category.entity';
import { ArticleRelatedEntity } from './entity/article-related.entity';
import { ArticleToArticleCategoryEntity } from './entity/article-to-article-category.entity';
import { ArticleEntity } from './entity/article.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticleCategoryEntity,
      ArticleEntity,
      ArticleRelatedEntity,
      ArticleToArticleCategoryEntity,
    ]),
  ],
  controllers: [ArticleCategoryController, ArticleController],
  providers: [ArticleCategoryService, ArticleService],
  exports: [ArticleCategoryService, ArticleService],
})
export class ArticleModule {}
