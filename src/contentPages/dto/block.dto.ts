import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BlockDto {

    @ApiProperty({
        type: String,
        description: "The id of the block",
        default: "",
    })
    @Expose()
    blockId: string;

    @ApiProperty({
        type: String,
        description: "Type of the block",
        default: "",
    })
    @Expose()
    blockType: string;

    @ApiProperty({
        type: Object,
        description: "Data within the block",
        default: {},
    })
    @Expose()
    blockData: object;

    @ApiProperty({
        type: Number,
        description: "Index of the block for relative ordering of blocks (higher index denotes lower position on the page",
        default: {},
    })
    @Expose()
    blockIndex: number;

    constructor(obj: any) {
        this.blockId = obj?.id ?? "";
        this.blockType = obj?.block_type ?? "";
        this.blockData = obj?.block_data ?? {};
        this.blockIndex = obj?.block_index ?? 0;
    }
}