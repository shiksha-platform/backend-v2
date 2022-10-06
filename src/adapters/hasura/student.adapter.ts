import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../studentservicelocator";
import { StudentDto } from "src/student/dto/student.dto";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
import { ErrorResponse } from "src/error-response";

@Injectable()
export class HasuraStudentService implements IServicelocator {
  constructor(private httpService: HttpService) {}

  public async getStudent(studentId: string, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetStudent($studentId:uuid!) {
        student_by_pk(studentId: $studentId) {
            aadhaar
            birthDate
            block
            bloodGroup
            bpl
            created_at
            deactivationReason
            district
            fatherEmail
            fatherFirstName
            fatherLastName
            fatherMiddleName
            fatherPhoneNumber
            firstName
            gender
            groupId
            guardianEmail
            guardianFirstName
            guardianLastName
            guardianMiddleName
            guardianPhoneNumber
            height
            homeless
            image
            iscwsn
            lastName
            locationId
            metaData
            middleName
            migrant
            motherEmail
            motherFirstName
            motherLastName
            motherMiddleName
            motherPhoneNumber
            pincode
            refId1
            refId2
            religion
            schoolId
            singleGirl
            socialCategory
            stateId
            status
            studentAddress
            studentEmail
            studentId
            studentPhoneNumber
            updated_at
            village
            weight
        }
      }
      `,
      variables: { studentId: studentId },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    if (response?.data?.errors) {
      return new ErrorResponse({
        errorCode: response.data.errors[0].extensions,
        errorMessage: response.data.errors[0].message,
      });
    } else {
      let result = [response.data.data.student_by_pk];
      const studentData = await this.mappedResponse(result);
      return new SuccessResponse({
        statusCode: response.status,
        message: "Ok.",
        data: studentData[0],
      });
    }
  }

  public async createStudent(request: any, studentDto: StudentDto) {
    var axios = require("axios");

    const studentSchema = new StudentDto(studentDto);
    let query = "";
    Object.keys(studentDto).forEach((e) => {
      if (
        studentDto[e] &&
        studentDto[e] != "" &&
        Object.keys(studentSchema).includes(e)
      ) {
        if (Array.isArray(studentDto[e])) {
          query += `${e}: ${JSON.stringify(studentDto[e])}, `;
        } else {
          query += `${e}: ${JSON.stringify(studentDto[e])}, `;
        }
      }
    });

    var data = {
      query: `mutation CreateStudent {
        insert_student_one(object: {${query}}) {
         studentId
        }
      }
      `,
      variables: {},
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    if (response?.data?.errors) {
      return new ErrorResponse({
        errorCode: response.data.errors[0].extensions,
        errorMessage: response.data.errors[0].message,
      });
    } else {
      const result = response.data.data.insert_student_one;
      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result,
      });
    }
  }

  public async updateStudent(
    studentId: string,
    request: any,
    studentDto: StudentDto
  ) {
    var axios = require("axios");

    const studentSchema = new StudentDto(studentDto);
    let query = "";
    Object.keys(studentDto).forEach((e) => {
      if (
        studentDto[e] &&
        studentDto[e] != "" &&
        Object.keys(studentSchema).includes(e)
      ) {
        if (Array.isArray(studentDto[e])) {
          query += `${e}: ${JSON.stringify(studentDto[e])}, `;
        } else {
          query += `${e}: ${JSON.stringify(studentDto[e])}, `;
        }
      }
    });

    var data = {
      query: `mutation UpdateStudent($studentId:uuid) {
          update_student(where: {studentId: {_eq: $studentId}}, _set: {${query}}) {
          affected_rows
        }}`,
      variables: {
        studentId: studentId,
      },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    const result = response.data.data;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async searchStudent(request: any, studentSearchDto: StudentSearchDto) {
    var axios = require("axios");

    let offset = 0;
    if (studentSearchDto.page > 1) {
      offset = parseInt(studentSearchDto.limit) * (studentSearchDto.page - 1);
    }

    let filters = studentSearchDto.filters;

    Object.keys(studentSearchDto.filters).forEach((item) => {
      Object.keys(studentSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    var data = {
      query: `query SearchStudent($filters:student_bool_exp,$limit:Int, $offset:Int) {
        student_aggregate {
          aggregate {
            count
          }
        }
          student(where:$filters, limit: $limit, offset: $offset,) {
            aadhaar
            birthDate
            block
            bloodGroup
            bpl
            created_at
            deactivationReason
            district
            fatherEmail
            fatherFirstName
            fatherLastName
            fatherMiddleName
            fatherPhoneNumber
            firstName
            gender
            groupId
            guardianEmail
            guardianFirstName
            guardianLastName
            guardianMiddleName
            guardianPhoneNumber
            height
            homeless
            image
            iscwsn
            lastName
            locationId
            metaData
            middleName
            migrant
            motherEmail
            motherFirstName
            motherLastName
            motherMiddleName
            motherPhoneNumber
            pincode
            refId1
            refId2
            religion
            schoolId
            singleGirl
            socialCategory
            stateId
            status
            studentAddress
            studentEmail
            studentId
            studentPhoneNumber
            updated_at
            village
            weight
            }
          }`,
      variables: {
        limit: parseInt(studentSearchDto.limit),
        offset: offset,
        filters: studentSearchDto.filters,
      },
    };
    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);

    let result = response.data.data.student;
    const studentData = await this.mappedResponse(result);
    const count = response?.data?.data?.student_aggregate?.aggregate?.count;
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      totalCount: count,
      data: studentData,
    });
  }

  public async mappedResponse(result: any) {
    const studentResponse = result.map((item: any) => {
      const studentMapping = {
        studentId: item?.osid ? `${item.osid}` : "",
        refId1: item?.admissionNo ? `${item.admissionNo}` : "",
        refId2: item?.refId2 ? `${item.refId2}` : "",
        aadhaar: item?.aadhaar ? `${item.aadhaar}` : "",
        firstName: item?.firstName ? `${item.firstName}` : "",
        middleName: item?.middleName ? `${item.middleName}` : "",
        lastName: item?.lastName ? `${item.lastName}` : "",
        groupId: item?.groupId ? `${item.groupId}` : "",
        schoolId: item?.schoolId ? `${item.schoolId}` : "",
        studentEmail: item?.studentEmail ? `${item.studentEmail}` : "",
        studentPhoneNumber: item?.studentPhoneNumber
          ? item.studentPhoneNumber
          : "",
        iscwsn: item?.iscwsn ? `${item.iscwsn}` : "",
        gender: item?.gender ? `${item.gender}` : "",
        socialCategory: item?.socialCategory ? `${item.socialCategory}` : "",
        religion: item?.religion ? `${item.religion}` : "",
        singleGirl: item?.singleGirl ? item.singleGirl : "",
        weight: item?.weight ? `${item.weight}` : "",
        height: item?.height ? `${item.height}` : "",
        bloodGroup: item?.bloodGroup ? `${item.bloodGroup}` : "",
        birthDate: item?.birthDate ? `${item.birthDate}` : "",
        homeless: item?.homeless ? item.homeless : "",
        bpl: item?.bpl ? item.bpl : "",
        migrant: item?.migrant ? item.migrant : "",
        status: item?.status ? `${item.status}` : "",

        fatherFirstName: item?.fatherFirstName ? `${item.fatherFirstName}` : "",

        fatherMiddleName: item?.fatherMiddleName
          ? `${item.fatherMiddleName}`
          : "",

        fatherLastName: item?.fatherLastName ? `${item.fatherLastName}` : "",
        fatherPhoneNumber: item?.fatherPhoneNumber
          ? item.fatherPhoneNumber
          : "",
        fatherEmail: item?.fatherEmail ? `${item.fatherEmail}` : "",

        motherFirstName: item?.motherFirstName ? `${item.motherFirstName}` : "",
        motherMiddleName: item?.motherMiddleName
          ? `${item.motherMiddleName}`
          : "",
        motherLastName: item?.motherLastName ? `${item.motherLastName}` : "",
        motherPhoneNumber: item?.motherPhoneNumber
          ? item.motherPhoneNumber
          : "",
        motherEmail: item?.motherEmail ? `${item.motherEmail}` : "",

        guardianFirstName: item?.guardianFirstName
          ? `${item.guardianFirstName}`
          : "",
        guardianMiddleName: item?.guardianMiddleName
          ? `${item.guardianMiddleName}`
          : "",
        guardianLastName: item?.guardianLastName
          ? `${item.guardianLastName}`
          : "",
        guardianPhoneNumber: item?.guardianPhoneNumber
          ? item.guardianPhoneNumber
          : "",
        guardianEmail: item?.guardianEmail ? `${item.guardianEmail}` : "",
        image: item?.image ? `${item.image}` : "",
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        studentAddress: item?.studentAddress ? `${item.studentAddress}` : "",
        village: item?.village ? `${item.village}` : "",
        block: item?.block ? `${item.block}` : "",
        district: item?.district ? `${item.district}` : "",
        stateId: item?.stateId ? `${item.stateId}` : "",
        pincode: item?.pincode ? item.pincode : "",
        locationId: item?.locationId ? `${item.locationId}` : "",
        metaData: item?.metaData ? item.metaData : [],
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
      };
      return new StudentDto(studentMapping);
    });

    return studentResponse;
  }
}
