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
  ) {}

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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getAttendance(attendanceId, request);
    } else {
      return this.eSamwadProvider.getAttendance(attendanceId, request);
    }
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
        destination: process.env.IMAGEPATH,
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

    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.createAttendance(request, attendaceDto);
    } else {
      return this.eSamwadProvider.createAttendance(request, attendaceDto);
    }
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
    @Body() attendanceDto: AttendanceDto,
    @UploadedFile() image
  ) {
    const response = {
      image: image?.filename,
    };

    Object.assign(attendanceDto, response);
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.updateAttendance(
        attendanceId,
        request,
        attendanceDto
      );
    } else {
      return this.eSamwadProvider.updateAttendance(
        attendanceId,
        request,
        attendanceDto
      );
    }
  }

  @Post("multipleAttendance")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Attendance has been created successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async multipleAttendance(
    @Req() request: Request,
    @Body() attendanceDto: [Object]
  ) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.multipleAttendance(request, attendanceDto);
    } else {
      return this.eSamwadProvider.multipleAttendance(request, attendanceDto);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.searchAttendance(request, studentSearchDto);
    } else {
      return this.eSamwadProvider.searchAttendance(request, studentSearchDto);
    }
  }

  @Get("usersegment/:attendance")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  // @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "groupId", required: false })
  @ApiQuery({ name: "date" })
  public async userSegment(
    @Query("groupId") groupId: string,
    @Param("attendance") attendance: string,
    @Query("date") date: string,
    @Req() request: Request
  ) {
    return await this.service.userSegment(groupId, attendance, date, request);
  }

  @Get("")
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "fromDate", required: false })
  @ApiQuery({ name: "toDate", required: false })
  @ApiQuery({ name: "userId", required: false })
  @ApiQuery({ name: "userType", required: false })
  @ApiQuery({ name: "attendance", required: false })
  @ApiQuery({ name: "groupId", required: false })
  @ApiQuery({ name: "schoolId", required: false })
  @ApiQuery({ name: "eventId", required: false })
  @ApiQuery({ name: "topicId", required: false })
  public async attendanceFilter(
    @Query("fromDate") date: string,
    @Query("toDate") toDate: string,
    @Query("userId") userId: string,
    @Query("userType") userType: string,
    @Query("attendance") attendance: string,
    @Query("groupId") groupId: string,
    @Query("schoolId") schoolId: string,
    @Query("eventId") eventId: string,
    @Query("topicId") topicId: string,

    @Req() request: Request
  ) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.attendanceFilter(
        date,
        toDate,
        userId,
        userType,
        attendance,
        groupId,
        schoolId,
        eventId,
        topicId,
        request
      );
    } else {
      return this.eSamwadProvider.attendanceFilter(
        date,
        toDate,
        userId,
        userType,
        attendance,
        groupId,
        schoolId,
        eventId,
        topicId,
        request
      );
    }
  }
}
