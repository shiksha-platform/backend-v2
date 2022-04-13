import { AttendanceService } from "../adapters/default/attendance.adapter";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiConsumes,
} from "@nestjs/swagger";
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
  Request,
  UploadedFile,
} from "@nestjs/common";
import { AttendanceDto } from "./dto/attendance.dto";
import { request } from "http";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "./utils/file-upload.utils";
import { AttendanceSearchDto } from "./dto/attendance-search.dto";
@ApiTags("Attendance")
@Controller("attendance")
export class AttendanceController {
  constructor(private service: AttendanceService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Attendance detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getAttendance(
    @Param("id") attendanceId: string,
    @Req() request: Request
  ) {
    return this.service.getAttendance(attendanceId, request);
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Attendance has been created successfully.",
  })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @ApiBody({ type: AttendanceDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createAttendace(
    @Req() request: Request,
    @Body() attendaceDto: AttendanceDto,
    @UploadedFile() image
  ) {
    const response = {
      image: image?.filename,
    };

    Object.assign(attendaceDto, response);
    return this.service.createAttendance(request, attendaceDto);
  }

  @Put("/:id")
  @ApiConsumes("multipart/form-data")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Attendance has been Updated successfully.",
  })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: "./uploads",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @ApiBody({ type: AttendanceDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateAttendace(
    @Param("id") attendanceId: string,
    @Req() request: Request,
    @Body() attendaceDto: AttendanceDto,
    @UploadedFile() image
  ) {
    const response = {
      image: image?.filename,
    };

    Object.assign(attendaceDto, response);
    return this.service.updateAttendance(attendanceId, request, attendaceDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Attendance list." })
  @ApiBody({ type: AttendanceSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchAttendance(
    @Req() request: Request,
    @Body() studentSearchDto: AttendanceSearchDto
  ) {
    return await this.service.searchAttendance(request, studentSearchDto);
  }
}
