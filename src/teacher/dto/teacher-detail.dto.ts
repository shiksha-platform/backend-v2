import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";

export class TeacherDetailDto {
  @Expose()
  teacherId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  gender: string;

  @Expose()
  dob: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  contactNumber: string;

  @Expose()
  address: string;

  @Expose()
  socialCategory: string;

  @Expose()
  birthDate: string;

  @Expose()
  designation: string;

  @Expose()
  cadre: string;

  @Expose()
  profQualification: string;

  @Expose()
  joiningDate: string;

  @Expose()
  subjectId: string;

  @Expose()
  bloodGroup: string;

  @Expose()
  maritalStatus: string;

  @Expose()
  blockI: string;

  @Expose()
  compSkills: string;

  @Expose()
  disability: string;

  @Expose()
  religion: string;

  @Expose()
  homeDistance: string;

  @Expose()
  roles: string;

  @Expose()
  schoolId: string;

  @Expose()
  acrId: string;

  @Expose()
  retirementDate: string;

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

  constructor(partial: TeacherDetailDto) {
    Object.assign(this, partial);
  }
}
