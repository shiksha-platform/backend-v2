import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  CacheInterceptor,
} from "@nestjs/common";
import { TeacherService } from "../adapters/default/teacher.adapter";
import { Request } from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";

import { TeacherDto } from "./dto/teacher.dto";
import { TeacherSearchDto } from "./dto/teacher-search.dto";
@ApiTags("Teacher")
@Controller("teacher")
export class TeacherController {
  constructor(private readonly service: TeacherService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Teacher detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getTeacher(@Param("id") id: string, @Req() request: Request) {
    return this.service.getTeacher(id, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Teacher has been created successfully." })
  @ApiBody({ type: TeacherDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createTeacher(
    @Req() request: Request,
    @Body() teacherDto: TeacherDto
  ) {
    return this.service.createTeacher(request, teacherDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Teacher has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateTeacher(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() teacherDto: TeacherDto
  ) {
    return await this.service.updateTeacher(id, request, teacherDto);
  }
  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Teacher list." })
  @ApiBody({ type: TeacherSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchTeacher(
    @Req() request: Request,
    @Body() teacherSearchDto: TeacherSearchDto
  ) {
    return await this.service.searchTeacher(request, teacherSearchDto);
  }
}
