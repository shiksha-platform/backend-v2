import {
  AttendanceService,
  SunbirdAttendanceToken,
} from "../adapters/sunbirdrc/attendance.adapter";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiConsumes,
  ApiQuery,
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
  CacheInterceptor,
  Query,
  Inject,
  CACHE_MANAGER,
} from "@nestjs/common";
import { AttendanceDto } from "./dto/attendance.dto";
import { request } from "http";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "./utils/file-upload.utils";
import { AttendanceSearchDto } from "./dto/attendance-search.dto";
import {
  AttendanceEsamwadService,
  EsamwadAttendanceToken,
} from "src/adapters/esamwad/attendance.adapter";
import { IServicelocator } from "src/adapters/attendanceservicelocator";
@ApiTags("Attendance")
@Controller("attendance")
export class AttendanceController {
  constructor(
    private service: AttendanceService,
    private hasuraService: AttendanceEsamwadService,
    @Inject(EsamwadAttendanceToken) private eSamwadProvider: IServicelocator,
    @Inject(SunbirdAttendanceToken) private sunbirdProvider: IServicelocator
  ) {
    console.log("in controller 123");
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
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
    if (process.env.ATTENDANCESOURCE === "sunbird") {
      return this.sunbirdProvider.getAttendance(attendanceId, request);
    } else {
      return this.eSamwadProvider.getAttendance(attendanceId, request);
    }
  }
}
