import { ApiPropertyOptional, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { url } from 'inspector';
import { MenuSettingDto } from './menu-setting.dto';

export class CreateMenuSettingDto extends PickType(MenuSettingDto, [
  'title',
  'url',
]) {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'CreateMenuSettingDto',
    },
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateMenuSettingDto)
  children: CreateMenuSettingDto[];
}
