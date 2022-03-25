import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
} from "@nestjs/common";
import { TeacherInterface } from "./interfaces/teacher.interface";
import { TeacherService } from "../adapters/default/teacher.adapter";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { request } from "http";
import { Request } from "express";
import { TeacherDto } from "./dto/teacher.dto";
@ApiTags("Teacher")
@Controller("teacher")
export class TeacherController {
  constructor(private service: TeacherService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  @ApiOkResponse({ description: "Teacher detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getTeacher(@Param("id") id: string, @Req() request: Request) {
    return this.service.getTeacher(id, request);
  }

  @Post()
  @ApiCreatedResponse({ description: "Teacher has been created successfully." })
  @ApiBody({ type: TeacherDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createStudent(
    @Req() request: Request,
    @Body() teacherDto: TeacherDto
  ) {
    return this.service.createTeacher(request, teacherDto);
  }
}
