import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class TeacherDto {
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
    type: [String],
    description: "The subjectId of the teacher",
  })
  @Expose()
  subjectIds: [String];

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
  blockId: string;

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
    description: "The schoolId of the teacher",
  })
  @Expose()
  schoolId: string;

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

  @ApiProperty({
    type: String,
    description: "The image of the teacher",
  })
  @Expose()
  image: string;

  @ApiProperty({
    type: String,
    description: "The employmentType of the teacher",
  })
  @Expose()
  employmentType: string;

  @ApiProperty({
    type: String,
    description: "The status of the teacher",
  })
  @Expose()
  status: string;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedBy: string;

  constructor(obj: TeacherDto) {
    Object.assign(this, obj);
    this.teacherId = `${this.teacherId}`;
    this.firstName = `${this.firstName}`;
    this.lastName = `${this.lastName}`;
    this.contactNumber = `${this.contactNumber}`;
    this.email = `${this.email}`;
    this.gender = `${this.gender}`;
    this.socialCategory = `${this.socialCategory}`;
    this.birthDate = `${this.birthDate}`;
    this.designation = `${this.designation}`;
    this.cadre = `${this.cadre}`;
    this.profQualification = `${this.profQualification}`;
    this.joiningDate = `${this.joiningDate}`;
    this.subjectIds = this.subjectIds;
    this.bloodGroup = `${this.bloodGroup}`;
    this.maritalStatus = `${this.maritalStatus}`;
    this.blockId = `${this.blockId}`;
    this.address = `${this.address}`;
    this.compSkills = `${this.compSkills}`;
    this.disability = `${this.disability}`;
    this.religion = `${this.religion}`;
    this.homeDistance = `${this.homeDistance}`;
    this.employmentType = `${this.employmentType}`;
    this.schoolId = `${this.schoolId}`;
    this.image = `${this.image}`;
    this.status = `${this.status}`;
    this.retirementDate = `${this.retirementDate}`;
    this.workingStatus = `${this.workingStatus}`;
    this.createdAt = `${this.createdAt}`;
    this.updatedAt = `${this.updatedAt}`;
    this.createdBy = `${this.createdBy}`;
    this.updatedBy = `${this.updatedBy}`;
  }
}
