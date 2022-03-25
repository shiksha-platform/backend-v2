import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { TeacherService } from '../adapters/default/teacher.adapter';

@Controller('teacher')
export class TeacherController {

    constructor(private service: TeacherService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
