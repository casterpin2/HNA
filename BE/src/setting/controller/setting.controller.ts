import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  OmitType,
  PickType,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/roles.decorator';


import { SettingDto } from '../dto/setting.dto';
import { SettingService } from '../setting.service';

export class UpdateSettingDto extends OmitType(SettingDto, ['id']) {}

@ApiTags('Setting')
@Controller('Setting')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @ApiOperation({
    summary: 'Update setting.',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBearerAuth()
  
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') settingId: string,
    @Body() updateSettingDto: UpdateSettingDto,
  ): Promise<void> {
    return this.settingService.update(settingId, updateSettingDto);
  }

  @Public()
  @ApiOperation({
    summary: 'Get setting.',
  })
  @ApiOkResponse({ type: SettingDto })
  @ApiBearerAuth()

  @Get()
  async getOne(): Promise<SettingDto> {
    return this.settingService.findOne();
  }
}
