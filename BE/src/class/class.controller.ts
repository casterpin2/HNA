
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassService } from './class.service';
import { ClassList } from './dto/class-list.dto';
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Query } from '@nestjs/common';
import { PageResponse } from 'src/common/interface/page-reponse.interface';
import { ClassDto, CreateClassDto, PageDto } from './dto/class.dto';
import { createPageResponse } from 'src/common/utils';
import { Public } from 'src/auth/decorators/roles.decorator';
import { UserList } from 'src/user/dto/user-list.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { PageRequest } from 'src/common/interface/page-request.interface';
import { ClassFeeBulkDto, ClassFeeDto, ClassFeeList, CUClassFeeDto } from './dto/class-fee.dto';
import { ClassTimeDto, CreateClassTimeBulkDto } from './dto/class-time.dto';
import { ClassTimeEntity } from './entity/class-time.entity';
@ApiBearerAuth()
@ApiTags('Class')
@Controller('class')

export class ClassController {
    constructor(private readonly service: ClassService) {

    }
    @ApiOperation({
        summary: 'Get class list',
    })

    @ApiResponse({ type: ClassList })
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
    @Get()
    async findAll(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
    ): Promise<PageResponse<ClassDto>> {
        const [data, total] = await this.service.getAll({
            pageNo,
            pageSize,
        });
        return  createPageResponse(data, { pageNo, pageSize }, total);
    }


    @ApiOperation({
        summary: 'Create new class',
    })
    @ApiResponse({ type: ClassDto })
    @Post()
    async create(@Body() createClassDto: CreateClassDto): Promise<ClassDto> {
        return await this.service.create(createClassDto);
    }

    @ApiOperation({
        summary: 'Update Class',
    })
    @ApiResponse({ type: ClassDto })
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateClassDto: CreateClassDto,
    ): Promise<ClassDto> {
        return await this.service.update(id, updateClassDto);
    }

    @ApiResponse({ type: ClassDto })
    @Delete(':id')
    async delete(
        @Param('id') id: string,
    ): Promise<boolean> {
        return await this.service.delete(id);
    }

    @ApiResponse({ type: ClassDto })
    @Get(':id')
    async getById(
        @Param('id') id: string,
    ): Promise<ClassDto> {
        return await this.service.findOneClass(id);
    }


    @ApiResponse({ type: ClassList })
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
    @Get("class-fee/:id")
    async findAllClasFee(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
        @Param('id') id: string
    ): Promise<PageResponse<ClassFeeDto>> {
        const [data, total] = await this.service.getClassFee({
            pageNo,
            pageSize,
        }, id);
        return createPageResponse(data, { pageNo, pageSize }, total);
    }
    @ApiOperation({
        summary: 'Create new class fee',
    })
    @ApiResponse({ type: ClassFeeBulkDto })
    @Post('class-fee')
    async createFee(@Body() createClassDto: ClassFeeBulkDto): Promise<Boolean> {
        return await this.service.createClassFee(createClassDto);
    }
    @ApiOperation({
        summary: 'Update Class Fee',
    })
    @ApiResponse({ type: CUClassFeeDto })
    @Put('class-fee/:id')
    async updateClassFee(
        @Param('id') id: string,
        @Body() updateClassDto: CUClassFeeDto,
    ): Promise<ClassFeeDto> {
        return await this.service.updateFee(id, updateClassDto);
    }
    @ApiOperation({
        summary: 'Detele Class Fee',
    })
    @ApiResponse({ type: String })
    @Delete('class-fee/:id')
    async deleteClassFee(
        @Param('id') id: string,
    ): Promise<Boolean> {
        return await this.service.deleteFee(id);
    }
    @ApiResponse({ type: ClassList })
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
    @Get("attendence/:id")
    async findAllClasAttendence(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
        @Param('id') id: string
    ): Promise<PageResponse<any>> {
        const data = await this.service.getAtendenceOfClass({
            pageNo,
            pageSize,
        }, id);
        return createPageResponse(data.data, { pageNo, pageSize }, data.total);
    }
    @ApiOperation({
        summary: 'Create new class fee',
    })
    @ApiResponse({ type: ClassFeeBulkDto })
    @Post('attendence/:id')
    async createAttendence(@Body() createClassDto: CreateClassTimeBulkDto, @Param("id") id: string): Promise<Boolean> {
        return await this.service.createClassTime(createClassDto);
    }

    @Get("attendence/student/:id")
    async findAllClasAttendenceStudent(

        @Param('id') id: string
    ): Promise<any> {
        const data = await this.service.getAtendenceOfClassStudent(id);
        return data;
    }
    @ApiOperation({
        summary: 'Create new class fee',
    })
    @ApiResponse({ type: CreateClassTimeBulkDto })
    @Put('attendence/:id')
    async updateAttendence(@Body() createClassDto: CreateClassTimeBulkDto, @Param("id") id: string): Promise<Boolean> {
        return await this.service.updateClassTime(id, createClassDto);
    }
    @ApiOperation({
        summary: 'Create new class fee',
    })

    @Get('userFeeByRole/:id')
    async getUserFeeBuRole(@Param("id") id: string): Promise<any> {
        return await this.service.getUserFeeOfClassByRole(id);
    }
    @Get("attendence/user/:id/:classId")
    async getAttendenceOfUser(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
        @Param('id') id: string,
        @Param('classId') classId: string
    ): Promise<PageResponse<any>> {
        const data = await this.service.getAttendenceOfUser({
            pageNo,
            pageSize,
        }, id,classId);
        return createPageResponse(data.data, { pageNo, pageSize }, data.total);
    }
    @Get("role/:id")
    async getClassByStudent(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
        @Param('id') id: string,
    ): Promise<PageResponse<any>> {
        const [data, total]= await this.service.getClassByRole({
            pageNo,
            pageSize,
        }, id);
        return createPageResponse(data, { pageNo, pageSize }, total);
    }
    
    @ApiResponse({ type: ClassFeeList })
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
    @Get("userFeeByRoleData/:id")
    async getFeeByStudent(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
        @Param('id') id: string,
    ): Promise<PageResponse<ClassFeeDto>> {
        console.log(1);
        const [data,total]= await this.service.getClassFeeOfUser({
            pageNo,
            pageSize,
        }, id);
        
      
        return createPageResponse(data, { pageNo, pageSize }, total);
    }
}
