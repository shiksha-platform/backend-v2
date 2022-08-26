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
  Delete,
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
import { Request } from "@nestjs/common";
import { SunbirdLikeToken } from "src/adapters/sunbirdrc/like.adapter";
import { LikeDto } from "./dto/like.dto";
import { LikeSearchDto } from "./dto/like-search.dto";
import { HasuraLikeToken } from "src/adapters/hasura/like.adapter";
import { IServicelocator } from "src/adapters/likeservicelocator";
@ApiTags("Like")
@Controller("like")
export class LikeController {
  constructor(
    @Inject(SunbirdLikeToken)
    private sunbirdProvider: IServicelocator,
    @Inject(HasuraLikeToken)
    private hasuraProvider: IServicelocator
  ) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Like detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getLike(@Param("id") likeId: string, @Req() request: Request) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.getLike(likeId, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.getLike(likeId, request);
    }
  }

  @Post()
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Like has been created successfully.",
  })
  @ApiBody({ type: LikeDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async createLike(@Req() request: Request, @Body() likeDto: LikeDto) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return this.sunbirdProvider.createLike(request, likeDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return this.hasuraProvider.createLike(request, likeDto);
    }
  }

  @Put("/:id")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({
    description: "Like has been updated successfully.",
  })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateLike(
    @Param("id") likeId: string,
    @Req() request: Request,
    @Body() likeDto: LikeDto
  ) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.updateLike(likeId, request, likeDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.updateLike(likeId, request, likeDto);
    }
  }

  @Post("/search")
  @ApiBasicAuth("access-token")
  @ApiCreatedResponse({ description: "Like list." })
  @ApiBody({ type: LikeSearchDto })
  @ApiForbiddenResponse({ description: "Forbidden" })
  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    strategy: "excludeAll",
  })
  public async searchLike(
    @Req() request: Request,
    @Body() likeSearchDto: LikeSearchDto
  ) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.searchLike(request, likeSearchDto);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.searchLike(request, likeSearchDto);
    }
  }

  @Post("/getAllLikes")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "All Like." })
  @ApiQuery({ name: "contextId" })
  @ApiQuery({ name: "context" })
  public async getCountLike(
    @Query("contextId") contextId: string,
    @Query("context") context: string,
    @Req() request: Request
  ) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.getCountLike(
        contextId,
        context,
        request
      );
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.getCountLike(
        contextId,
        context,
        request
      );
    }
  }

  @Delete("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Delete like. " })
  public async deleteLike(
    @Param("id") likeId: string,
    @Req() request: Request
  ) {
    if (process.env.ADAPTERSOURCE === "sunbird") {
      return await this.sunbirdProvider.deleteLike(likeId, request);
    } else if (process.env.ADAPTERSOURCE === "hasura") {
      return await this.hasuraProvider.deleteLike(likeId, request);
    }
  }
}
