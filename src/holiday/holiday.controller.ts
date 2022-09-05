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
  Inject,
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
import { SunbirdHolidayToken } from "src/adapters/sunbirdrc/holiday.adapter";
import { HolidayDto } from "./dto/holiday.dto";
import { HolidaySearchDto } from "./dto/holiday-search.dto";
import { Request } from "@nestjs/common";
import { IServicelocator } from "src/adapters/holidayservicelocator";
import { HasuraHolidayToken } from "src/adapters/hasura/holiday.adapter";
@ApiTags("Holiday")
@Controller("holiday")
export class HolidayController {
  constructor(
    @Inject(SunbirdHolidayToken)
    private sunbirdProvider: IServicelocator,
    @Inject(HasuraHolidayToken)
    private hasuraProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Holiday detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getHolidays(@Param("id") holidayId: string, @Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getHoliday(holidayId, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.getHoliday(holidayId, request);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.createHoliday(request, holidayDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.createHoliday(request, holidayDto);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.updateHoliday(
        holidayId,
        request,
        holidayDto
      );
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.updateHoliday(
        holidayId,
        request,
        holidayDto
      );
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.searchHoliday(
        request,
        holidaySearchDto
      );
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.searchHoliday(request, holidaySearchDto);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.holidayFilter(date, toDate, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.holidayFilter(date, toDate, request);
    }
  }
}
