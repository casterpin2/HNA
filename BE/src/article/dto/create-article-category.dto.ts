import { OmitType } from '@nestjs/swagger';
import { ArticleCategoryDto } from './article-category.dto';

export class CreateArticleCategoryDto extends OmitType(ArticleCategoryDto, [
  'id',
]) {}
