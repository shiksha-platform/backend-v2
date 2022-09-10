import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { ConfigDto } from "src/configs/dto/config.dto";
import { first, map, Observable } from "rxjs";
import { SuccessResponse } from "src/success-response";
import jwt_decode from "jwt-decode";
import { UserDto } from "../../user/dto/user.dto";
import { IServicelocator } from "../configservicelocator";
export const SunbirdConfigToken = "SunbirdConfig";
@Injectable()
export class SunbirdConfigService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}config`;

  public async createConfig(request: any, configDto: ConfigDto) {
    let axios = require("axios");
    let data = {
      filters: {
        module: {
          eq: `${configDto.module}`,
        },
        key: {
          eq: `${configDto.key}`,
        },
      },
    };

    let config = {
      method: "post",
      url: `${this.url}/search`,

      data: data,
    };

    const response = await axios(config);
    let resData = response?.data;
    let result = await this.mappedResponse(resData);
    let configId = result.map(function (ConfigDto) {
      return ConfigDto.configId;
    });

    if (resData.length > 0) {
      var udateData = configDto;
      var updateConfig = {
        method: "put",
        url: `${this.url}/${configId}`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: udateData,
      };
      const response = await axios(updateConfig);
      return new SuccessResponse({
        statusCode: 200,
        message: " Ok.",
        data: response.data,
      });
    } else {
      var createData = configDto;
      var createConfig = {
        method: "post",
        url: `${this.url}`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: createData,
      };

      const response = await axios(createConfig);

      return new SuccessResponse({
        statusCode: 200,
        message: " Ok.",
        data: response.data,
      });
    }
  }

  public async getConfig(request: any) {
    let axios = require("axios");
    let data = {
      filters: {},
    };
    let globalConfig = {
      method: "post",
      url: `${this.url}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };

    const globalConfigData = await axios(globalConfig);
    let gobalConfigResult = await this.mappedResponse(
      globalConfigData?.data && globalConfigData.data
    );
    // get Logged In user data
    const authToken = request.headers.authorization;
    const decoded: any = jwt_decode(authToken);
    let email = decoded.email;
    let teacherData = {
      filters: {
        email: {
          eq: `${email}`,
        },
      },
    };
    let config = {
      method: "post",
      url: `${process.env.BASEAPIURL}/User/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: teacherData,
    };
    const response = await axios(config);

    let teacherProfileData = await this.userMappedResponse(
      response?.data && response.data
    );

    let schoolId = teacherProfileData.map(function (UserDto) {
      return UserDto.schoolId;
    });

    let teacherConfig = {
      filters: {
        contextId: {
          eq: `${schoolId}`,
        },
      },
    };

    let final = {
      method: "post",
      url: `${this.url}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: teacherConfig,
    };
    const confifResponse = await axios(final);

    let overridenResult = await this.mappedResponse(
      confifResponse?.data && confifResponse.data
    );
    var result = gobalConfigResult.filter((obj) => obj.contextId == "");

    for (let i = 0; i < result.length; i++) {
      let overridenData = overridenResult.filter(
        (obj) => obj.key == result[i].key && obj.module == result[i].module
      );
      if (overridenData.length > 0) {
        result[i] = overridenData[0];
      }
    }

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }

  public async createModuleConfigs(request: any, configAllData: [Object]) {
    configAllData.forEach((element) => {
      element["data"].forEach((data) => {
        data["module"] = element["module"];
        data["context"] = element["context"] ? element["context"] : "";
        data["contextId"] = element["contextId"] ? element["contextId"] : "";
        data["key"] = data["key"] ? data["key"] : "";
        data["value"] = data["value"] ? data["value"] : [];
        data["isPublic"] = data["isPublic"] ? data["isPublic"] : true;
        data["canOverride"] = data["canOverride"] ? data["canOverride"] : true;
        data["overrideBy"] = data["overrideBy"] ? data["overrideBy"] : "";

        this.createConfig(request, data);
      });
    });
  }

  public async mappedResponse(result: any) {
    const configResponse = result.map((item: any) => {
      const configMapping = {
        configId: item?.osid ? `${item.osid}` : "",
        module: item?.module ? `${item.module}` : "",
        key: item?.key ? `${item.key}` : "",
        value: item?.value,
        context: item?.context ? `${item.context}` : "",
        contextId: item?.contextId ? `${item.contextId}` : "",
        canOverride: item?.canOverride,
        overrideBy: item?.overrideBy ? `${item.overrideBy}` : "",
        isPublic: item?.isPublic,
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new ConfigDto(configMapping);
    });

    return configResponse;
  }

  public async userMappedResponse(result: any) {
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
