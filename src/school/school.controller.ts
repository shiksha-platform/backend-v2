import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { SchoolService } from '../adapters/default/school.adapter';

@Controller('school')
export class SchoolController {

    constructor(private service: SchoolService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
