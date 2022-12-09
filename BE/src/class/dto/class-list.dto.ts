import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/common/response.dto";
import { ClassDto } from "./class.dto";


export class ClassList extends ResponseDto<ClassDto> {
    @ApiProperty({ type: ClassDto, isArray: true })
    data: ClassDto[];
  }
  