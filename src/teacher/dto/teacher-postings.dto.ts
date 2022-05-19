import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class TeacherPostingsDto {
  @Expose()
  postingId: string;

  @ApiProperty({
    type: String,
    description: "ID of the teacher for which postig info is stored",
  })
  @Expose()
  teacherId: string;

  @ApiProperty({
    type: String,
    description: "Designation of the teacher at time of joining that posting",
  })
  @Expose()
  joiningDesignation: string;

  @ApiProperty({
    type: String,
    description: "Designation of the teacher while leaving that posting",
  })
  @Expose()
  leavingDesignation: string;

  @ApiProperty({
    type: String,
    description: "Date of joining in that posting",
  })
  @Expose()
  dateOfJoining: string;

  @ApiProperty({
    type: String,
    description: "Date of relieving from that posting",
  })
  @Expose()
  dateOfrelieving: string;

  @ApiProperty({
    type: String,
    description: "Reason of closure of that posting",
  })
  @Expose()
  reason: string;

  @ApiProperty({
    type: String,
    description: "any remark",
  })
  @Expose()
  remark: string;
}
