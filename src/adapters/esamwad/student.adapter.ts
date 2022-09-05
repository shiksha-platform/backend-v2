import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { EsamwadStudentDto } from "src/student/dto/esamwad-student.dto";
import { AxiosResponse } from "axios";
import { map, catchError } from "rxjs";
import { ErrorResponse } from "src/error-response";
import { IServicelocator } from "../studentservicelocator";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
import { StudentGroupMembershipDto } from "src/group/dto/studentGroupMembership.dto";
import { StudentDto } from "src/student/dto/student.dto";
export const EsamwadStudentToken = "EsamwadStudent";
@Injectable()
export class EsamwadStudentService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.ESAMWADAPI}/v5/student`;
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;
  public async searchStudent(request: any, studentSearchDto: StudentSearchDto) {
    var axios = require("axios");
    var data = {
      query: `query getStudent {
        student(where: {}, limit: 10) {
        id
        name
        father_name,
        mother_name
        phone
        roll
        school_id
        section
        medium
        is_bpl
        is_cwsn
        is_migrant
        admission_number
        image
        updated
        stream_tag
        religion
        grade_number
        gender
        enrollment_type
        created
        dob
      }
    }`,
      variables: {},
    };

    var config = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);

    const responsedata = response.data.data.student.map(
      (item: any) => new StudentGroupMembershipDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
  }

  public async getStudent(studentId: any, request: any) {
    var axios = require("axios");
    var data = {
      query: `query getStudent($student_id:Int!) {
      student(where: {id: {_eq: $student_id}}) {
        id
        name
        father_name,
        mother_name
        phone
        roll
        school_id
        section
        medium
        is_bpl
        is_cwsn
        is_migrant
        admission_number
        image
        updated
        stream_tag
        religion
        grade_number
        gender
        enrollment_type
        created
        dob
      }
    }`,
      variables: { student_id: studentId },
    };

    var config = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);

    const responsedata = response.data.data.student.map(
      (item: any) => new StudentGroupMembershipDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "student found Successfully",
      data: responsedata[0],
    });
  }

  createStudent(request: any, studentDto: StudentDto) {}
  updateStudent(id: string, request: any, studentDto: StudentDto) {}
}
