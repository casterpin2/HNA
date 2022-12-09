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
import { ArticleService } from './article.service';
import { ArticleDetailDto } from './dto/article-detail.dto';
import { ArticleDto } from './dto/article.dto';
import { ArticleEntity } from './entity/article.entity';

import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleList, ArticleListDto } from './dto/article-list.dto';

import { IdDto } from 'src/common/dto/id.dto';
import { IsArray } from 'class-validator';
import { ArticleCategoryStatus } from './entity/article-category-status.enum';

import { UpdateBannerDisplayOrderDto } from 'src/content/banner/banner.controller';
import {
  Public
} from 'src/auth/decorators/roles.decorator';
import { BannerPosition } from 'src/content/entity/banner-enum.entity';
import { createNoPageResponse, createSuccessResponse } from 'src/common/utils';
import { ResponseSuccessDto } from 'src/common/response.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}

export class DeleteArticleMultipeDto {
  @ApiPropertyOptional({ type: IdDto, isArray: true })
  @IsArray()
  articleIds: IdDto[];
}
export class UpdateSatusDto {
  @ApiPropertyOptional({ type: IdDto, isArray: true })
  @IsArray()
  articleIds: IdDto[];

  @ApiProperty({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;
}

@ApiTags('Article')
@Controller('Article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOperation({
    summary: 'Create new a article.',
  })
  @ApiOkResponse({ type: ArticleDto })
  @ApiBearerAuth()

  @Post()
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleDto> {
    return this.articleService.create({ ...createArticleDto });
  }

  @ApiOperation({
    summary: 'Update new a article.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
  
  @Put(':id')
  async Update(
    @Param('id') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<void> {
    return this.articleService.update(articleId, updateArticleDto);
  }

  @ApiOperation({
    summary: 'Add to article category.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
 
  @Put('addtoCategory/:categoryId')
  async AddToCategory(
    @Param('categoryId') articleCategoryId: string,
    @Body() deleteMul: DeleteArticleMultipeDto,
  ): Promise<void> {
    return this.articleService.addToCategory(
      articleCategoryId,
      deleteMul.articleIds,
    );
  }

  @ApiOperation({
    summary: 'Delete  a article.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Delete(':id')
  async Delete(@Param('id') articleId: string): Promise<void> {
    return this.articleService.delete(articleId);
  }

  @ApiOperation({
    summary: 'Get a article .',
  })
  @ApiOkResponse({ type: ArticleDetailDto })
  // @ApiBearerAuth()
  //@PageAccessRequired(Page.news)
  @Public()
  @Get(':id')
  async getOne(@Param('id') articleId: string): Promise<ArticleDetailDto> {
    return this.articleService.findOne(articleId);
  }

  @ApiOperation({
    summary: 'Get all article .',
  })
  @ApiOkResponse({ type: ArticleList })
  //@ApiBearerAuth()
  //@PageAccessRequired(Page.news)
  @Public()
  @ApiQuery({
    name: 'searchstr',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'status',
    type: String,
    required: false,
  })
  @Get()
  async findAll(
    @Query('searchstr') searchstr?: string,
    @Query('status') status?: ArticleCategoryStatus,
  ) {
    const data = await this.articleService.findAll(searchstr, status);

    return createNoPageResponse(data, data.length);
  }

  @ApiOperation({
    summary: 'Get by position .',
  })
  @ApiOkResponse({ type: ArticleList })
  //@ApiBearerAuth()
  //@PageAccessRequired(Page.news)
  @Public()
  @ApiQuery({
    name: 'position',
    type: String,
    required: false,
  })
  @Get('/position/findAll')
  async findByPosition(@Query('position') position?: BannerPosition) {
    const data = await this.articleService.findByPosition(position);

    return createNoPageResponse(data, data.length);
  }

  @ApiOperation({
    summary: 'Get by category .',
  })
  @ApiOkResponse({ type: ArticleList })
  @ApiBearerAuth()
  
  @ApiQuery({
    name: 'searchStr',
    type: String,
    required: false,
  })
  @Get('getByCategory/:articleCategoryId')
  async findByCategory(
    @Param('articleCategoryId') articleCategoryId: string,
    @Query('searchStr') searchStr?: string,
  ) {
    const data = await this.articleService.findByCategory(
      articleCategoryId,
      searchStr,
    );

    return createNoPageResponse(data, data.length);
  }

  @ApiOperation({
    summary: 'Delete multie article.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Post('deleteMultipe')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMulty(@Body() deleteMul: DeleteArticleMultipeDto): Promise<void> {
    return this.articleService.deleteMul(deleteMul.articleIds);
  }

  @ApiOperation({
    summary: 'update status multie article.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Post('updatestatus')
  @HttpCode(HttpStatus.NO_CONTENT)
  async UpdateStaus(@Body() updateStatus: UpdateSatusDto): Promise<void> {
    return this.articleService.updateStatus(updateStatus);
  }

  @ApiOperation({
    summary: 'Arrange list banner',
  })
  @ApiOkResponse({ type: ResponseSuccessDto })
  @ApiBearerAuth()
  
  @ApiBody({ type: [UpdateBannerDisplayOrderDto] })
  @Post('displayOrder/:articleCategoryId')
  async arrangeCourses(
    @Param('articleCategoryId') articleCategoryId: string,
    @Body()
    updateArticleOrderDto: UpdateBannerDisplayOrderDto[],
  ) {
    const result = await this.articleService.arrangeDisplayOrder(
      articleCategoryId,
      updateArticleOrderDto,
    );

    return createSuccessResponse(result);
  }

  
}
