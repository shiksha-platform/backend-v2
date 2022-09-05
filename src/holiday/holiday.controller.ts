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
  Query,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { HolidayDto } from "./dto/holiday.dto";
import { HolidaySearchDto } from "./dto/holiday-search.dto";
import { Request } from "@nestjs/common";
import { HolidayAdapter } from "./holidayadapter";
@ApiTags("Holiday")
@Controller("holiday")
export class HolidayController {
  constructor(private holidayProvider: HolidayAdapter) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Holiday detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getHolidays(@Param("id") holidayId: string, @Req() request: Request) {
    return this.holidayProvider
      .buildHolidayAdapter()
      .getHoliday(holidayId, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Holiday has been created successfully." })
  @ApiBody({ type: HolidayDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createHoliday(
    @Req() request: Request,
    @Body() holidayDto: HolidayDto
  ) {
    return await this.holidayProvider
      .buildHolidayAdapter()
      .createHoliday(request, holidayDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Holiday has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateHoliday(
    @Param("id") holidayId: string,
    @Req() request: Request,
    @Body() holidayDto: HolidayDto
  ) {
    return await this.holidayProvider
      .buildHolidayAdapter()
      .updateHoliday(holidayId, request, holidayDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Holiday list." })
  @ApiBody({ type: HolidaySearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchHoliday(
    @Req() request: Request,
    @Body() holidaySearchDto: HolidaySearchDto
  ) {
    return await this.holidayProvider
      .buildHolidayAdapter()
      .searchHoliday(request, holidaySearchDto);
  }

  @Get("")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: " Ok." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @ApiQuery({ name: "fromDate" })
  @ApiQuery({ name: "toDate" })
  public async holidayFilter(
    @Query("fromDate") date: string,
    @Query("toDate") toDate: string,
    @Req() request: Request
  ) {
    return await this.holidayProvider
      .buildHolidayAdapter()
      .holidayFilter(date, toDate, request);
  }
}
