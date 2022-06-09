import { HttpService } from "@nestjs/axios";
import { Injectable, HttpException } from "@nestjs/common";
const resolvePath = require("object-resolve-path");
import { AxiosResponse } from "axios";
import { ConfigDto } from "src/configs/dto/config.dto";
import { first, map, Observable } from "rxjs";
import { SuccessResponse } from "src/success-response";
import jwt_decode from "jwt-decode";
import { TeacherDto } from "../../teacher/dto/teacher.dto";
@Injectable()
export class ConfigService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}Config`;

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
    let result = resData.map((item: any) => new ConfigDto(item));

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
      console.log(createConfig);
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
    let gobalConfigResult =
      globalConfigData?.data &&
      globalConfigData.data.map((item: any) => new ConfigDto(item));

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
      url: `${process.env.BASEAPIURL}/Teacher/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: teacherData,
    };
    const response = await axios(config);

    let teacherProfileData =
      response?.data && response.data.map((item: any) => new TeacherDto(item));

    let schoolId = teacherProfileData.map(function (TeacherDto) {
      return TeacherDto.schoolId;
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
    let overridenResult =
      confifResponse?.data &&
      confifResponse.data.map((item: any) => new ConfigDto(item));

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
}