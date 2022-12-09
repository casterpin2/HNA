import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class MenuSettingDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  url?: string;

  @ApiProperty({
    default: null,
  })
  priority?: number;

  @ApiPropertyOptional({
    type: MenuSettingDto,
    isArray: true,
  })
  @IsOptional()
  children?: MenuSettingDto[];
}
