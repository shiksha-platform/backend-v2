import { Controller, Get, Post, Put, Patch, Param } from '@nestjs/common';
import { GroupService } from '../adapters/default/group.adapter';

@Controller('group')
export class GroupController {

    constructor(private service: GroupService) {}

    @Get(":id")
    getOne(@Param('id') id): any {
      return this.service.getOne(id)
    }    
}
