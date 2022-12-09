
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleDto } from './dto/role.dto';
import { RoleService } from './role.service';
import { Controller, Get, Post, Put, Delete, Body, Param, HttpStatus, Query } from '@nestjs/common';
@ApiBearerAuth()
@ApiTags('role')
@Controller('role')
export class RoleController {
    constructor(private readonly service: RoleService) {
    }
    @Get()
    async findAll(
    ): Promise<RoleDto[]> {
      return await this.service.getAll();
    }
}
