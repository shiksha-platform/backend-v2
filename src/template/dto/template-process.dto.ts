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
    this.id = obj?.id ? obj.id : "";
    this.data = obj?.data ? obj.data : "";
  }
}
