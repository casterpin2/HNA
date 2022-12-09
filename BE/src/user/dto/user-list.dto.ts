import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/common/response.dto";
import { UserDto } from "./user.dto";

export class UserList extends ResponseDto<UserDto> {
    @ApiProperty({ type: UserDto, isArray: true })
    data: UserDto[];
  }
  