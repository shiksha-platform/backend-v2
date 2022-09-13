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
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  Req,
  Query,
  CacheInterceptor,
  UploadedFile,
} from "@nestjs/common";
import { GroupSearchDto } from "./dto/group-search.dto";
import { Request } from "@nestjs/common";
import { GroupDto } from "./dto/group.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./utils/file-upload.utils";
import { diskStorage } from "multer";

import { GroupAdapter } from "./groupadapter";

@ApiTags("Group")
@Controller("group")
export class GroupController {
  constructor(private groupAdapter: GroupAdapter) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getGroup(@Param("id") groupId: string, @Req() request: Request) {
    return this.groupAdapter.buildGroupAdapter().getGroup(groupId, request);
  }

  @Post()
  @ApiConsumes("multipart/form-data")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group has been created successfully." })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: process.env.IMAGEPATH,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @ApiBody({ type: GroupDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createGroup(
    @Req() request: Request,
    @Body() groupDto: GroupDto,
    @UploadedFile() image
  ) {
    const response = {
      image: image?.filename,
    };
    Object.assign(groupDto, response);

    return this.groupAdapter.buildGroupAdapter().createGroup(request, groupDto);
  }

  @Put("/:id")
  @ApiConsumes("multipart/form-data")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group has been updated successfully." })
  @UseInterceptors(
    FileInterceptor("image", {
      storage: diskStorage({
        destination: process.env.IMAGEPATH,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  @ApiBody({ type: GroupDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateGroup(
    @Param("id") groupId: string,
    @Req() request: Request,
    @Body() groupDto: GroupDto,
    @UploadedFile() image
  ) {
    const response = {
      image: image?.filename,
    };
    Object.assign(groupDto, response);

    return this.groupAdapter
      .buildGroupAdapter()
      .updateGroup(groupId, request, groupDto);
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group list." })
  @ApiBody({ type: GroupSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchGroup(
    @Req() request: Request,
    @Body() groupSearchDto: GroupSearchDto
  ) {
    return this.groupAdapter
      .buildGroupAdapter()
      .searchGroup(request, groupSearchDto);
  }

  @Get(":groupId/participants")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Group detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async findMembersOfGroup(
    @Param("groupId") id: string,
    @Query("role") role: string,
    @Req() request: Request
  ) {
    return this.groupAdapter
      .buildGroupAdapter()
      .findMembersOfGroup(id, role, request);
  }

  @Get("participant/:userId")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Group detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async getGroupsByUserId(
    @Param("userId") id: string,
    @Query("role") role: string,
    @Req() request: Request
  ) {
    return this.groupAdapter
      .buildGroupAdapter()
      .findGroupsByUserId(id, role, request);
  }

  @Get(":groupId/child")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Group detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async findMembersOfChildGroup(
    @Param("groupId") id: string,
    @Query("role") role: string,
    @Req() request: Request
  ) {
    return this.groupAdapter
      .buildGroupAdapter()
      .findMembersOfChildGroup(id, role, request);
  }

  @Get("child/:schoolId")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Group detail." })
  @ApiForbiddenResponse({ description: "Forbidden" })
  public async findMembersOfChildSchool(
    @Param("schoolId") id: string,
    @Query("role") role: string,
    @Req() request: Request
  ) {
    return this.groupAdapter
      .buildGroupAdapter()
      .findMembersOfSchool(id, role, request);
  }
}
