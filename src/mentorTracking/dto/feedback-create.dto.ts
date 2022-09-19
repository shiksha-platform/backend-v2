import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import * as FormData from "form-data";
export class FeedbackCreateDto {
  @ApiProperty({})
  feedback: FormData;

  @ApiProperty({ type: "string", format: "binary" })
  image: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
