import {
    ApiBasicAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
  } from "@nestjs/swagger";
  import {
    Body,
    CacheInterceptor,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    SerializeOptions,
    UseInterceptors,
    Request,
  } from "@nestjs/common";
  import { MenuService } from "src/adapters/sunbirdrc/menu.adapter";
  import { MenuDto } from "./dto/menu.dto";
  import { MenuSearchDto } from "./dto/menu-search.dto"

  
  @ApiTags("Menu")
  @Controller("menu")
  export class MenuController {
    constructor(private service: MenuService) {}
  
    @Post()
    @ApiBasicAuth("access-token")
    @ApiCreatedResponse({
      description: "Menu has been created successfully.",
    })
    @ApiBody({ type: MenuDto })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @UseInterceptors(ClassSerializerInterceptor)
    public async createMenu(
      @Req() request: Request,
      @Body() menuDto: MenuDto
    ) {
      return this.service.createMenu(request, menuDto);
    }


    @Put("/:id")
    @ApiBasicAuth("access-token")
     @ApiCreatedResponse({
    description: "Menu has been updated successfully.",
    })
     @ApiForbiddenResponse({ description: "Forbidden" })
    @UseInterceptors(ClassSerializerInterceptor)
    public async updateMenu(
        @Param("id") id: string,
        @Req() request: Request,
        @Body() menuDto: MenuDto
    ) {
        return await this.service.updateMenu(id, request, menuDto);
    }

    @Get("/:id")
    @UseInterceptors(ClassSerializerInterceptor, CacheInterceptor)
    @ApiBasicAuth("access-token")
    @ApiOkResponse({ description: "Menu detail." })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @SerializeOptions({
        strategy: "excludeAll",
    })
    public async getMenu(
        @Param("id") menuId: string,
        @Req() request: Request
    ) {
        return this.service.getMenu(menuId, request);
    }

    @Post("/search")
    @ApiBasicAuth("access-token")
    @ApiCreatedResponse({ description: "Menu list." })
    @ApiBody({ type: MenuSearchDto })
    @ApiForbiddenResponse({ description: "Forbidden" })
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({
        strategy: "excludeAll",
    })
    public async searchMenu(
        @Req() request: Request,
        @Body() menuSearchDto: MenuSearchDto
    ) {
        return await this.service.searchMenu(request, menuSearchDto);
    }

}