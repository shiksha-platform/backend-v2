import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

export class AdminFormDto {
  @Expose()
  adminFormId: string;
  @ApiProperty()
  @Expose()
  moduleId: string;
  @ApiProperty()
  @Expose()
  formSchema: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: any) {
    Object.assign(this, obj);
  }
}
