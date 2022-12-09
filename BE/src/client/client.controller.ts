
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { Public } from 'src/auth/decorators/roles.decorator';
import { PageResponse } from 'src/common/interface/page-reponse.interface';
import { createPageResponse } from 'src/common/utils';
import { CreateCustomerDto } from './dto/customer.dto';
import { BannerPosition } from 'src/content/entity/banner-enum.entity';
import { CreateAdmissionDto } from './dto/admissions.dto';

@ApiTags('Client')
@Controller('client')
@Public()
export class ClientController {
    constructor(private readonly service: ClientService) {

    }
    @Get('introduce')
    async getIntroduce(
    ): Promise<any> {
        return this.service.getIntroduce("INTRODUCE");
    }

    @Get('introduce/:id')
    async getIntroduceDetails(
        @Param("id") id:string
    ): Promise<any> {
        return this.service.getOne(id);
    }
    @Get('eventLastNews')
    async getLastNewsEvent(

    ): Promise<any> {
        return this.service.getLastNews(BannerPosition.NEWS);
    }
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
    @Get("news")
    async findAllClasAttendence(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
    ): Promise<PageResponse<any>> {
        const data = await this.service.getNews({
            pageNo,
            pageSize,
        },BannerPosition.NEWS);
        return createPageResponse(data.data, { pageNo, pageSize }, data.total);
    }
    @ApiQuery({
        name: 'type',
        required: false,
        type: String,
    })
    @Get('banner')
    async getBannerHome(
        @Query('type') type :string,
    ): Promise<any> {
        return this.service.getBanner(type);
    }

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
    
    @Get("customer")
    async findCustomer(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
    ): Promise<PageResponse<any>> {
        const data = await this.service.getAllCustomer({
            pageNo,
            pageSize,
        });
        return createPageResponse(data.data, { pageNo, pageSize }, data.total);
    }
    @ApiBearerAuth()
    @Post('customer')
    async craeteFeedback(
        @Body() createCustomerDto : CreateCustomerDto
    ): Promise<any> {
        return this.service.createCustomer(createCustomerDto);
    }
    @ApiBearerAuth()
    @Put('customer/:id')
    async updateFeedback(
        @Body() createCustomerDto : CreateCustomerDto,
        @Param("id")id:string
    ): Promise<any> {
        return this.service.updateCustomer(id,createCustomerDto);
    }
    @Get('infrastructure')
    async getInfrastructure(
    ): Promise<any> {
        return this.service.getIntroduce("INFRASTRUCTURE");
    }

    @Get('core_values')
    async getCoreValues(
    ): Promise<any> {
        return this.service.getIntroduce("CORE_VALUES");
    }
    

    @Get('take_care_last')
    async getLastTakeCareEvent(

    ): Promise<any> {
        return this.service.getLastNews(BannerPosition.TAKE_CAKE);
    }
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
    @Get("take_care")
    async findAllTakeCare(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
    ): Promise<PageResponse<any>> {
        const data = await this.service.getNews({
            pageNo,
            pageSize,
        },BannerPosition.TAKE_CAKE);
        return createPageResponse(data.data, { pageNo, pageSize }, data.total);
    }
    @Post("addmision")
    async createAdmissions(
        @Body() fee: CreateAdmissionDto
    ): Promise<any> {

        const data = await this.service.createAdmissions(fee);

        return data;
    }
    @ApiBearerAuth()
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
    @Get("addmision")
    async findAddmision(
        @Query('pageNo') pageNo = 1,
        @Query('pageSize') pageSize = 10,
    ): Promise<PageResponse<any>> {
        const data = await this.service.getAdmissions({
            pageNo,
            pageSize,
        });
        return createPageResponse(data.data, { pageNo, pageSize }, data.total);
    }
    @ApiBearerAuth()
    @Get("addmision/:id")
    async findAddmisionId(
        @Param("id")id:string
    ): Promise<any> {
      
        return await this.service.getAdmissionsOne(id);
    }
    @ApiBearerAuth()
    @Get('customer/:id')
    async getCustomerOne(
     
        @Param("id")id:string
    ): Promise<any> {
        return this.service.getCustomerOnd(id);
    }
}
