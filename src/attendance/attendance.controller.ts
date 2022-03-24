import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { AttendanceInterface } from './interfaces/attendance.interface';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {

    constructor(private service: AttendanceService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
