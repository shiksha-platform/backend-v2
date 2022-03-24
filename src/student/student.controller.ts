import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { StudentInterface } from './interfaces/student.interface';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {

    constructor(private service: StudentService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }
    
    
}
