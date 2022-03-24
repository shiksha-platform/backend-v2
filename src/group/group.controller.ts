import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { GroupInterface } from './interfaces/group.interface';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {

    constructor(private service: GroupService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
