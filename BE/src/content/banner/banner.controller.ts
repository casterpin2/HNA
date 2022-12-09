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
import { extend } from 'lodash';
import { DeleteMultipeDto } from 'src/article/article-category/article-category.controller';
import { ArticleCategoryStatus } from 'src/article/entity/article-category-status.enum';
import {
 
  Public,
} from 'src/auth/decorators/roles.decorator';
import { IdDto } from 'src/common/dto/id.dto';
import { ResponseDto, ResponseSuccessDto } from 'src/common/response.dto';
import { createNoPageResponse, createSuccessResponse } from 'src/common/utils';


import { BannerService } from '../banner.service';
import { BannerDto } from '../dto/banner.dto';

export class CreateBannerDto extends OmitType(BannerDto, ['id']) {}
export class UpdateBannerDto extends OmitType(BannerDto, ['id']) {}

export class UpdateBannerDisplayOrderDto extends PickType(BannerDto, [
  'id',
 
]) {}

export class DeleteBannerMultipeDto {
  @ApiPropertyOptional({ type: IdDto, isArray: true })
  @IsArray()
  bannerIds: IdDto[];
}

export class BannerList extends ResponseDto<BannerDto> {
  @ApiProperty({ type: BannerDto, isArray: true })
  data: BannerDto[];
}

export class UpdateBannerSatusDto {
  @ApiPropertyOptional({ type: IdDto, isArray: true })
  @IsArray()
  bannerIds: IdDto[];

  @ApiProperty({
    type: 'enum',
    enum: ArticleCategoryStatus,
    default: ArticleCategoryStatus.ACTIVE,
  })
  status: ArticleCategoryStatus;
}

@ApiTags('Banner')
@Controller('Banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @ApiOperation({
    summary: 'Create new banner.',
  })
  @ApiOkResponse({ type: BannerDto })
  @ApiBearerAuth()
  
  @Post()
  async create(
    @Body() createBannerDto: CreateBannerDto,
  ): Promise<CreateBannerDto> {
    return this.bannerService.create({ ...createBannerDto });
  }

  @ApiOperation({
    summary: 'Update a banner.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
 
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') bannerId: string,
    @Body() updateBannerDto: UpdateBannerDto,
  ): Promise<void> {
    return this.bannerService.update(bannerId, updateBannerDto);
  }

  @ApiOperation({
    summary: 'Delete a banner.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
 
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') bannerId: string): Promise<void> {
    return this.bannerService.delete(bannerId);
  }

  @ApiOperation({
    summary: 'Delete multie banner.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Post('deleteMultipe')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMulty(@Body() deleteMul: DeleteBannerMultipeDto): Promise<void> {
    return this.bannerService.deleteMul(deleteMul.bannerIds);
  }

  @ApiOperation({
    summary: 'Arrange list banner',
  })
  @ApiOkResponse({ type: ResponseSuccessDto })
  @ApiBearerAuth()
 
  @ApiBody({ type: [UpdateBannerDisplayOrderDto] })
  @Post('displayOrder')
  async arrangeCourses(
    @Body()
    updateBannerOrderDto: UpdateBannerDisplayOrderDto[],
  ) {
    const result = await this.bannerService.arrangeDisplayOrder(
      updateBannerOrderDto,
    );

    return createSuccessResponse(result);
  }

  @ApiOperation({
    summary: 'Get all banner.',
  })
  @ApiOkResponse({ type: BannerList })
  //@ApiBearerAuth()
  @Public()
  //@PageAccessRequired(Page.web_content)
  @ApiQuery({
    name: 'searchStr',
    type: String,
    required: false,
  })
  @Get()
  async findAll(@Query('searchStr') searchStr?: string) {
    const [data, total] = await this.bannerService.findAll(searchStr);

    return createNoPageResponse(data, total);
  }

  @ApiOperation({
    summary: 'Get a bannner.',
  })
  @ApiOkResponse({ type: BannerDto })
  @ApiBearerAuth()
  
  @Get(':id')
  async getOne(@Param('id') bannerId: string): Promise<BannerDto> {
    return this.bannerService.findOne(bannerId);
  }

  @ApiOperation({
    summary: 'update status multie banner.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Post('updatestatus')
  @HttpCode(HttpStatus.NO_CONTENT)
  async UpdateStaus(@Body() updateStatus: UpdateBannerSatusDto): Promise<void> {
    return this.bannerService.updateStatus(updateStatus);
  }
}
