import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Request,
  CacheInterceptor,
} from "@nestjs/common";
import { SchoolDto } from "./dto/school.dto";
import {
  ApiTags,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiCreatedResponse,
  ApiBasicAuth,
} from "@nestjs/swagger";
import { SchoolSearchDto } from "./dto/school-search.dto";
import { SchoolAdapter } from "./schooladapter";
@ApiTags("School")
@Controller("school")
export class SchoolController {
  constructor(private schoolAdapter: SchoolAdapter) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "School detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getSchool(@Param("id") id: string, @Req() request: Request) {
    return this.schoolAdapter.buildSchoolAdapter().getSchool(id, request);
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "School has been created successfully." })
  @ApiBody({ type: SchoolDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createSchool(
    @Req() request: Request,
    @Body() schoolDto: SchoolDto
  ) {
    return this.schoolAdapter
      .buildSchoolAdapter()
      .createSchool(request, schoolDto);
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "School has been updated successfully." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateSchool(
    @Param("id") id: string,
    @Req() request: Request,
    @Body() schoolDto: SchoolDto
  ) {
    return this.schoolAdapter
      .buildSchoolAdapter()
      .updateSchool(id, request, schoolDto);
  }
  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "School list." })
  @ApiBody({ type: SchoolSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchSchool(
    @Req() request: Request,
    @Body() schoolSearchDto: SchoolSearchDto
  ) {
    return this.schoolAdapter
      .buildSchoolAdapter()
      .searchSchool(request, schoolSearchDto);
  }
}
