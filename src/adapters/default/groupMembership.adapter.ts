import { Injectable, HttpException } from "@nestjs/common";
import { catchError } from "rxjs/operators";
import { ErrorResponse } from "src/error-response";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { first, map, Observable } from "rxjs";
import { response } from "express";
import { SuccessResponse } from "src/success-response";
import { GroupMembershipDto } from "src/groupMembership/dto/groupMembership.dto";
import { GroupMembershipSearchDto } from "src/groupMembership/dto/groupMembership-search.dto";
const resolvePath = require("object-resolve-path");
import { StudentDto } from "src/student/dto/student.dto";
import axios from "axios";
import { TeacherDto } from "src/teacher/dto/teacher.dto";
import { GroupDto } from "src/group/dto/group.dto";
@Injectable()
export class GroupMembershipService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}`;

  public async findMembersOfGroup(id: string, role: string, request: any) {
    if (role == "Student") {
      const template = {
        studentId: "osid",
        refId1: "refId1",
        refId2: "refId2",
        aadhaar: "aadhaar",
        firstName: "firstName",
        lastName: "lastName",
        schoolId: "schoolId",
        groupId: "groupId",
        iscwsn: "iscwsn",
        gender: "gender",
        socialCategory: "socialCategory",
        religion: "religion",
        singleGirl: "singleGirl",
        weight: "weight",
        height: "height",
        bloodGroup: "bloodGroup",
        birthDate: "birthDate",
        homeless: "homeless",
        bpl: "bpl",
        migrant: "migrant",
        status: "status",
        email: "email",
        fatherName: "fatherName",
        motherName: "motherName",
        guardianName: "guardianName",
        fatherPhoneNumber: "fatherPhoneNumber",
        motherPhoneNumber: "motherPhoneNumber",
        guardianPhoneNumber: "guardianPhoneNumber",
        image: "image",
        createdAt: "osCreatedAt",
        updatedAt: "osUpdatedAt",
        createdBy: "osCreatedBy",
        updatedBy: "osUpdatedBy",
      };
      let axios = require("axios");
      let data = {
        filters: {
          currentClassId: {
            eq: `${id}`,
          },
        },
      };

      let config = {
        method: "post",
        url: `${this.url}/Student/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const response = await axios(config);
      let responseData = response.data;
      let result = responseData.map((item: any) => {
        const studentDetailDto = new StudentDto(template);
        Object.keys(template).forEach((key) => {
          studentDetailDto[key] = resolvePath(item, template[key]);
        });
        return studentDetailDto;
      });

      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: result,
      });
    } else if (role == "Teacher") {
      const temp = {
        teacherId: "osid",
        firstName: "firstName",
        lastName: "lastName",
        contactNumber: "contactNumber",
        email: "email",
        gender: "gender",
        socialCategory: "socialCategory",
        birthDate: "birthDate",
        designation: "designation",
        cadre: "cadre",
        profQualification: "profQualification",
        joiningDate: "joiningDate",
        subjectIds: "subjectIds",
        bloodGroup: "bloodGroup",
        maritalStatus: "maritalStatus",
        blockId: "blockId",
        address: "address",
        compSkills: "compSkills",
        disability: "disability",
        religion: "religion",
        homeDistance: "homeDistance",
        employmentType: "employmentType",
        schoolId: "schoolId",
        image: "image",
        status: "status",
        retirementDate: "retirementDate",
        workingStatus: "workingStatus",
        createdAt: "osCreatedAt",
        updatedAt: "osUpdatedAt",
        createdBy: "osCreatedBy",
        updatedBy: "osUpdatedBy",
      };
      let axios = require("axios");

      let final = {
        method: "get",
        url: `${this.url}/Class/${id}`,
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
          url: `${this.url}/Teacher/${classObj.teacherId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };

        const responseData = await axios(classFinal);

        const teacherDetailDto = new TeacherDto(temp);
        Object.keys(temp).forEach((key) => {
          teacherDetailDto[key] = resolvePath(responseData.data, temp[key]);
        });
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
    const temp = {
      groupId: "osid",
      schoolId: "schoolId",
      name: "className",
      type: "type",
      status: "status",
      mediumOfInstruction: "mediumOfInstruction",
      image: "image",
      createdAt: "osCreatedAt",
      updatedAt: "osUpdatedAt",
      createdBy: "osCreatedBy",
      updatedBy: "osUpdatedBy",
    };
    let responseData = [];

    if (role === "Teacher") {
      let axios = require("axios");
      let data = {
        filters: {
          teacherId: {
            eq: `${id}`,
          },
        },
      };

      let final = {
        method: "post",
        url: `${this.url}/Class/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const response = await axios(final);
      responseData = response.data;
    } else if (role === "Student") {
      let axios = require("axios");
      const config = {
        method: "get",
        url: `${this.url}/Student/${id}`,
        headers: {
          Authorization: request.headers.authorization,
        },
      };

      const response = await axios(config);
      let studentObj = response?.data;

      if (studentObj?.currentClassId) {
        let studentFinal = {
          method: "get",
          url: `${this.url}/Class/${studentObj.currentClassId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };
        const resData = await axios(studentFinal);
        responseData = resData?.data ? [resData.data] : [];
      }
    }
    let result = responseData.map((item: any) => {
      const studentDetailDto = new GroupDto(temp);
      Object.keys(temp).forEach((key) => {
        studentDetailDto[key] = resolvePath(item, temp[key]);
      });
      return studentDetailDto;
    });

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }
}
