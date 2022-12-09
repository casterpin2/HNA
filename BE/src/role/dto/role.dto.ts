import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RoleDto {
    @ApiProperty()
    @IsNotEmpty()
    id: number;
  
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  }
  