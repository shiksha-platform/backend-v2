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
import {
  ApiTags,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiBasicAuth,
} from "@nestjs/swagger";
import { request } from "http";
import { StudentInterface } from "./interfaces/student.interface";
import { StudentService } from "./student.service";
import { Request } from "express";
import { StudentDto } from "./dto/student.dto";
@ApiTags("Student")
@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  @ApiOkResponse({ description: "Student detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getStudent(@Param("id") id: string, @Req() request: Request) {
    return this.studentService.getStudent(id, request);
  }

  @Post()
  @ApiCreatedResponse({ description: "Student has been created successfully." })
  @ApiBody({ type: StudentDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createStudent(
    @Req() request: Request,
    @Body() studentDto: StudentDto
  ) {
    return this.studentService.createStudent(request, studentDto);
  }

  @Put("/:id")
  @ApiCreatedResponse({ description: "Student has been Updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateStudent(@Req() request: Request) {
    return this.studentService.updateStudent(request);
  }
}
