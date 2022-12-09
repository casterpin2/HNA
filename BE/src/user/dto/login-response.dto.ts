import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class LoginResponseDto {
    @ApiProperty()
    @IsNotEmpty()
    userId: string;
  
    @ApiProperty()
    @IsNotEmpty()
    accessToken: string;
   
    @ApiProperty()
    @IsNotEmpty()
    role: number;
  }
  