import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateUserFeeDto {
    @ApiProperty({ example: ['b7d8d4c0-f940-47db-8702-fc3a3bdda9da' ]})
    @IsNotEmpty()
    fee: string[];
  }