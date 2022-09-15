import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class TemplateProcessDto {
  @ApiProperty({
    description: "Id of created template",
  })
  id: number;

  @ApiProperty({
    description: "Data to update",
  })
  @ApiPropertyOptional()
  data: object;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
