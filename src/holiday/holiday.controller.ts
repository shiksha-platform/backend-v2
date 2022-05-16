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
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
import { HolidayService } from "src/adapters/default/holiday.adapter";
import { HolidayDto } from "./dto/holiday.dto";
import { HolidaySearchDto } from "./dto/holiday-search.dto";
import { Request } from "@nestjs/common";
@ApiTags("Holiday")
@Controller("holiday")
export class HolidayController {
  constructor(private readonly service: HolidayService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Holiday detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getHolidays(@Param("id") holidayId: string, @Req() request: Request) {
    return this.service.getHoliday(holidayId, request);
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
    return this.service.createHoliday(request, holidayDto);
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
    return await this.service.updateHoliday(holidayId, request, holidayDto);
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
    return await this.service.searchHoliday(request, holidaySearchDto);
  }
}
