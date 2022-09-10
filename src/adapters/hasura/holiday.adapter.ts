import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";

import { IServicelocator } from "../holidayservicelocator";
import { HolidayDto } from "src/holiday/dto/holiday.dto";
import { HolidaySearchDto } from "src/holiday/dto/holiday-search.dto";
export const HasuraHolidayToken = "HasuraHoliday";
@Injectable()
export class HasuraHolidayService implements IServicelocator {
  constructor(private httpService: HttpService) {}

  public async createHoliday(request: any, holidayDto: HolidayDto) {
    var axios = require("axios");

    const holidaySchema = new HolidayDto(holidayDto);
    let query = "";
    Object.keys(holidayDto).forEach((e) => {
      if (
        holidayDto[e] &&
        holidayDto[e] != "" &&
        Object.keys(holidaySchema).includes(e)
      ) {
        if (Array.isArray(holidayDto[e])) {
          query += `${e}: ${JSON.stringify(holidayDto[e])}, `;
        } else {
          query += `${e}: "${holidayDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateHoliday {
        insert_holiday_one(object: {${query}}) {
         holidayId
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

    const result = response.data.data.insert_holiday_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateHoliday(id: string, request: any, holidayDto: HolidayDto) {
    var axios = require("axios");

    const holidaySchema = new HolidayDto(holidayDto);
    let query = "";
    Object.keys(holidayDto).forEach((e) => {
      if (
        holidayDto[e] &&
        holidayDto[e] != "" &&
        Object.keys(holidaySchema).includes(e)
      ) {
        if (Array.isArray(holidayDto[e])) {
          query += `${e}: ${JSON.stringify(holidayDto[e])}, `;
        } else {
          query += `${e}: "${holidayDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation UpdateHoliday($holidayId:uuid) {
          update_holiday(where: {holidayId: {_eq: $holidayId}}, _set: {${query}}) {
          affected_rows
        }}`,
      variables: {
        holidayId: id,
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

  public async getHoliday(holidayId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetHoliday($holidayId:uuid!) {
        holiday_by_pk(holidayId: $holidayId) {
            context
            contextId
            created_at
            date
            holidayId
            remark
            updated_at
            year
        }
      }
      `,
      variables: { holidayId: holidayId },
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

    let result = [response.data.data.holiday_by_pk];
    const holidayData = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: holidayData[0],
    });
  }

  public async searchHoliday(request: any, holidaySearchDto: HolidaySearchDto) {
    var axios = require("axios");

    let offset = 0;
    if (holidaySearchDto.page > 1) {
      offset = parseInt(holidaySearchDto.limit) * (holidaySearchDto.page - 1);
    }

    let filters = holidaySearchDto.filters;

    Object.keys(holidaySearchDto.filters).forEach((item) => {
      Object.keys(holidaySearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });
    var data = {
      query: `query SearchHoliday($filters:holiday_bool_exp,$limit:Int, $offset:Int) {
          holiday(where:$filters, limit: $limit, offset: $offset,) {
            context
            contextId
            created_at
            date
            holidayId
            remark
            updated_at
            year
            }
          }`,
      variables: {
        limit: parseInt(holidaySearchDto.limit),
        offset: offset,
        filters: holidaySearchDto.filters,
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

    let result = response.data.data.holiday;
    const holidayData = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: holidayData,
    });
  }

  public async holidayFilter(fromDate: string, toDate: string, request: any) {
    let axios = require("axios");

    let searchData = {
      fromDate,
      toDate,
    };

    let query = `date:{_gte: "${searchData.fromDate}"}, _and: {date: {_lte: "${searchData.toDate}"}} `;

    var data = {
      query: `query searchHoliday {
        holiday( where: {${query}}) {
        context
        contextId
        created_at
        date
        holidayId
        remark
        updated_at
        year
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

    const response = await axios(config);

    let result = response.data.data.holiday;
    const holidayData = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: holidayData,
    });
  }

  public async mappedResponse(result: any) {
    const holidayResponse = result.map((item: any) => {
      const holidayMapping = {
        holidayId: item?.holidayId ? `${item.holidayId}` : "",
        date: item?.remark ? item.remark : "",
        remark: item?.remark ? `${item.remark}` : "",
        year: item?.year ? item.year : "",
        context: item?.context ? `${item.context}` : "",
        contextId: item?.contextId ? `${item.contextId}` : "",
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
      };
      return new HolidayDto(holidayMapping);
    });

    return holidayResponse;
  }
}
