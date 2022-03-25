import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { AttendanceService } from '../adapters/default/attendance.adapter';

@Controller('attendance')
export class AttendanceController {

    constructor(private service: AttendanceService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
