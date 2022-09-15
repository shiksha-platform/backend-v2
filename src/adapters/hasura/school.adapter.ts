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
    const schoolSchema = new SchoolDto(schoolDto);
    let query = "";
    Object.keys(schoolDto).forEach((e) => {
      if (
        schoolDto[e] &&
        schoolDto[e] != "" &&
        Object.keys(schoolSchema).includes(e)
      ) {
        if (Array.isArray(schoolDto[e])) {
          query += `${e}: ${JSON.stringify(schoolDto[e])}, `;
        } else {
          query += `${e}: "${schoolDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateSchool {
        insert_school_one(object: {${query}}) {
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
    const schoolSchema = new SchoolDto(schoolDto);
    let query = "";
    Object.keys(schoolDto).forEach((e) => {
      if (
        schoolDto[e] &&
        schoolDto[e] != "" &&
        Object.keys(schoolSchema).includes(e)
      ) {
        if (Array.isArray(schoolDto[e])) {
          query += `${e}: ${JSON.stringify(schoolDto[e])}, `;
        } else {
          query += `${e}: "${schoolDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation UpdateSchool($schoolId:uuid) {
          update_school(where: {schoolId: {_eq: $schoolId}}, _set: {${query}}) {
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
            headMaster
            board
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

    let result = [response.data.data.school_by_pk];
    const schoolDto = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: schoolDto[0],
    });
  }
  public async searchSchool(request: any, schoolSearchDto: SchoolSearchDto) {
    var axios = require("axios");

    let offset = 0;

    if (schoolSearchDto.page > 1) {
      offset = parseInt(schoolSearchDto.limit) * (schoolSearchDto.page - 1);
    }

    let query = "";
    Object.keys(schoolSearchDto.filters).forEach((e) => {
      if (schoolSearchDto.filters[e] && schoolSearchDto.filters[e] != "") {
        query += `${e}:{_eq:"${schoolSearchDto.filters[e]}"}`;
      }
    });

    var data = {
      query: `query SearchSchool($limit:Int, $offset:Int) {
            school(where:{ ${query}}, limit: $limit, offset: $offset,) {
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
                headMaster
                 board
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

    let result = response.data.data.school;
    const schoolDto = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: schoolDto,
    });
  }
  public async mappedResponse(result: any) {
    const schoolResponse = result.map((item: any) => {
      const schoolMapping = {
        schoolId: item?.schoolId ? `${item.schoolId}` : "",
        schoolName: item?.schoolName ? `${item.schoolName}` : "",
        email: item?.email ? `${item.email}` : "",
        udise: item?.udise ? `${item.udise}` : "",
        mediumOfInstruction: item?.mediumOfInstruction
          ? item.mediumOfInstruction
          : "",
        phoneNumber: item?.phoneNumber ? item.phoneNumber : "",
        address: item?.address ? item.address : "",
        schoolType: item?.schoolType ? `${item.schoolType}` : "",
        website: item?.website ? `${item.website}` : "",
        headMaster: item?.headMaster ? `${item.headMaster}` : "",
        board: item?.board ? `${item.board}` : "",
        village: item?.village ? `${item.village}` : "",
        block: item?.block ? `${item.block}` : "",
        district: item?.district ? `${item.district}` : "",
        stateId: item?.stateId ? `${item.stateId}` : "",
        cluster: item?.cluster ? `${item.cluster}` : "",
        pincode: item?.pincode ? item.pincode : "",
        locationId: item?.locationId ? `${item.locationId}` : "",
        enrollCount: item?.enrollCount ? `${item.enrollCount}` : "",
        status: item?.status ? `${item.status}` : "",
        latitude: item?.latitude ? item.latitude : "",
        longitude: item?.longitude ? item.longitude : "",
        metaData: item?.metaData ? item.metaData : [],
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
      };
      return new SchoolDto(schoolMapping);
    });

    return schoolResponse;
  }
}
