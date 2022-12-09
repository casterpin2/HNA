
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiPropertyOptional, ApiQuery, ApiResponse, ApiTags, OmitType, PartialType } from '@nestjs/swagger';
import { IS_PUBLIC_KEY, Public } from 'src/auth/decorators/roles.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginRequestDto } from './dto/login-request.dto';
import { UserDto } from './dto/user.dto';
import { UserList } from './dto/user-list.dto';

import { PageResponse } from 'src/common/interface/page-reponse.interface';
import { createPageResponse } from 'src/common/utils';
import { PageDto } from 'src/class/dto/class.dto';
import { PageRequest } from 'src/common/interface/page-request.interface';
export class CreateUserDto extends OmitType(UserDto, [
  'id'
]) {

}
export class CreateClassDto {
  userId: string[];
  classId: string;
}
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'username']),
) { }

@ApiBearerAuth()
@ApiTags('user')
@Controller('users')

export class UserController {

  constructor(private readonly userService: UserService) {

  }

  @Public()
  @ApiOperation({
    summary: 'Login api',
  })
  @ApiResponse({ type: LoginResponseDto, status: HttpStatus.OK })
  @Post('login')
  async login(
    @Body() loginUserDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    const userLogin: LoginResponseDto = await this.userService.login(
      loginUserDto,
    );

    return userLogin;
  }
  @Public()
  @ApiOperation({
    summary: 'Create new user',
  })

  @ApiResponse({ type: UserDto })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get user list',
  })

  @ApiResponse({ type: UserList })
  @ApiQuery({
    name: 'pageNo',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'id',
    required: false,
    type: Number,
  })
  @Get()
  async findAll(
    @Query('pageNo') pageNo = 1,
    @Query('pageSize') pageSize = 10,
    @Query("id") userId: string
  ): Promise<PageResponse<UserDto>> {
    const data= await this.userService.getAll({
      pageNo,
      pageSize,
    }, userId);

    return createPageResponse(data.data, { pageNo, pageSize }, data.total);
  }
  @ApiOperation({
    summary: 'Update  user',
  })
  @ApiResponse({ type: UserDto })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, updateUserDto);
  }
  @ApiResponse({ type: UserDto })
  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ): Promise<boolean> {
    return this.userService.delete(id);
  }

  @ApiOperation({
    summary: 'Get user list',
  })

  @ApiResponse({ type: UserList })
  @Get('teacher')
  async getTeacher(
  ): Promise<UserDto[]> {

    return await this.userService.getUserByRole();
  }
  @ApiOperation({
    summary: 'Get class of list',
  })

  @ApiResponse({ type: UserList })
  @ApiQuery({
    name: 'pageNo',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
  })
  @Get("student")
  async findUser(
    @Query('pageNo') pageNo = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<PageResponse<UserDto>> {
    let page = {
      pageSize: pageSize,
      pageNo: pageNo
    } as PageRequest
    const data = await this.userService.getUserOtherOfClass(page);

    return createPageResponse(data.data, page, data.total);
  }


  @ApiOperation({
    summary: 'Create new user',
  })

  @ApiResponse({ type: UserDto })
  @Post('student')
  async createStudentForClass(@Body() createUserClassDto: CreateClassDto): Promise<Boolean> {
    return this.userService.createUserClass(createUserClassDto);
  }

  @ApiResponse({ type: UserList })
  @ApiQuery({
    name: 'pageNo',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
  })

  @Get("getStudentOfClass/:id")
  async getUserOfClass(
    @Query('pageNo') pageNo = 1,
    @Query('pageSize') pageSize = 10,
    @Param('id') id: string
  ): Promise<PageResponse<UserDto>> {
    let page = {
      pageSize: pageSize,
      pageNo: pageNo
    } as PageRequest
    const data = await this.userService.getUserOfClass(page, id);

    return createPageResponse(data.data, page, data.total);
  }
  @Get("userFee/:id")
  async getUserFee(
    @Param('id') id: string
  ): Promise<any> {

    const data = await this.userService.getUserFeeOfClass(id);

    return data;
  }

  @Post("userFee/:id")
  async createUserFee(
    @Param('id') id: string,
    @Body() fee: string[]
  ): Promise<any> {

    const data = await this.userService.createUserFee(fee, id);

    return data;
  }
  @Put("userFee/:id")
  async updateUserFee(
    @Param('id') id: string,
    @Body() fee: string[]
  ): Promise<any> {

    const data = await this.userService.updateUserFee(id, fee);

    return data;
  }
  @Post("deleteUserClass/:classId")
  async deleteUserClass(
    @Param('classId') classId: string,
    @Body() userId: string[]
  ): Promise<any> {

    const data = await this.userService.deleteUserClass(userId, classId);

    return data;
  }

  
}
