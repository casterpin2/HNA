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
export class ClassDto {
    @ApiProperty({ example: 'b7d8d4c0-f940-47db-8702-fc3a3bdda9da' })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({ example: 'classname1' })
    @IsString()
    @IsNotEmpty()
    name: string;



    @ApiProperty({ example: new Date() })

    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ example: new Date() })
    @IsNotEmpty()
    endDate: Date;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    teacherId: string;
}
export class CreateClassDto extends OmitType(ClassDto, [
    'id'
]) {

}
export class PageDto {
    @ApiProperty({example : 1})
    @IsNumber()
    pageSize:Number;
    @ApiProperty({example : 10})
    @IsNumber()
    pageNo:Number;
}