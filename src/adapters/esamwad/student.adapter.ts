import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../studentservicelocator";
import { StudentSearchDto } from "src/student/dto/student-search.dto";
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

    const responsedata = response.data.data.student;
    const studentResponse = await this.mappedResponse(responsedata);

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: studentResponse,
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

    const responsedata = response.data.data.student;
    const studentResponse = await this.mappedResponse(responsedata);
    return new SuccessResponse({
      statusCode: 200,
      message: "student found Successfully",
      data: studentResponse[0],
    });
  }

  createStudent(request: any, studentDto: StudentDto) {}
  updateStudent(id: string, request: any, studentDto: StudentDto) {}

  public async mappedResponse(result: any) {
    const studentResponse = result.map((item: any) => {
      const studentMapping = {
        studentId: item?.id ? `${item.id}` : "",
        refId1: item?.admission_number ? `${item.admission_number}` : "",
        refId2: item?.ref_student_id ? `${item.ref_student_id}` : "",
        aadhaar: item?.aadhaar ? `${item.aadhaar}` : "",
        firstName: item?.name ? `${item.name}` : "",
        middleName: item?.middleName ? `${item.middleName}` : "",
        lastName: item?.lastName ? `${item.lastName}` : "",
        groupId: item?.grade_number ? `${item.grade_number}` : "",
        schoolId: item?.school_id ? `${item.school_id}` : "",
        studentEmail: item?.studentEmail ? `${item.studentEmail}` : "",
        studentPhoneNumber: item?.phone ? item.phone : "",
        iscwsn: item?.is_cwsn ? `${item.is_cwsn}` : "",
        gender: item?.gender ? `${item.gender}` : "",
        socialCategory: item?.socialCategory ? `${item.socialCategory}` : "",
        religion: item?.religion ? `${item.religion}` : "",
        singleGirl: item?.singleGirl ? item.singleGirl : "",
        weight: item?.weight ? `${item.weight}` : "",
        height: item?.height ? `${item.height}` : "",
        bloodGroup: item?.bloodGroup ? `${item.bloodGroup}` : "",
        birthDate: item?.dob ? `${item.dob}` : "",
        homeless: item?.homeless ? item.homeless : "",
        bpl: item?.is_bpl ? item.is_bpl : "",
        migrant: item?.is_migrant ? item.is_migrant : "",
        status: item?.status ? `${item.status}` : "",

        fatherFirstName: item?.fatherFirstName ? `${item.fatherFirstName}` : "",

        fatherMiddleName: item?.fatherMiddleName
          ? `${item.fatherMiddleName}`
          : "",

        fatherLastName: item?.father_name ? `${item.father_name}` : "",
        fatherPhoneNumber: item?.fatherPhoneNumber
          ? item.fatherPhoneNumber
          : "",
        fatherEmail: item?.fatherEmail ? `${item.fatherEmail}` : "",

        motherFirstName: item?.mother_name ? `${item.mother_name}` : "",
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
        createdAt: item?.created ? `${item.created}` : "",
        updatedAt: item?.updated ? `${item.updated}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new StudentDto(studentMapping);
    });

    return studentResponse;
  }
}
