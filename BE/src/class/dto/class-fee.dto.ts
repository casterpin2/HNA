import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
    IsDate,
    IsDateString,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { ResponseDto } from 'src/common/response.dto';
export class ClassFeeDto {
    @ApiProperty({ example: 'b7d8d4c0-f940-47db-8702-fc3a3bdda9da' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 'fee name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 0})

    @IsNotEmpty()
    price: Number;

    @ApiPropertyOptional({ example: 'b7d8d4c0-f940-47db-8702-fc3a3bdda9da' })
    @IsString()
    @IsNotEmpty()
    classId: string;
}

export class ClassFeeBulkDto{
    @ApiProperty({ type: ClassFeeDto, isArray: true })
    fee: ClassFeeDto[];
    classId:string;
}
export class ClassFeeList extends ResponseDto<ClassFeeDto> {
    @ApiProperty({ type: ClassFeeDto, isArray: true })
    data: ClassFeeDto[];
  }
  
export class CUClassFeeDto extends OmitType(ClassFeeDto, [
    'id',
    'classId'
  ]) {
  
  }