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
import { LikeService } from "src/adapters/sunbirdrc/like.adapter";
import { LikeDto } from "./dto/like.dto";
import { LikeSearchDto } from "./dto/like-search.dto";
@ApiTags("Like")
@Controller("like")
export class LikeController {
  constructor(private readonly service: LikeService) {}

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "Like detail." })
  @SerializeOptions({
    strategy: "excludeAll",
  })
  getLikes(@Param("id") likeId: string, @Req() request: Request) {
    return this.service.getLike(likeId, request);
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
    return this.service.createLike(request, likeDto);
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
    return await this.service.updateLike(likeId, request, likeDto);
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
    return await this.service.searchLike(request, likeSearchDto);
  }

  @Post("/getAllLikes")
  @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
  @ApiBasicAuth("access-token")
  @ApiOkResponse({ description: "All Like." })
  @ApiQuery({name:"contextId"})
  @ApiQuery({name:"context"}) 
 public async getCountLike( @Query("contextId") contextId:string, @Query("context") context:string,  @Req() request: Request) {
    return this.service.getCountLike(contextId, context, request);
  }
}






