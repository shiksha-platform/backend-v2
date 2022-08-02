import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BlockDto } from "./block.dto";

export class ContentPagesDto {

    @ApiProperty({
        type: String,
        description: "The id of the content-page ",
        default: "",
    })
    @Expose()
    contentPageId: string;

    @ApiProperty({
        type: String,
        description: "The slug of the content-page ",
        default: "",
    })
    @Expose()
    slugUrl: string;

    @ApiProperty({
        type: String,
        description: "The title of content page",
        default: "",
    })
    @Expose()
    title: string;

    @ApiProperty({
        type: String,
        description: "Date modified for content page",
        default: "",
    })
    @Expose()
    dateModified: string;

    @ApiProperty({
        type: String,
        description: "The status of the page-draft or published",
        default: "",
    })
    @Expose()
    status: string;

    @ApiProperty({
        type: Array,
        description: "The blocks for the content page",
        default: []
    })
    @Expose()
    blocks: Array<BlockDto>;

    constructor(obj: any) {
        this.contentPageId = obj?.id ?? "",
            this.slugUrl = obj?.slug ?? "",
            this.title = obj?.title ?? "",
            this.dateModified = obj?.modified_at ?? "",
            this.status = obj?.status ?? "",
            this.blocks = obj?.blocks ?? []
    }
}