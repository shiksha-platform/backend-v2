import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { SchoolDto } from "src/school/dto/school.dto";
import { SchoolSearchDto } from "src/school/dto/school-search.dto";
import { IServicelocator } from "../schoolservicelocator";
export const HasuraSchoolToken = "HasuraSchool";
@Injectable()
export class SchoolHasuraService implements IServicelocator {
  constructor(private httpService: HttpService) {}

  public async createSchool(request: any, schoolDto: SchoolDto) {
    var axios = require("axios");
    const schoolSchema = new SchoolDto({});
    let newDataObject = "";
    const newData = Object.keys(schoolDto).forEach((e) => {
      if (
        schoolDto[e] &&
        schoolDto[e] != "" &&
        Object.keys(schoolSchema).includes(e)
      ) {
        if (Array.isArray(schoolDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(schoolDto[e])}, `;
        } else {
          newDataObject += `${e}: "${schoolDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateSchool {
        insert_school_one(object: {${newDataObject}}) {
         schoolId
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

    const result = response.data.data.insert_school_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateSchool(id: string, request: any, schoolDto: SchoolDto) {
    var axios = require("axios");
    const schoolSchema = new SchoolDto({});
    let newDataObject = "";
    const newData = Object.keys(schoolDto).forEach((e) => {
      if (
        schoolDto[e] &&
        schoolDto[e] != "" &&
        Object.keys(schoolSchema).includes(e)
      ) {
        if (Array.isArray(schoolDto[e])) {
          newDataObject += `${e}: ${JSON.stringify(schoolDto[e])}, `;
        } else {
          newDataObject += `${e}: "${schoolDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation UpdateSchool($schoolId:uuid) {
          update_school(where: {schoolId: {_eq: $schoolId}}, _set: {${newDataObject}}) {
          affected_rows
        }}`,
      variables: {
        schoolId: id,
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

  public async getSchool(schoolId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetSchool($schoolId:uuid!) {
        school_by_pk(schoolId: $schoolId) {
            address
            block
            created_at
            deactivationReason
            district
            email
            latitude
            enrollCount
            locationId
            longitude
            mediumOfInstruction
            metaData
            phoneNumber
            updated_at
            status
            udise
            stateId
            schoolType
            schoolName
            schoolId
            pincode
            village
            website
            cluster
        }
      }
      `,
      variables: { schoolId: schoolId },
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

    let result = new SchoolDto(response.data.data.school_by_pk);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
  public async searchSchool(request: any, schoolSearchDto: SchoolSearchDto) {
    var axios = require("axios");

    let offset = 0;

    if (schoolSearchDto.page > 1) {
      offset = parseInt(schoolSearchDto.limit) * (schoolSearchDto.page - 1);
    }

    let newDataObject = "";
    const newData = Object.keys(schoolSearchDto.filters).forEach((e) => {
      if (schoolSearchDto.filters[e] && schoolSearchDto.filters[e] != "") {
        newDataObject += `${e}:{_eq:"${schoolSearchDto.filters[e]}"}`;
      }
    });

    var data = {
      query: `query SearchSchool($limit:Int, $offset:Int) {
            school(where:{ ${newDataObject}}, limit: $limit, offset: $offset,) {
                address
                block
                created_at
                deactivationReason
                district
                email
                latitude
                enrollCount
                locationId
                longitude
                mediumOfInstruction
                metaData
                phoneNumber
                updated_at
                status
                udise
                stateId
                schoolType
                schoolName
                schoolId
                pincode
                village
                website
                cluster
            }
          }`,
      variables: {
        limit: parseInt(schoolSearchDto.limit),
        offset: offset,
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

    let result = response.data.data.school.map(
      (item: any) => new SchoolDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }
}
