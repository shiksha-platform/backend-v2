import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SaveTeacherDto {
  @Expose()
  teacherId: string;

  @ApiProperty({
    type: String,
    description: "The firstname of the teacher",
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    type: String,
    description: "The lastname of the teacher",
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    type: String,
    description: "The contact number of the teacher",
  })
  @IsNumber()
  contactNumber: string;

  @ApiProperty({
    type: String,
    description: "The email of the teacher",
  })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: "The gender of the teacher",
  })
  @Expose()
  gender: string;

  @ApiProperty({
    type: String,
    description: "The socialCategory of the teacher",
  })
  @Expose()
  socialCategory: string;

  @ApiProperty({
    type: String,
    description: "The birthDate of the teacher",
  })
  @Expose()
  birthDate: string;

  @ApiProperty({
    type: String,
    description: "The designation of the teacher",
  })
  @Expose()
  designation: string;

  @ApiProperty({
    type: String,
    description: "The cadre of the teacher",
  })
  @Expose()
  cadre: string;

  @ApiProperty({
    type: String,
    description: "The profQualification of the teacher",
  })
  @Expose()
  profQualification: string;

  @ApiProperty({
    type: String,
    description: "The joiningDate of the teacher",
  })
  @Expose()
  joiningDate: string;

  @ApiProperty({
    type: String,
    description: "The subjectId of the teacher",
  })
  @Expose()
  subjectId: string;

  @ApiProperty({
    type: String,
    description: "The bloodGroup of the teacher",
  })
  @Expose()
  bloodGroup: string;

  @ApiProperty({
    type: String,
    description: "The maritalStatus of the teacher",
  })
  @Expose()
  maritalStatus: string;

  @ApiProperty({
    type: String,
    description: "The blockId of the teacher",
  })
  @Expose()
  blockI: string;

  @ApiProperty({
    type: String,
    description: "The address of the teacher",
  })
  @Expose()
  address: string;

  @ApiProperty({
    type: String,
    description: "The compSkills of the teacher",
  })
  @Expose()
  compSkills: string;

  @ApiProperty({
    type: String,
    description: "The disability of the teacher",
  })
  @Expose()
  disability: string;

  @ApiProperty({
    type: String,
    description: "The religion of the teacher",
  })
  @Expose()
  religion: string;

  @ApiProperty({
    type: String,
    description: "The homeDistance of the teacher",
  })
  @Expose()
  homeDistance: string;

  @ApiProperty({
    type: String,
    description: "The roles of the teacher",
  })
  @Expose()
  roles: string;

  @ApiProperty({
    type: String,
    description: "The schoolId of the teacher",
  })
  @Expose()
  schoolId: string;

  @ApiProperty({
    type: String,
    description: "The acrId of the teacher",
  })
  @Expose()
  acrId: string;

  @ApiProperty({
    type: String,
    description: "The retirementDate of the teacher",
  })
  @Expose()
  retirementDate: string;

  @ApiProperty({
    type: String,
    description: "The workingStatus of the teacher",
  })
  @Expose()
  workingStatus: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: SaveTeacherDto) {
    Object.keys(obj).forEach((key) => (obj[key] === "" ? delete obj[key] : {}));
    Object.assign(this, obj);
  }
}
