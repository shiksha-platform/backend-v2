import {
  SunbirdGroupService,
  SunbirdGroupToken,
} from "../adapters/sunbirdrc/group.adapter";

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
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { GroupSearchDto } from "./dto/group-search.dto";
import { Request } from "@nestjs/common";
import { GroupDto } from "./dto/group.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "./utils/file-upload.utils";
import { diskStorage } from "multer";
import { EsamwadGroupToken } from "src/adapters/esamwad/group.adapter";

import { HasuraGroupToken } from "src/adapters/hasura/group.adapter";
import { IServicelocatorgroup } from "src/adapters/groupservicelocator";

@ApiTags("Group")
@Controller("group")
export class GroupController {
  constructor(
    private service: SunbirdGroupService,
    @Inject(EsamwadGroupToken)
    private eSamwadProvidergroup: IServicelocatorgroup,
    @Inject(SunbirdGroupToken)
    private sunbirdProvidergroup: IServicelocatorgroup,
    @Inject(HasuraGroupToken)
    private hasuraProvider: IServicelocatorgroup
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
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvidergroup.getGroup(groupId, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.getGroup(groupId, request);
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
  @UsePipes(new ValidationPipe({}))
  public async createGroup(
    @Req() request: Request,
    @Body() groupDto: GroupDto,
    @UploadedFile() image
  ) {
    const response = {
      image: image?.filename,
    };
    Object.assign(groupDto, response);

    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvidergroup.createGroup(request, groupDto);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvidergroup.createGroup(request, groupDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.createGroup(request, groupDto);
    }
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
  @UsePipes(new ValidationPipe({}))
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

    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvidergroup.updateGroup(groupId, request, groupDto);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvidergroup.updateGroup(groupId, request, groupDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.updateGroup(groupId, request, groupDto);
    }
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
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvidergroup.searchGroup(request, groupSearchDto);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvidergroup.searchGroup(request, groupSearchDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.searchGroup(request, groupSearchDto);
    }
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
      return this.sunbirdProvidergroup.findMembersOfGroup(id, role, request);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvidergroup.findMembersOfGroup(id, role, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.findMembersOfGroup(id, role, request);
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
      return this.sunbirdProvidergroup.findGroupsByUserId(id, role, request);
    } else if (process.env.ADAPTERSOURCE === "esamwad") {
      return this.eSamwadProvidergroup.findGroupsByUserId(id, role, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.findGroupsByUserId(id, role, request);
    }
  }
}
