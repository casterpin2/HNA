import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ArticleDto } from './article.dto';

export class ArticleRelatedDropdownDto {
  @ApiProperty({ nullable: false })
  id: string;
  @ApiProperty({ nullable: false })
  articleCategoryId: string;
  @ApiProperty({ nullable: false })
  name: string;
  @ApiProperty()
  isRelated: boolean;
}

export class ArticleAttenionDropdownDto extends PartialType(
  ArticleRelatedDropdownDto,
) {}

export class ArticleCategoryDropdownDto {
  @ApiProperty({ nullable: false })
  id: string;

  @ApiProperty({ nullable: false })
  name: string;
}

export class ArticleDetailDto extends PartialType(ArticleDto) {
  @ApiProperty({ type: ArticleCategoryDropdownDto, isArray: true })
  articleCategorys: ArticleCategoryDropdownDto[];

  @ApiProperty({ type: ArticleRelatedDropdownDto, isArray: true })
  articleRelateds: ArticleRelatedDropdownDto[];

  @ApiProperty({ type: ArticleRelatedDropdownDto, isArray: true })
  articleAttentions: ArticleRelatedDropdownDto[];
}
