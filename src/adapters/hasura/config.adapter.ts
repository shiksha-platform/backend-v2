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

    const configSchema = new ConfigDto({});

    let dataObject = "";
    const newDataObj = Object.keys(SearchData).forEach((e) => {
      if (
        SearchData[e] &&
        SearchData[e] != "" &&
        Object.keys(configSchema).includes(e)
      ) {
        dataObject += `${e}:{_eq:"${SearchData[e]}"}`;
      }
    });

    var data = {
      query: `query SearchConfig {
            config(where:{ ${dataObject}}) {
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

    let resData = responseData.data.data.config.map(
      (item: any) => new ConfigDto(item)
    );
    if (resData.length > 0) {
      let newDataObject = "";

      const newData = Object.keys(configDto).forEach((e) => {
        if (
          configDto[e] &&
          configDto[e] != "" &&
          Object.keys(configSchema).includes(e)
        ) {
          if (!["value", "canOverride", "isPublic"].includes(e)) {
            newDataObject += `${e}: "${configDto[e]}", `;
          } else {
            newDataObject += `${e}: ${configDto[e]}, `;
          }
        }
      });

      var updateQuery = {
        query: `mutation UpdateConfig($configId:uuid) {
          update_config(where: {configId: {_eq: $configId}}, _set: {${newDataObject}}) {
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
      let newDataObject = "";
      const newData = Object.keys(configDto).forEach((e) => {
        if (
          configDto[e] &&
          configDto[e] != "" &&
          Object.keys(configSchema).includes(e)
        ) {
          if (!["value", "canOverride", "isPublic"].includes(e)) {
            newDataObject += `${e}: "${configDto[e]}", `;
          } else {
            newDataObject += `${e}: ${configDto[e]}, `;
          }
        }
      });

      var data = {
        query: `mutation CreateConfig {
        insert_config_one(object: {${newDataObject}}) {
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

    let gobalConfigResult =
      globalConfigData?.data.data?.config &&
      globalConfigData.data.data?.config.map(
        (item: any) => new ConfigDto(item)
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

    let teacherProfileData =
      response?.data && response.data.map((item: any) => new UserDto(item));

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

    let overridenResult =
      confifResponse?.data?.data?.config &&
      confifResponse?.data?.data?.config.map(
        (item: any) => new ConfigDto(item)
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
}
