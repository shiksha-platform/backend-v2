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
import { Request } from "@nestjs/common";
@ApiTags("Holiday")
@Controller("holiday")
export class HolidayController {
  constructor(private readonly service: HolidayService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/:id")
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
}
