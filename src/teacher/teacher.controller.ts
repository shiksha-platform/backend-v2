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
  Inject,
} from "@nestjs/common";
import {
  SunbirdTeacherToken,
  TeacherService,
} from "../adapters/sunbirdrc/teacher.adapter";
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
import { EsamwadTeacherToken } from "src/adapters/esamwad/teacher.adapter";
import { IServicelocator } from "src/adapters/teacherservicelocator";
@ApiTags("Teacher")
@Controller("teacher")
export class TeacherController {
  constructor(
    private readonly service: TeacherService,
    @Inject(EsamwadTeacherToken) private eSamwadProvider: IServicelocator,
    @Inject(SunbirdTeacherToken) private sunbirdProvider: IServicelocator
  ) {}

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

  @Get()
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Teacher detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getTeacherByAuth(@Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getTeacherByAuth(request);
    } else {
      return this.eSamwadProvider.getTeacherByAuth(request);
    }
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

  @Post("teachersegment/:schoolId")
  // @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Teacher list." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async teacherSegment(
    @Param("schoolId") schoolId: string,
    @Req() request: Request
  ) {
    return await this.service.teacherSegment(schoolId, request);
  }
}
