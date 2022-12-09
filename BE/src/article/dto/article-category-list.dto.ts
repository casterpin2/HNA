import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/response.dto';

import { ArticleCategoryDto } from './article-category.dto';

export class ArticleCategoryList extends ResponseDto<ArticleCategoryDto> {
  @ApiProperty({ type: ArticleCategoryDto, isArray: true })
  data: ArticleCategoryDto[];
}
