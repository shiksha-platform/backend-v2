<<<<<<< HEAD
import { Exclude, Expose } from "class-transformer";
import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StudentDto {
  @Exclude()
  osid: string;

  @ApiProperty({
    type: String,
    description: "The aadhaar of the student",
  })
  @MaxLength(16)
  @Expose()
  aadhaar: string;

  @ApiProperty({
    type: String,
    description: "The reference student id of the student",
  })
  @Expose()
  refStudentId: string;

  @ApiProperty({
    type: String,
    description: "The firstname of the student",
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    type: String,
    description: "The lastname of the student",
  })
  @Expose()
  lastName: string;
  @ApiProperty({
    type: Number,
    description: "The phone number of student",
  })
  @Expose()
  @IsNumber()
  phoneNumber: Number;

  @ApiProperty({
    type: String,
    description: "The email id of the student",
  })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: "The gender of the student",
  })
  @Expose()
  gender: string;

  @ApiProperty({
    type: String,
    description: "The social category of the student",
  })
  @Expose()
  socialCategory: string;

  @ApiProperty({
    type: String,
    description: "The iscwsn of the student",
  })
  @Expose()
  iscwsn: string;

  @ApiProperty({
    type: String,
    description: "The religion of the student",
  })
  @Expose()
  religion: string;

  @ApiProperty({
    type: String,
    description: "The single girl flag of the student",
  })
  @Expose()
  singleGirl: string;

  @ApiProperty({
    type: String,
    description: "The weight of the student",
  })
  @Expose()
  weight: string;

  @ApiProperty({
    type: String,
    description: "The height of the student",
  })
  @Expose()
  height: string;

  @ApiProperty({
    type: String,
    description: "The blood group of the student",
  })
  @Expose()
  bloodGroup: string;

  @ApiProperty({
    type: String,
    description: "The birthdate of the student",
  })
  @Expose()
  birthDate: string;

  @ApiProperty({
    type: String,
    description: "Homeless",
  })
  @Expose()
  homeless: string;

  @ApiProperty({
    type: String,
    description: "The bpl of the student",
  })
  @Expose()
  bpl: string;

  @ApiProperty({
    type: String,
    description: "The migrant of the student",
  })
  @Expose()
  migrant: string;

  @ApiProperty({
    type: String,
    description: "The school id of the student",
  })
  @Expose()
  schoolId: string;

  @ApiProperty({
    type: String,
    description: "The class id of the student",
  })
  @Expose()
  classId: string;

  @ApiProperty({
    type: String,
    description: "The status of the student",
  })
  @Expose()
  status: string;
  @ApiProperty({
    type: String,
    description: "The image of the student",
  })
  @Expose()
  image: string;
  @Expose()
  studentId: string;
  @ApiProperty({
    type: String,
    description: "Full name of student",
  })
  @Expose()
  fullName: string;

  @ApiProperty({
    type: String,
    description: "Father name of student",
  })
  @Expose()
  fatherName: string;

  @ApiProperty({
    type: String,
    description: "Admission number of student",
  })
  @Expose()
  admissionNo: Number;

  @ApiProperty({
    type: String,
    description: "The Current class id of the student",
  })
  @Expose()
  currentClassId: string;

  @ApiProperty({
    type: String,
    description: "The Address of the student",
  })
  @Expose()
  address: string;

  constructor(obj: StudentDto) {
    Object.assign(this, obj);
  }
}
=======
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Expose } from "class-transformer";

export class StudentDto {

    @ApiProperty()
    studentId: string;

    @ApiProperty()
    refId: string

    @ApiPropertyOptional()
    aadhaar: number

    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty()
    schoolId: string

    @ApiProperty()
    currentClassId: string

    @ApiProperty()
    gender: string

    @ApiPropertyOptional()
    socialCategory: string

    @ApiPropertyOptional()
    iscwsn: string

    @ApiPropertyOptional()
    religion: string

    @ApiPropertyOptional()
    singleGirl: boolean

    @ApiPropertyOptional()
    weight: string

    @ApiPropertyOptional()
    height: string

    @ApiPropertyOptional()
    bloodGroup: string

    @ApiProperty()
    birthDate: Date

    @ApiPropertyOptional()
    homeless: boolean

    @ApiProperty()
    bpl: boolean

    @ApiProperty()
    migrant: boolean

    @ApiProperty()
    status: string

    @ApiPropertyOptional()
    email: string

    @Expose()
    createdAt: string;
  
    @Expose()
    updatedAt: string;
  
    @Expose()
    createdBy: string;
  
    @Expose()
    updatedBy: string;
  
  }
>>>>>>> upstream/main
