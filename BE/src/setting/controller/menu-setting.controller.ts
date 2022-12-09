import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Type,
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
  PartialType,
  PickType,
} from '@nestjs/swagger';
//import { Type } from 'class-transformer';

import {
  ArrayMaxSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Public } from 'src/auth/decorators/roles.decorator';
import { ResponseDto, ResponseSuccessDto } from 'src/common/response.dto';
import { createPageResponse, createSuccessResponse } from 'src/common/utils';

import { CreateMenuSettingDto } from '../dto/create-menu-setting.dto';
import { MenuSettingDto } from '../dto/menu-setting.dto';
import { MenuSettingService } from '../menu-setting.service';

export class UpdateMenuSettingDto extends PartialType(CreateMenuSettingDto) {}
export class BulkMenuSettingDto {
  @ApiProperty({ type: CreateMenuSettingDto, isArray: true })
  @ValidateNested({ each: true })
  // @Type(() => CreateMenuSettingDto)
  @IsArray()
  @ArrayMaxSize(100)
  menuSettings: CreateMenuSettingDto[];
}

export class UpdateMenuSettingPriorityDto extends PickType(MenuSettingDto, [
  'id',
  'priority',
]) {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'UpdateMenuSettingPriorityDto',
    },
  })
  children?: UpdateMenuSettingPriorityDto[];
}

export class UpdateBulkMenuSettingItemDto extends PartialType(
  CreateMenuSettingDto,
) {
  @ApiProperty()
  id: string;
}

export class MenuSettingList extends ResponseDto<MenuSettingDto> {
  @ApiProperty({ type: MenuSettingDto, isArray: true })
  @IsNotEmpty()
  data: MenuSettingDto[];
}

export class UpdateBulkMenuSettingDto {
  UpdateBulkMenuSettingItemDto;
  @ApiProperty({ type: UpdateBulkMenuSettingItemDto, isArray: true })
  @ValidateNested({ each: true })
  // @Type(() => UpdateBulkMenuSettingItemDto)
  @IsArray()
  @ArrayMaxSize(100)
  menuSetting: UpdateBulkMenuSettingItemDto[];
}

@ApiTags('MenuSetting')
@Controller('menusetting')
export class MenuSettingController {
  constructor(private menuSettingService: MenuSettingService) {}

  @ApiOperation({
    summary: 'CreateMenuSetting',
  })
  @ApiOkResponse({ type: MenuSettingDto, isArray: true })
  @ApiBearerAuth()
  //@PermissionsCourseRequired(Permission['cms.course.course_unit.update'])
  @Post('bulk')
  createBulk(@Body() bulkMenuSettingDto: BulkMenuSettingDto) {
    return this.menuSettingService.createMenuSetting(
      bulkMenuSettingDto.menuSettings,
    );
  }

  @ApiOperation({
    summary: 'Update bulk of menu setting.',
  })
  @ApiOkResponse({ type: MenuSettingDto, isArray: true })
  @ApiBearerAuth()
  //@PermissionsCourseRequired(Permission['cms.course.course_unit.update'])
  @Put('bulk')
  updateBulk(@Body() bulkMenuSettingDto: UpdateBulkMenuSettingDto) {
    return this.menuSettingService.updateBulk(bulkMenuSettingDto.menuSetting);
  }

  @ApiOperation({
    summary: 'Get all menu.',
  })
  @ApiOkResponse({ type: MenuSettingList })
  @Public()
  //@ApiBearerAuth()
  //@PageAccessRequired(Page.course_unit)
  @Get()
  @ApiQuery({
    name: 'pageNo',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
  })
  async findAll(@Query('pageNo') pageNo = 1, @Query('pageSize') pageSize = 10) {
    const [data, total] = await this.menuSettingService.findAll({
      pageNo,
      pageSize,
    });

    return createPageResponse(data, { pageNo, pageSize }, total);
  }

  @ApiOperation({
    summary: 'Get an item menu.',
  })
  @ApiOkResponse({ type: MenuSettingDto })
  @ApiBearerAuth()
  //@PageAccessRequired(Page.course_unit)
  @Get(':id')
  async getOne(@Param('id') menuSettingId: string): Promise<MenuSettingDto> {
    return this.menuSettingService.findOne(menuSettingId);
  }

  @ApiOperation({
    summary: 'Delete an item menu.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
  //@PermissionsCourseRequired(Permission['cms.course.course_unit.update'])
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') menuSettingId: string): Promise<void> {
    return this.menuSettingService.delete(menuSettingId);
  }

  @ApiOperation({
    summary: 'Arrange submenu. ',
  })
  @ApiOkResponse({ type: ResponseSuccessDto })
  @ApiBearerAuth()
  // @PermissionsCourseRequired(
  //   Permission['cms.course.course_unit.update'],
  //   Permission['cms.course.course_detail.update'],
  // )
  @ApiBody({ type: [UpdateMenuSettingPriorityDto] })
  @Put('menusetting-priorities')
  async arrangeCourses(
    @Body() updateMenuSettingPriorities: UpdateMenuSettingPriorityDto[],
  ) {
    const result = await this.menuSettingService.arrangePriority(
      updateMenuSettingPriorities,
    );

    return createSuccessResponse(result);
  }
}
