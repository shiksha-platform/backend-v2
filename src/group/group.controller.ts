import {
  GroupService,
  SunbirdGroupToken,
} from "../adapters/sunbirdrc/group.adapter";
import {
  GroupMembershipService,
  SunbirdGroupMembershipToken,
} from "src/adapters/sunbirdrc/groupMembership.adapter";
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
  Inject,
} from "@nestjs/common";
import { GroupSearchDto } from "./dto/group-search.dto";
import { Request } from "@nestjs/common";
import { GroupDto } from "./dto/group.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./utils/file-upload.utils";
import { diskStorage } from "multer";
import { IServicelocator } from "src/adapters/groupmembershipservicelocator";
import { EsamwadGroupMembershipToken } from "src/adapters/esamwad/groupMembership.adapter";
import { EsamwadGroupToken } from "src/adapters/esamwad/group.adapter";
import { IServicelocatorgroup } from "src/adapters/groupservicelocator";

@ApiTags("Group")
@Controller("group")
export class GroupController {
  constructor(
    private service: GroupService,
    private membershipService: GroupMembershipService,
    @Inject(EsamwadGroupMembershipToken)
    private eSamwadProvider: IServicelocator,
    @Inject(SunbirdGroupMembershipToken)
    private sunbirdProvider: IServicelocator,

    @Inject(EsamwadGroupToken)
    private eSamwadProvidergroup: IServicelocatorgroup,
    @Inject(SunbirdGroupToken)
    private sunbirdProvidergroup: IServicelocatorgroup
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Group detail" })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async getGroup(@Param("id") groupId: string, @Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvidergroup.getGroup(groupId, request);
    } else {
      return this.eSamwadProvidergroup.getGroup(groupId, request);
    }
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
    return this.service.createGroup(request, groupDto);
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
    return await this.service.updateGroup(groupId, request, groupDto);
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
  public async searchStudent(
    @Req() request: Request,
    @Body() groupSearchDto: GroupSearchDto
  ) {
    return await this.service.searchGroup(request, groupSearchDto);
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.findMembersOfGroup(id, role, request);
    } else {
      return this.eSamwadProvider.findMembersOfGroup(id, role, request);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.findGroupsByUserId(id, role, request);
    } else {
      return this.eSamwadProvider.findGroupsByUserId(id, role, request);
    }
  }
}
