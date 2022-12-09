import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
export class UserDto {
    @ApiProperty({ example: 'b7d8d4c0-f940-47db-8702-fc3a3bdda9da' })
    @IsInt()
    @IsNotEmpty()
    id: string;
  
    @ApiProperty({ example: 'username1' })
    @IsString()
    @IsNotEmpty()
    username: string;
  
    @ApiProperty({ example: 'user1@gmail.com' })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({ example: '12345678' })
    @IsString()
    @IsOptional()
    password?: string;
  
    @ApiProperty({ example: 'username1' })
    @IsString()
    @IsNotEmpty()
    fullName: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    phoneNumber?: string;

  
    @ApiPropertyOptional()
    @IsNotEmpty()
    role: number;
  }