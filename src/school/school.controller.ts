import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { SchoolInterface } from './interfaces/school.interface';
import { SchoolService } from './school.service';

@Controller('school')
export class SchoolController {

    constructor(private service: SchoolService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
