import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

import { ArticleCategoryStatus } from '../entity/article-category-status.enum';
import { ArticleCategoryDropdownDto } from './article-detail.dto';
import { ArticleDto } from './article.dto';

export class ArticleListDto {
  @ApiProperty({ nullable: false })
  id: string;

  @ApiProperty({ nullable: false })
  title: string;

  @ApiProperty({ nullable: true })
  shortDescription: string;

  @ApiProperty({ nullable: true })
  descriptionSeo: string;

  @ApiProperty({ nullable: true })
  imgArticleUrl: string;

  @ApiProperty({ type: ArticleCategoryDropdownDto, isArray: true })
  articleCategorys: ArticleCategoryDropdownDto[];

  @ApiProperty()
  status: ArticleCategoryStatus;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  displayOrder?: number;
}

export class ArticleList extends ResponseDto<ArticleListDto> {
  @ApiProperty({ type: ArticleListDto, isArray: true })
  data: ArticleListDto[];
}
