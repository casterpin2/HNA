import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiQuery,
  ApiResponse,
  ApiTags,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import {
  Public,
} from 'src/auth/decorators/roles.decorator';
import { IdDto } from 'src/common/dto/id.dto';
import { ResponseSuccessDto } from 'src/common/response.dto';
import { createNoPageResponse, createSuccessResponse } from 'src/common/utils';



import { ArticleCategoryService } from '../article-category.service';
import { ArticleCategoryList } from '../dto/article-category-list.dto';
import { ArticleCategoryDto } from '../dto/article-category.dto';
import { CreateArticleCategoryDto } from '../dto/create-article-category.dto';

export class UpdateArticleCategoryDto extends OmitType(
  CreateArticleCategoryDto,
  ['displayOrder'],
) {}

export class DeleteMultipeDto {
  @ApiPropertyOptional({ type: IdDto, isArray: true })
  @IsArray()
  articleCategoryIds: IdDto[];
}

export class UpdateArticleCategoryDisplayOrderDto extends PickType(
  ArticleCategoryDto,
  ['id', 'displayOrder'],
) {}
@ApiTags('ArticleCategory')
@Controller('ArticleCategory')
export class ArticleCategoryController {
  constructor(private articleCategoryService: ArticleCategoryService) {}

  @ApiOperation({
    summary: 'Create new article category.',
  })
  @ApiOkResponse({ type: ArticleCategoryDto })
  @ApiBearerAuth()
 
  @Post()
  async create(
    @Body() createArticleCategoryDto: CreateArticleCategoryDto,
  ): Promise<ArticleCategoryDto> {
    return this.articleCategoryService.create({ ...createArticleCategoryDto });
  }

  @ApiOperation({
    summary: 'Update a article category.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') articleCategoryId: string,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
  ): Promise<void> {
    return this.articleCategoryService.update(
      articleCategoryId,
      updateArticleCategoryDto,
    );
  }

  @ApiOperation({
    summary: 'Delete a article category.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') articleCategoryId: string): Promise<void> {
    return this.articleCategoryService.delete(articleCategoryId);
  }

  @ApiOperation({
    summary: 'Delete multie article category.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Post('deleteMultipe')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMulty(@Body() deleteMul: DeleteMultipeDto): Promise<void> {
    return this.articleCategoryService.deleteMul(deleteMul.articleCategoryIds);
  }

  @ApiOperation({
    summary: 'Arrange list article category',
  })
  @ApiOkResponse({ type: ResponseSuccessDto })
  @ApiBearerAuth()
 
  @ApiBody({ type: [UpdateArticleCategoryDisplayOrderDto] })
  @Post('displayOrder')
  async arrangeCourses(
    @Body()
    updateArticleCategoryDisplayOrderDto: UpdateArticleCategoryDisplayOrderDto[],
  ) {
    const result = await this.articleCategoryService.arrangeDisplayOrder(
      updateArticleCategoryDisplayOrderDto,
    );

    return createSuccessResponse(result);
  }

  @ApiOperation({
    summary: 'Get all article category.',
  })
  @ApiOkResponse({ type: ArticleCategoryList })
  //@ApiBearerAuth()
  //@PageAccessRequired(Page.news)
  @Public()
  @ApiQuery({
    name: 'searchStr',
    type: String,
    required: false,
  })
  @Get()
  async findAll(@Query('searchStr') searchStr?: string) {
    const [data, total] = await this.articleCategoryService.findAll(searchStr);

    return createNoPageResponse(data, total);
  }

  @ApiOperation({
    summary: 'Get a article category.',
  })
  @ApiOkResponse({ type: ArticleCategoryDto })
  @ApiBearerAuth()

  @Get(':id')
  async getOne(
    @Param('id') articleCategoryId: string,
  ): Promise<ArticleCategoryDto> {
    return this.articleCategoryService.findOne(articleCategoryId);
  }

 
}
