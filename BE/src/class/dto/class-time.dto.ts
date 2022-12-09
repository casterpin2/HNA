import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsDateString,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class ClassTimeDto {
    @ApiProperty({ example: 'b7d8d4c0-f940-47db-8702-fc3a3bdda9da' })
    @IsString()
    @IsNotEmpty()
    id: string;


    @ApiProperty({ example: new Date() })
    @IsNotEmpty()
    date: Date;
    @ApiProperty({ example: true })
    @IsBoolean()
    isPresent: Boolean;

    @ApiProperty({ example: 'b7d8d4c0-f940-47db-8702-fc3a3bdda9da' })
    @IsString()
    @IsNotEmpty()
    userId: string;
    @ApiProperty({ example: 'b7d8d4c0-f940-47db-8702-fc3a3bdda9da' })
    @IsString()
    @IsNotEmpty()
    classId: string;
    
    @IsOptional()
    isAddNew:boolean;
    @IsOptional()
    isUpdated:boolean;
}
export class CreateClassTimeBulkDto {
    @ApiProperty({ type: ClassTimeDto, isArray: true })
    attendence: ClassTimeDto[];
}



