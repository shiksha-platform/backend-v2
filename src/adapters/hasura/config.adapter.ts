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
import { stringify } from "querystring";
export const HasuraConfigToken = "HasuraConfig";
@Injectable()
export class HasuraConfigService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}config`;

  public async createConfig(request: any, configDto: ConfigDto) {
    let axios = require("axios");

    let value = JSON.stringify(configDto.value);

    configDto = { ...configDto, value };

    let SearchData = {
      module: `${configDto.module}`,
      key: `${configDto.key}`,
    };

    const configSchema = new ConfigDto(configDto);

    let query = "";
    Object.keys(SearchData).forEach((e) => {
      if (
        SearchData[e] &&
        SearchData[e] != "" &&
        Object.keys(configSchema).includes(e)
      ) {
        query += `${e}:{_eq:"${SearchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchConfig {
            config(where:{ ${query}}) {
              configId
            }
          }`,
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

    const responseData = await axios(config);

    let resData = responseData.data.data.config;
    if (resData.length > 0) {
      let query = "";

      Object.keys(configDto).forEach((e) => {
        if (
          configDto[e] &&
          configDto[e] != "" &&
          Object.keys(configSchema).includes(e)
        ) {
          if (!["value", "canOverride", "isPublic"].includes(e)) {
            query += `${e}: "${configDto[e]}", `;
          } else {
            query += `${e}: ${configDto[e]}, `;
          }
        }
      });

      var updateQuery = {
        query: `mutation UpdateConfig($configId:uuid) {
          update_config(where: {configId: {_eq: $configId}}, _set: {${query}}) {
          affected_rows
        }
}`,
        variables: {
          configId: resData[0].configId,
        },
      };

      var update = {
        method: "post",
        url: process.env.REGISTRYHASURA,
        headers: {
          "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
          "Content-Type": "application/json",
        },
        data: updateQuery,
      };

      const response = await axios(update);
      const result = response.data.data;

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result,
      });
    } else {
      let query = "";
      Object.keys(configDto).forEach((e) => {
        if (
          configDto[e] &&
          configDto[e] != "" &&
          Object.keys(configSchema).includes(e)
        ) {
          if (!["value", "canOverride", "isPublic"].includes(e)) {
            query += `${e}: "${configDto[e]}", `;
          } else {
            query += `${e}: ${configDto[e]}, `;
          }
        }
      });

      var data = {
        query: `mutation CreateConfig {
        insert_config_one(object: {${query}}) {
         configId
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
      const result = response.data.data.insert_config_one;

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result,
      });
    }
  }

  public async getConfig(request: any) {
    let axios = require("axios");

    var data = {
      query: `query GetConfig {
          config {
            canOverride
            configId
            context
            contextId
            created_at
            isPublic
            key
            module
            overrideBy
            updated_at
            value
          }
        }
        `,
      variables: {},
    };

    var globalConfig = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const globalConfigData = await axios(globalConfig);

    let gobalConfigResult = await this.mappedResponse(
      globalConfigData?.data.data?.config && globalConfigData.data.data?.config
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

    var teacherConfig = {
      query: `query GetConfig($contextId:String) {
            config(where: {contextId: {_eq: $contextId}}) {
              canOverride
              configId
              context
              contextId
              created_at
              isPublic
              key
              module
              overrideBy
              updated_at
              value
            }
          }
          `,
      variables: {
        contextId: schoolId[0],
      },
    };

    var final = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: teacherConfig,
    };
    const confifResponse = await axios(final);

    let overridenResult = await this.mappedResponse(
      confifResponse?.data?.data?.config && confifResponse?.data?.data?.config
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
      element["data"].forEach(async (data) => {
        data["module"] = element["module"];
        data["context"] = element["context"] ? element["context"] : "";
        data["contextId"] = element["contextId"] ? element["contextId"] : "";
        data["key"] = data["key"] ? data["key"] : "";
        data["value"] = data["value"] ? data["value"] : [];
        data["isPublic"] = data["isPublic"] ? data["isPublic"] : true;
        data["canOverride"] = data["canOverride"] ? data["canOverride"] : true;
        data["overrideBy"] = data["overrideBy"] ? data["overrideBy"] : "";
        let configDto = data;
        this.createConfig(request, configDto);
      });
    });
  }

  public async mappedResponse(result: any) {
    const configResponse = result.map((item: any) => {
      const configMapping = {
        configId: item?.configId ? `${item.configId}` : "",
        module: item?.module ? `${item.module}` : "",
        key: item?.key ? `${item.key}` : "",
        value: item?.value,
        context: item?.context ? `${item.context}` : "",
        contextId: item?.contextId ? `${item.contextId}` : "",
        canOverride: item?.canOverride,
        overrideBy: item?.overrideBy ? `${item.overrideBy}` : "",
        isPublic: item?.isPublic,
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
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
