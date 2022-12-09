import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryLanguague } from 'src/common/utils';

import { HOMESTYLE } from '../entity/setting-homestyle.enum';
import {
  CRMSETTING,
  PENDINGORDER,
  STATUS,
  USERCREATECLASS,
} from '../entity/setting-status.enum';

export class SettingDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  webname: string;
  @ApiProperty({
    type: 'enum',
    enum: STATUS,
    default: STATUS.DEFAULT,
  })
  @IsOptional()
  status: STATUS;

  @ApiProperty({ nullable: true })
  fanpage: string;


  @ApiProperty({ nullable: true })
  google?: string;


  @ApiProperty({ nullable: true })
  address?: string;

  

  @ApiProperty({ nullable: true })
  logoUrl?: string;

  @ApiProperty({ nullable: true })
  aboutUs?: string;
  @ApiProperty({nullable:true})
  phone?:string
}
