import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Req,
  SerializeOptions,
} from "@nestjs/common";
import { TeacherInterface } from "./interfaces/teacher.interface";
import { TeacherService } from "./teacher.service";
import {
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiBasicAuth,
} from "@nestjs/swagger";
import { Request } from "express";

@Controller("teacher")
@ApiTags("Teacher")
export class TeacherController {
  constructor(private service: TeacherService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Teacher detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getTeacherById(
    @Param("id") id: string,
    @Req() request: Request
  ) {
    return this.service.findById(id, request);
  }
}
