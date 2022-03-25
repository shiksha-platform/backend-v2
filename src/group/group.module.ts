import { Module } from "@nestjs/common";
import { GroupController } from "./group.controller";
import { GroupService } from "../adapters/default/group.adapter";
import { HttpModule } from "@nestjs/axios";
@Module({
  imports: [HttpModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
