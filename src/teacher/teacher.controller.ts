import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { TeacherInterface } from './interfaces/teacher.interface';
import { TeacherService } from './teacher.service';

@Controller('teacher')
export class TeacherController {

    constructor(private service: TeacherService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
