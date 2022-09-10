import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { AssessmentsetDto } from "src/assessmentset/dto/assessmentset.dto";
@Injectable()
export class AssessmentsetService {
  constructor(private httpService: HttpService) {}
  assessmentsetURL = `${process.env.BASEAPIURL}/Assessmentset`;

  public async createAssessmentSet(
    request: any,
    assessmentsetDto: AssessmentsetDto
  ) {
    var axios = require("axios");
    try {
      var data = {
        query: `mutation CreateAssessmentset($gradeType:String,$options:String,$title:String,$type:String,$typeDetails:String) {
  insert_assessmentset_one(object: {gradeType: $gradeType, options: $options, title: $title, type: $type, typeDetails: $typeDetails}) {
    assessmentsetId
  }
}`,
        variables: {
          gradeType: assessmentsetDto.gradeType,
          options: assessmentsetDto.options,
          title: assessmentsetDto.title,
          type: assessmentsetDto.type,
          typeDetails: assessmentsetDto.typeDetails,
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

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: response.data,
      });
    } catch (e) {
      return `${e}`;
    }
  }
  public async getAssessmentset(assessmentsetId: any, request: any) {
    var axios = require("axios");
    try {
      var data = {
        query: `query GetAssessmentset($assessmentsetId:uuid) {
      assessmentset(where: {assessmentsetId: {_eq: $assessmentsetId}}) {
        assessmentsetId
        gradeType
        title
        options
        type
        typeDetails
        created_at
        updated_at
      }
    }`,
        variables: { assessmentsetId: assessmentsetId },
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

      const result = await this.mappedResponse(
        response.data.data.assessmentset
      );

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result[0],
      });
    } catch (e) {
      return `${e}`;
    }
  }

  public async searchAssessmentset(
    limit: string,
    assessmentsetId: string,
    type: string,
    title: string,
    gradeType: string,
    request: any
  ) {
    var axios = require("axios");
    try {
      const searchData = {
        assessmentsetId,
        type,
        title,
        gradeType,
      };

      let query = "";
      Object.keys(searchData).forEach((e) => {
        if (searchData[e] && searchData[e] != "") {
          query += `${e}:{_eq:"${searchData[e]}"}`;
        }
      });

      var data = {
        query: `query GetAssessmentset($limit:Int) {
      assessmentset(limit:$limit,where: {${query}}) {
        assessmentsetId
        gradeType
        title
        options
        type
        typeDetails
        created_at
        updated_at
      }
    }`,
        variables: { limit: parseInt(limit) },
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

      const result = await this.mappedResponse(
        response.data.data.assessmentset
      );
      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result,
      });
    } catch (e) {
      return `${e}`;
    }
  }

  public async mappedResponse(result: any) {
    const assessmentSetResponse = result.map((obj: any) => {
      const assessmentSetMapping = {
        assessmentsetId: obj?.assessmentsetId ? `${obj.assessmentsetId}` : "",
        title: obj?.title ? `${obj.title}` : "",
        type: obj?.type ? obj.type : "",
        typeDetails: obj?.typeDetails ? obj.typeDetails : "",
        gradeType: obj?.gradeType ? `${obj.gradeType}` : "",
        options: obj?.options ? `${obj.options}` : "",
        createdAt: obj?.created_at ? `${obj.created_at}` : "",
        updatedAt: obj?.updated_at ? `${obj.updated_at}` : "",
      };
      return new AssessmentsetDto(assessmentSetMapping);
    });

    return assessmentSetResponse;
  }
}
