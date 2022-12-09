import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ required: true, nullable: false })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ required: true, nullable: false })
  @IsNotEmpty()
  password: string;
}
