import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize } from 'class-validator';
import { IdDto } from 'src/common/dto/id.dto';
import {
  BannerDisplay,
  BannerPosition,
} from 'src/content/entity/banner-enum.entity';
import { ArticleCategoryStatus } from '../entity/article-category-status.enum';

export class RelatedArticleDto {
  @ApiProperty()
  articleId: string;
  @ApiProperty()
  articleCategoryId: string;
}

export class CreateArticleDto {
  @ApiProperty({ nullable: false })
  title: string;

  @ApiProperty({ nullable: false })
  tag: string;

  @ApiProperty({ nullable: true })
  urlRedirect: string;

  @ApiProperty({ nullable: true })
  titleSeo: string;

  @ApiProperty({ nullable: true })
  descriptionSeo: string;

  @ApiProperty({ nullable: true })
  urlRedirectToThis: string;

  @ApiProperty({ nullable: true })
  shortDescription: string;

  @ApiProperty({ nullable: false })
  content: string;

  @ApiProperty({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;

  @ApiProperty({ nullable: true })
  imgArticleUrl: string;

  @ApiProperty({ nullable: true })
  imgLink: string;

  @ApiProperty({ nullable: true })
  videoTag: string;

  @ApiProperty({ nullable: true })
  keyWord: string;

  @ApiProperty({
    type: 'enum',
    enum: BannerPosition,
    default: BannerPosition.NEWS,
  })
  positionDisplay: BannerPosition;

  @ApiProperty({
    type: 'enum',
    enum: BannerDisplay,
    default: BannerDisplay.ALL,
  })
  deviceDisplay: BannerDisplay;

  @ApiProperty({
    type: IdDto,
    isArray: true,
  })
  @ArrayMinSize(1)
  articleCategoryIds: IdDto[];

  @ApiProperty({
    type: RelatedArticleDto,
    isArray: true,
  })
  realtedArticleIds?: RelatedArticleDto[];

  @ApiProperty({
    type: RelatedArticleDto,
    isArray: true,
  })
  attentionArticleIds?: RelatedArticleDto[];
}
