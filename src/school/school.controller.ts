import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Request,
  CacheInterceptor,
  Inject,
} from "@nestjs/common";
import {
  SchoolService,
  SunbirdSchoolToken,
} from "../adapters/sunbirdrc/school.adapter";
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
import {
  EsamwadSchoolService,
  EsamwadSchoolToken,
} from "src/adapters/esamwad/school.adapter";
import { IServicelocator } from "src/adapters/schoolservicelocator";
import { HasuraSchoolToken } from "src/adapters/hasura/school.adapter";
@ApiTags("School")
@Controller("school")
export class SchoolController {
  constructor(
    private service: SchoolService,
    private esamwadService: EsamwadSchoolService,
    @Inject(EsamwadSchoolToken) private eSamwadProvider: IServicelocator,
    @Inject(SunbirdSchoolToken) private sunbirdProvider: IServicelocator,
    @Inject(HasuraSchoolToken) private hasuraProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "School detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getSchool(@Param("id") id: string, @Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.getSchool(id, request);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvider.getSchool(id, request);
    } else if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getSchool(id, request);
    }
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
    if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.createSchool(request, schoolDto);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvider.createSchool(request, schoolDto);
    } else if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.createSchool(request, schoolDto);
    }
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
    if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.updateSchool(id, request, schoolDto);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvider.updateSchool(id, request, schoolDto);
    } else if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.updateSchool(id, request, schoolDto);
    }
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
    if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.searchSchool(request, schoolSearchDto);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvider.searchSchool(request, schoolSearchDto);
    } else if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.searchSchool(request, schoolSearchDto);
    }
  }
}
