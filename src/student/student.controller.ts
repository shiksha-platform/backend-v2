import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { StudentService } from '../adapters/default/student.adapter';

@Controller('student')
export class StudentController {

    constructor(private service: StudentService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }
    
    
}
