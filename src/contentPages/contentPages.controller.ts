import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  SerializeOptions,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBasicAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
} from "@nestjs/swagger";
import { IServicelocator } from "src/adapters/contentpagesservicelocator";
import {
  ContentPagesEsamwadService,
  ESamwadContentPagesToken,
} from "src/adapters/esamwad/contentPages.adapter";
import { ContentPagesDto } from "./dto/contentPages.dto";

@Controller('contentPages')
export class ContentPagesController {
  constructor(private hasuraService: ContentPagesEsamwadService,
    @Inject(ESamwadContentPagesToken) private eSamwadProvider: IServicelocator) { }


  //to create a content page with blockdata
  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Content page created",
  })
  @ApiBody({ type: ContentPagesDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async createContentPage(
    @Req() request: Request,
    @Body() contentPageData: ContentPagesDto
  ) {
    return this.eSamwadProvider.createContentPage(request, contentPageData);
  }

  //to retreive details about a given content page
  @Get("/:slug")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Retreived details about content page" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async getContentPageData(
    @Param("slug") contentPageSlug: string,
    @Req() request: Request
  ) {
    return this.eSamwadProvider.getContentPageData(contentPageSlug, request);
  }

  @Get("")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Fetched content pages set" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async getContentPagesSet(
    @Param("limit") limit: number,
    @Param("offset") offset: number,
    @Req() request: Request
  ) {
    return this.eSamwadProvider.getContentPagesSet(request, limit, offset);
  }

  //to update content page with given id
  @Put("/:id")
  @ApiConsumes("multipart/form-data")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Content page data has been updated successfully.",
  })
  @ApiBody({ type: ContentPagesDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateContentPageData(
    @Param("id") contentPageId: string,
    @Req() request: Request,
    @Body() contentPageData: any
  ) {
    const updatedData = JSON.parse(contentPageData?.data);
    return this.eSamwadProvider.updateContentPageData(
      contentPageId,
      request,
      updatedData
    );
  }

  //to delete content page
  @Delete("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Deleted the content page successfully" })
  public async deleteContentPage(
    @Param("id") contentPageId: string,
    @Req() request: Request
  ) {
    return this.eSamwadProvider.deleteContentPage(contentPageId, request);
  }

}
