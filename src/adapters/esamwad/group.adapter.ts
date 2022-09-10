import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocatorgroup } from "../groupservicelocator";
import { GroupDto } from "src/group/dto/group.dto";
import { StudentGroupMembershipDto } from "src/group/dto/studentGroupMembership.dto";
import { UserDto } from "src/user/dto/user.dto";
import { GroupSearchDto } from "src/group/dto/group-search.dto";
import { StudentDto } from "src/student/dto/student.dto";
export const EsamwadGroupToken = "EsamwadGroup";

@Injectable()
export class EsamwadGroupService implements IServicelocatorgroup {
  constructor(private httpService: HttpService) {}
  url = `${process.env.ESAMWADAPI}/v5/student`;
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;

  public async getGroup(groupId: any, request: any) {
    var axios = require("axios");
    var data = {
      query: `query getGroup($id: Int!) {
        grade(where: {id: {_eq: $id}}) {
          id
          section
          number
          stream_id
          school_grades{
            school_id
          }
        }
      }`,
      variables: { id: groupId },
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

    const responseData = response.data.data.grade;
    const groupResponse = await this.mappedResponse(responseData);

    return new SuccessResponse({
      statusCode: 200,
      message: "student found Successfully",
      data: groupResponse,
    });
  }

  public async findMembersOfGroup(id: string, role: string, request: any) {
    if (role == "Student") {
      var axios = require("axios");
      var data = {
        query: `query getgroupStudents($grade_number: Int!,$limit:Int!) {
          student(where: {grade_number: {_eq: $grade_number}}, limit:$limit) {
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

      const result = await this.studentMappedResponse(
        response.data.data.student
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
          url: `${this.baseURL}/User/${classObj.teacherId}`,
          headers: {
            Authorization: request.headers.authorization,
          },
        };

        const responseData = await axios(classFinal);

        resData = await this.mappedUserResponse([responseData.data]);
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
    var axios = require("axios");
    if (role === "Teacher") {
      var schoolData = {
        query: `query getSchoolId($id:Int!) {
                teacher(where: {id: {_eq: $id}}) {
                  school_id,
                  designation
                  joining_date
                  role
    
  }
}`,
        variables: { id: id },
      };

      var configData = {
        method: "post",
        url: this.baseURL,
        headers: {
          "x-hasura-admin-secret": this.adminSecret,
          "Content-Type": "application/json",
        },
        data: schoolData,
      };
      const res = await axios(configData);
      const schoolId = res.data.data.teacher[0].school_id;
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
        variables: { schoolId: schoolId },
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

    const groupResponse = await this.mappedResponse(responseData);

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: groupResponse,
    });
  }
  public async createGroup(request: any, groupDto: GroupDto) {}
  public async updateGroup(groupId: string, request: any, groupDto: GroupDto) {}
  public async searchGroup(request: any, groupSearchDto: GroupSearchDto) {}
  public async findMembersOfChildGroup(
    groupId: string,
    role: string,
    request: any
  ) {}

  public async mappedResponse(result: any) {
    const groupResponse = result.map((item: any) => {
      const groupMapping = {
        groupId: item?.id ? `${item.id}` : "",

        schoolId: item?.school_grades[0].school_id
          ? `${item.school_grades[0].school_id}`
          : "",
        name: item?.number ? `${item.number}` : "",
        type: item?.type ? `${item.type}` : "",

        section: item?.section ? `${item.section}` : "",
        status: item?.status ? `${item.status}` : "",
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        mediumOfInstruction: item?.mediumOfInstruction
          ? `${item.mediumOfInstruction}`
          : "",
        image: item?.image ? `${item.image}` : "",
        metaData: item?.metaData ? item.metaData : [],
        option: item?.option ? item.option : [],
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };

      return new GroupDto(groupMapping);
    });

    return groupResponse;
  }

  public async studentMappedResponse(result: any) {
    const studentResponse = result.map((obj: any) => {
      const studentMapping = {
        studentId: obj?.id ? `${obj.id}` : "",
        refId1: obj?.admission_number ? `${obj.admission_number}` : "",
        refId2: obj?.ref_student_id ? `${obj.ref_student_id}` : "",
        aadhaar: obj?.aadhaar ? `${obj.aadhaar}` : "",
        firstName: obj?.name ? `${obj.name}` : "",
        middleName: obj?.middleName ? `${obj.middleName}` : "",
        lastName: obj?.lastName ? `${obj.lastName}` : "",
        groupId: obj?.grade_number ? `${obj.grade_number}` : "",
        schoolId: obj?.school_id ? `${obj.school_id}` : "",
        studentEmail: obj?.studentEmail ? `${obj.studentEmail}` : "",
        studentPhoneNumber: obj?.phone ? obj.phone : "",
        iscwsn: obj?.is_cwsn ? `${obj.is_cwsn}` : "",
        gender: obj?.gender ? `${obj.gender}` : "",
        socialCategory: obj?.socialCategory ? `${obj.socialCategory}` : "",
        religion: obj?.religion ? `${obj.religion}` : "",
        singleGirl: obj?.singleGirl ? obj.singleGirl : "",
        weight: obj?.weight ? `${obj.weight}` : "",
        height: obj?.height ? `${obj.height}` : "",
        bloodGroup: obj?.bloodGroup ? `${obj.bloodGroup}` : "",
        birthDate: obj?.dob ? `${obj.dob}` : "",
        homeless: obj?.homeless ? obj.homeless : "",
        bpl: obj?.is_bpl ? obj.is_bpl : "",
        migrant: obj?.is_migrant ? obj.is_migrant : "",
        status: obj?.status ? `${obj.status}` : "",

        fatherFirstName: obj?.fatherFirstName ? `${obj.fatherFirstName}` : "",

        fatherMiddleName: obj?.fatherMiddleName
          ? `${obj.fatherMiddleName}`
          : "",

        fatherLastName: obj?.father_name ? `${obj.father_name}` : "",
        fatherPhoneNumber: obj?.fatherPhoneNumber ? obj.fatherPhoneNumber : "",
        fatherEmail: obj?.fatherEmail ? `${obj.fatherEmail}` : "",

        motherFirstName: obj?.mother_name ? `${obj.mother_name}` : "",
        motherMiddleName: obj?.motherMiddleName
          ? `${obj.motherMiddleName}`
          : "",
        motherLastName: obj?.motherLastName ? `${obj.motherLastName}` : "",
        motherPhoneNumber: obj?.motherPhoneNumber ? obj.motherPhoneNumber : "",
        motherEmail: obj?.motherEmail ? `${obj.motherEmail}` : "",

        guardianFirstName: obj?.guardianFirstName
          ? `${obj.guardianFirstName}`
          : "",
        guardianMiddleName: obj?.guardianMiddleName
          ? `${obj.guardianMiddleName}`
          : "",
        guardianLastName: obj?.guardianLastName
          ? `${obj.guardianLastName}`
          : "",
        guardianPhoneNumber: obj?.guardianPhoneNumber
          ? obj.guardianPhoneNumber
          : "",
        guardianEmail: obj?.guardianEmail ? `${obj.guardianEmail}` : "",
        image: obj?.image ? `${obj.image}` : "",
        deactivationReason: obj?.deactivationReason
          ? `${obj.deactivationReason}`
          : "",
        studentAddress: obj?.studentAddress ? `${obj.studentAddress}` : "",
        village: obj?.village ? `${obj.village}` : "",
        block: obj?.block ? `${obj.block}` : "",
        district: obj?.district ? `${obj.district}` : "",
        stateId: obj?.stateId ? `${obj.stateId}` : "",
        pincode: obj?.pincode ? obj.pincode : "",
        locationId: obj?.locationId ? `${obj.locationId}` : "",
        metaData: obj?.metaData ? obj.metaData : [],
        createdAt: obj?.created ? `${obj.created}` : "",
        updatedAt: obj?.updated ? `${obj.updated}` : "",
        createdBy: obj?.osCreatedBy ? `${obj.osCreatedBy}` : "",
        updatedBy: obj?.osUpdatedBy ? `${obj.osUpdatedBy}` : "",
      };

      return new StudentDto(studentMapping);
    });

    return studentResponse;
  }

  public async mappedUserResponse(result: any) {
    const userResponse = result.map((item: any) => {
      const userMapping = {
        userId: item?.osid ? `${item.osid}` : "",
        refId1: item?.refId1 ? `${item.refId1}` : "",
        refId2: item?.refId2 ? `${item.refId2}` : "",
        refId3: item?.refId3 ? `${item.refId3}` : "",
        firstName: item?.firstName ? `${item.firstName}` : "",
        middleName: item?.middleName ? `${item.middleName}` : "",
        lastName: item?.lastName ? `${item.lastName}` : "",
        phoneNumber: item?.phoneNumber ? `${item.phoneNumber}` : "",
        email: item?.email ? `${item.email}` : "",
        aadhaar: item?.aadhaar ? `${item.aadhaar}` : "",
        gender: item?.gender ? `${item.gender}` : "",
        socialCategory: item?.socialCategory ? `${item.socialCategory}` : "",
        birthDate: item?.birthDate ? `${item.birthDate}` : "",
        designation: item?.designation ? `${item.designation}` : "",
        cadre: item?.cadre ? `${item.cadre}` : "",
        profQualification: item?.profQualification
          ? `${item.profQualification}`
          : "",
        joiningDate: item?.joiningDate ? `${item.joiningDate}` : "",
        subjectIds: item.subjectIds ? item.subjectIds : [],
        bloodGroup: item?.bloodGroup ? `${item.bloodGroup}` : "",
        maritalStatus: item?.maritalStatus ? `${item.maritalStatus}` : "",
        compSkills: item?.compSkills ? `${item.compSkills}` : "",
        disability: item?.disability ? `${item.disability}` : "",
        religion: item?.religion ? `${item.religion}` : "",
        homeDistance: item?.homeDistance ? `${item.homeDistance}` : "",
        employmentType: item?.employmentType ? `${item.employmentType}` : "",
        schoolId: item?.schoolId ? `${item.schoolId}` : "",
        address: item?.address ? `${item.address}` : "",
        village: item?.village ? `${item.village}` : "",
        block: item?.block ? `${item.block}` : "",
        district: item?.district ? `${item.district}` : "",
        stateId: item?.stateId ? `${item.stateId}` : "",
        pincode: item?.pincode ? item.pincode : "",
        locationId: item?.locationId ? `${item.locationId}` : "",
        image: item?.image ? `${item.image}` : "",
        status: item?.status ? `${item.status}` : "",
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        reportsTo: item?.reportsTo ? `${item.reportsTo}` : "",
        retirementDate: item?.retirementDate ? `${item.retirementDate}` : "",
        workingStatus: item?.workingStatus ? `${item.workingStatus}` : "",
        fcmToken: item?.fcmToken ? `${item.fcmToken}` : "",
        role: item?.role ? `${item.role}` : "",
        employeeCode: item?.employeeCode ? `${item.employeeCode}` : "",
        metaData: item?.metaData ? item.metaData : [],
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new UserDto(userMapping);
    });

    return userResponse;
  }
}
