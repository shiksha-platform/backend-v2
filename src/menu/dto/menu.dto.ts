import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class MenuDto {
    // @ApiProperty({
    //   description: "Menu Id"
    // })

      @Expose()
      menuId:string;

    @ApiProperty({
      description:"title of menu",
    })
    @Expose()
    title : string;

    @Expose()
    alias: string;

    @ApiProperty({
        description: "Path",
    })
      @Expose()
      path: string;

    @ApiProperty({
        description: "state",
    })
      @Expose()
      state : string;

    @ApiProperty({
        description: "Menu type",
    })
      @Expose()
      menuType: string;
    
    @ApiProperty({
        description: "type",
    })
      @Expose()
      type: string;

    @ApiProperty({
        description: "parent",
    })
      @Expose()
      parent: string;

    @ApiProperty({
        description: "options",
    })
      @Expose()
      options: string;
    
    @Expose()
    createdAt: string;

    @Expose()
    updatedAt: string;

    @Expose()
    createdBy: string;

    @Expose()
    updatedBy: string;


    constructor(obj: any) {
      this.menuId=obj?.osid ? `${obj.osid}`:"";
      this.title = obj?.title ? `${obj.title}` : "";
      this.alias = obj?.alias ? `${obj.alias}` : "";
      this.path = obj?.path ? `${obj.path}` : "";
      this.state = obj?.state ? `${obj.state}` : "";
      this.menuType = obj?.menutype ? `${obj.menutype}` : "";
      this.type = obj?.type ? `${obj.type}` : "";
      this.parent = obj?.parent ? `${obj.parent}` : "";
      this.options = obj?.options ? obj.options : "";
      this.createdAt = obj?.osCreatedAt ? `${obj.osCreatedAt}` : "";
      this.updatedAt = obj?.osUpdatedAt ? `${obj.osUpdatedAt}` : "";
      this.createdBy = obj?.osCreatedBy ? `${obj.osCreatedBy}` : "";
      this.updatedBy = obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "";
    }    
}