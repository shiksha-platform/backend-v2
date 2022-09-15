import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { UserSearchDto } from "src/user/dto/user-search.dto";
import { UserDto } from "../../user/dto/user.dto";

import { IServicelocator } from "../userservicelocator";
export const EsamwadUserToken = "EsamwadUser";
@Injectable()
export class EsamwadUserService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/User`;

  public async getUserByAuth(request: any) {
    const response = [
      {
        userId: "85",
        refId1: "string",
        refId2: "string",
        refId3: "string",
        firstName: "Ashwin",
        middleName: "string",
        lastName: "Date",
        phoneNumber: "",
        email: "jona@gmail.com",
        aadhaar: "string",
        gender: "Male",
        socialCategory: "string",
        birthDate: "string",
        designation: "string",
        cadre: "string",
        profQualification: "string",
        joiningDate: "string",
        subjectIds: ["string"],
        bloodGroup: "string",
        maritalStatus: "string",
        compSkills: "string",
        disability: "string",
        religion: "string",
        homeDistance: "string",
        schoolId: "15547",
        address: "string",
        village: "string",
        block: "string",
        district: "string",
        stateId: "string",
        pincode: "",
        locationId: "string",
        retirementDate: "string",
        workingStatus: "string",
        image: "string",
        employmentType: "string",
        status: "string",
        deactivationReason: "string",
        reportsTo: "string",
        metaData: ["string"],
      },
    ];

    const teacherResponse = await this.mappedResponse(response);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: teacherResponse,
    });
  }
  getUser(id: any, request: any) {}
  createUser(request: any, teacherDto: UserDto) {}
  updateUser(id: string, request: any, teacherDto: UserDto) {}
  searchUser(request: any, teacherSearchDto: UserSearchDto) {}
  teacherSegment(schoolId: string, templateId: string, request: any) {}

  public async mappedResponse(result: any) {
    const userResponse = result.map((item: any) => {
      const userMapping = {
        userId: item?.userId ? `${item.userId}` : "",
        refId1: item?.refId1 ? `${item.refId1}` : "",
        refId2: item?.refId2 ? `${item.refId2}` : "",
        refId3: item?.refId3 ? `${item.refId3}` : "",

        firstName: item?.firstName ? `${item.firstName}` : "",
        middleName: item?.middleName ? `${item.middleName}` : "",
        lastName: item?.lastName ? `${item.lastName}` : "",
        phoneNumber: item?.phoneNumber ? item.phoneNumber : "",
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
        role: item?.role ? `${item.role}` : "",
        retirementDate: item?.retirementDate ? `${item.retirementDate}` : "",
        workingStatus: item?.workingStatus ? `${item.workingStatus}` : "",
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
