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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import {

  Public,
} from 'src/auth/decorators/roles.decorator';
import { ResponseDto } from 'src/common/response.dto';
import { createNoPageResponse } from 'src/common/utils';

import { InformationDto } from '../dto/information.dto';
import { InformationService } from '../information.service';

export class CreateInformationDto extends OmitType(InformationDto, [
  'id',
  'updatedAt',
]) {}

export class UpdateInformationDto extends PartialType(CreateInformationDto) {}

export class InformationList extends ResponseDto<InformationDto> {
  @ApiProperty({ type: InformationDto, isArray: true })
  data: InformationDto[];
}

@ApiTags('Information')
@Controller('Information')
export class InformationController {
  constructor(private informationService: InformationService) {}

  @ApiOperation({
    summary: 'Create new information.',
  })
  @ApiOkResponse({ type: InformationDto })
  @ApiBearerAuth()

  @Post()
  async create(
    @Body() createInformationDto: CreateInformationDto,
  ): Promise<InformationDto> {
    return this.informationService.create({ ...createInformationDto });
  }

  @ApiOperation({
    summary: 'Update a information.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
 
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') informationId: string,
    @Body() updateInformationDto: UpdateInformationDto,
  ): Promise<void> {
    return this.informationService.update(informationId, updateInformationDto);
  }

  @ApiOperation({
    summary: 'Delete a information.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') informationId: string): Promise<void> {
    return this.informationService.delete(informationId);
  }

  @ApiOperation({
    summary: 'Get all information.',
  })
  @ApiOkResponse({ type: InformationList })
  @Public()
  //@ApiBearerAuth()
  //@PageAccessRequired(Page.web_content)
  @ApiQuery({
    name: 'searchStr',
    type: String,
    required: false,
  })
  @Get()
  async findAll(@Query('searchStr') searchStr?: string) {
    const [data, total] = await this.informationService.findAll(searchStr);

    return createNoPageResponse(data, total);
  }

  @ApiOperation({
    summary: 'Get a information.',
  })
  @ApiOkResponse({ type: InformationDto })
  @ApiBearerAuth()
  
  @Get(':id')
  async getOne(@Param('id') informationId: string): Promise<InformationDto> {
    return this.informationService.findOne(informationId);
  }
}
