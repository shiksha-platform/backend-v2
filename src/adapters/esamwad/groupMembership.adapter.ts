import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
const resolvePath = require("object-resolve-path");
import { StudentDto } from "src/student/dto/student.dto";
import { TeacherDto } from "src/teacher/dto/teacher.dto";
import { GroupDto } from "src/group/dto/group.dto";
import { IServicelocator } from "../groupmembershipservicelocator";
import { EsamwadStudentDto } from "src/student/dto/esamwad-student.dto";
import { StudentGroupMembershipDto } from "src/group/dto/studentGroupMembership.dto";
import { EsamwadGroupDto } from "src/group/dto/esamwad.dto";
export const EsamwadGroupMembershipToken = "EsamwadGroupMembership";
@Injectable()
export class GroupMembershipEsamwadService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;
  public async findMembersOfGroup(id: string, role: string, request: any) {
    if (role == "Student") {
      var axios = require("axios");
      var data = {
        query: `query getgroupStudents($grade_number: Int!,$limit:Int!) {
          student(where: {grade_number: {_eq: $grade_number}}, limit:$limit) {
            id
            name
            is_bpl
            grade_number
            mother_name
            image
            is_cwsn
            school_id
            phone
            section
            ref_student_id
            admission_number
          }
        }`,
        variables: { grade_number: id, limit: 10 },
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

      let result = response.data.data.student.map(
        (item: any) => new StudentGroupMembershipDto(item)
      );

      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: result,
      });
    } else if (role == "Teacher") {
      let axios = require("axios");

      let final = {
        method: "get",
        url: `${this.baseURL}/Class/${id}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const response = await axios(final);
      let classObj = response?.data;
      let resData = [];
      if (classObj?.teacherId) {
        let classFinal = {
          method: "get",
          url: `${this.baseURL}/Teacher/${classObj.teacherId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };

        const responseData = await axios(classFinal);

        const teacherDetailDto = new TeacherDto(responseData.data);

        resData = [teacherDetailDto];
      }
      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: resData,
      });
    } else {
      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: { msg: "Unable to get data !!" },
      });
    }
  }

  public async findGroupsByUserId(id: string, role: string, request: any) {
    let responseData = [];

    if (role === "Teacher") {
      var axios = require("axios");
      var data = {
        query: `query classList($schoolId:Int!) {
          school_grade(where: {school_id: {_eq: $schoolId}}) {
            id
            grade_id
            grade {
              id
              number
              section
              stream_id
            }
            school_id
          }
        }`,
        variables: { schoolId: 15547 },
      };

      var config = {
        method: "post",
        url: "http://143.110.183.73:15003/v1/graphql",
        headers: {
          "x-hasura-admin-secret": "4GeEB2JCU5rBdLvQ4AbeqqrPGu7kk9SZDhJUZm7A",
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios(config);
      responseData = response.data.data.school_grade;
    } else if (role === "Student") {
      let axios = require("axios");
      const config = {
        method: "get",
        url: `${this.baseURL}/Student/${id}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const response = await axios(config);
      let studentObj = response?.data;

      if (studentObj?.currentClassId) {
        let studentFinal = {
          method: "get",
          url: `${this.baseURL}/Class/${studentObj.currentClassId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };
        const resData = await axios(studentFinal);

        responseData = resData?.data ? [resData.data] : [];
      }
    }

    let result = responseData.map((item: any) => new EsamwadGroupDto(item));
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
}
