import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryEntity } from 'src/article/entity/article-category.entity';
import { ArticleRelatedEntity } from 'src/article/entity/article-related.entity';
import { ArticleToArticleCategoryEntity } from 'src/article/entity/article-to-article-category.entity';
import { ArticleEntity } from 'src/article/entity/article.entity';
import { BannerEntity } from 'src/content/entity/banner.entity';
import { UserFeeEntity } from 'src/user/entity/user-fee.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { AdmissionsEntity } from './entity/admissions.entity';
import { CustomerFeebackEntity } from './entity/customer_feedback.entity';


@Module({
  imports:[TypeOrmModule.forFeature([ ArticleCategoryEntity,CustomerFeebackEntity,
    ArticleEntity,
    ArticleRelatedEntity,
    ArticleToArticleCategoryEntity,BannerEntity,AdmissionsEntity])],
  providers: [ClientService],
  controllers: [ClientController],

})
export class ClientModule {}
