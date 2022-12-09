import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AdmissionDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;


    @ApiProperty({ nullable: false })
    fullname: string;

    @ApiProperty({ nullable: false })
    phoneno: string;

    @ApiProperty({ nullable: false })
    message: string;
    @ApiProperty({ nullable: false })
    email: string;
}

export class CreateAdmissionDto extends OmitType(AdmissionDto, [
    'id',
]) { }