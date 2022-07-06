import { Injectable, HttpException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { map } from "rxjs";
import { AttendanceDto } from "src/attendance/dto/attendance.dto";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { catchError } from "rxjs/operators";
import { AttendanceSearchDto } from "src/attendance/dto/attendance-search.dto";
import { SegmentDto } from "src/common-dto/userSegment.dto";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import moment from "moment";

import { IServicelocator } from "../attendanceservicelocator";
export const SunbirdAttendanceToken = "SunbirdAttendance";

@Injectable()
export class AttendanceService implements IServicelocator {
  constructor(
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry
  ) {}
  url = `${process.env.BASEAPIURL}/Attendance`;
  studentAPIUrl = `${process.env.BASEAPIURL}/Student`;
  baseUrl = process.env.BASEAPIURL;
  public async getAttendance(attendanceId: any, request: any) {
    return this.httpService
      .get(`${this.url}/${attendanceId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const attendanceDto = new AttendanceDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: attendanceDto,
          });
        })
      );
  }

  public async updateAttendance(
    attendanceId: string,
    request: any,
    attendanceDto: AttendanceDto
  ) {
    var axios = require("axios");
    var data = attendanceDto;

    var config = {
      method: "put",
      url: `${this.url}/${attendanceId}`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: data,
    };
    const response = await axios(config);
    return new SuccessResponse({
      statusCode: 200,
      message: " Ok.",
      data: response.data,
    });
  }

  public async searchAttendance(
    request: any,
    attendanceSearchDto: AttendanceSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, attendanceSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new AttendanceDto(item)
          );
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: responsedata,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response.status,
            errorMessage: e.response.data.params.errmsg,
          });
          throw new HttpException(error, e.response.status);
        })
      );
  }

  public async userSegment(
    groupId: string,
    attendance: string,
    date: string,
    request: any
  ) {
    let axios = require("axios");

    let data: any = {
      filters: {
        attendance: {
          eq: `${attendance}`,
        },
        groupId: {
          eq: `${groupId}`,
        },
      },
    };
    switch (date) {
      case "today":
        data.filters = {
          ...data.filters,
          attendanceDate: {
            eq: `${moment().format("Y-MM-DD")}`,
          },
        };
        break;

      case "yesterday":
        data.filters = {
          ...data.filters,
          attendanceDate: {
            eq: `${moment().add(-1, "days").format("Y-MM-DD")}`,
          },
        };
        break;

      case "lastthreedays":
        data.filters = {
          ...data.filters,
          attendanceDate: {
            eq: `${moment().add(-3, "days").format("Y-MM-DD")}`,
          },
        };
        break;

      case "thisweek":
        data.filters = {
          ...data.filters,
          attendanceDate: {
            between: [
              moment().startOf("week").format("Y-MM-DD"),
              moment().endOf("week").format("Y-MM-DD"),
            ],
          },
        };
        break;

      case "lastweek":
        data.filters = {
          ...data.filters,
          attendanceDate: {
            between: [
              moment()
                .subtract(1, "weeks")
                .startOf("week")
                .format("YYYY-MM-DD"),
              moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"),
            ],
          },
        };

        break;

      case "thismonth":
        data.filters = {
          ...data.filters,
          attendanceDate: {
            between: [
              moment().startOf("month").format("Y-MM-DD"),
              moment().endOf("month").format("Y-MM-DD"),
            ],
          },
        };
        break;

      case "lastmonth":
        data.filters = {
          ...data.filters,
          attendanceDate: {
            between: [
              moment()
                .subtract(1, "months")
                .startOf("month")
                .format("YYYY-MM-DD"),
              moment()
                .subtract(1, "months")
                .endOf("month")
                .format("YYYY-MM-DD"),
            ],
          },
        };

        break;
    }

    let config = {
      method: "post",
      url: `${this.url}/search`,

      data: data,
    };

    let startDates: any;
    let endDates: any;

    if (data.filters.attendanceDate.between === undefined) {
      startDates = "";
      endDates = "";
    } else {
      startDates = data.filters.attendanceDate?.between[0]
        ? data.filters.attendanceDate.between[0]
        : "";
      endDates = data.filters.attendanceDate?.between[1]
        ? data.filters.attendanceDate.between[1]
        : "";
    }

    const response = await axios(config);
    let resData = response?.data;

    let dateData = resData.map((e: any) => {
      return e.attendanceDate;
    });

    const groupData = await axios.get(`${this.baseUrl}/Class/${groupId}`);

    const teacherData = await axios.get(
      `${this.baseUrl}/Teacher/${groupData.data.teacherId}`
    );

    const schoolData = await axios.get(
      `${this.baseUrl}/School/${groupData.data.schoolId}`
    );

    let arrayIds = resData.map((e: any) => {
      return e.userId;
    });

    let studentArray = [];
    for (let value of arrayIds) {
      let config = {
        method: "get",
        url: `${this.studentAPIUrl}/${value}`,
      };
      const response = await axios(config);
      const data = response?.data;

      const date = new Date(dateData[0]);
      const month = date.toLocaleString("default", { month: "long" });

      const studentDto = {
        id: data.osid,
        name: data?.firstName + " " + data?.lastName,
        phoneNo: data.guardianPhoneNumber,
        parentName: data?.guardianFirstName + " " + data?.guardianLastName,
        attendanceDate: dateData[0],
        month: month,
        teacherName:
          teacherData.data.firstName + " " + teacherData.data.lastName,
        schoolName: schoolData.data.schoolName,
        startDate: startDates,
        endDate: endDates,
      };
      let studentDtoData = new SegmentDto(studentDto);
      studentArray.push(studentDtoData);
    }

    return new SuccessResponse({
      data: studentArray,
    });
  }

  public async attendanceFilter(
    fromDate: string,
    toDate: string,
    userId: string,
    userType: string,
    attendance: string,
    groupId: string,
    schoolId: string,
    eventId: string,
    topicId: string,
    request: any
  ) {
    let axios = require("axios");
    let filters = {
      fromDate,
      toDate,
      userId,
      userType,
      attendance,
      groupId,
      schoolId,
      eventId,
      topicId,
    };
    const filterArray = Object.keys(filters).filter(
      (value, key) => filters[value] && filters[value] !== ""
    );
    let data = { attendanceDate: { between: [] } };
    filterArray.forEach((value, key) => {
      if (["fromDate", "toDate"].includes(value)) {
        data["attendanceDate"].between.push(filters[value]);
      } else {
        data[value] = { eq: filters[value] };
      }
    });

    let config = {
      method: "post",
      url: `${this.url}/search`,
      headers: {
        Authorization: request.headers.authorization,
      },
      data: { filters: data },
    };

    const response = await axios(config);

    let result =
      response?.data &&
      response.data.map((item: any) => new AttendanceDto(item));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }

  public async createAttendance(request: any, attendanceDto: AttendanceDto) {
    let axios = require("axios");
    let data = {
      filters: {
        userId: {
          eq: `${attendanceDto.userId}`,
        },
        attendanceDate: {
          eq: `${attendanceDto.attendanceDate}`,
        },
      },
    };

    let attendanceCreate = {
      method: "post",
      url: `${this.url}/search`,

      data: data,
    };

    const response = await axios(attendanceCreate);
    let resData = response?.data;
    let result = resData.map((item: any) => new AttendanceDto(item));

    let attendanceId = result.map(function (AttendanceDto) {
      return AttendanceDto.attendanceId;
    });

    if (resData.length > 0) {
      var updateData = attendanceDto;
      var updateAttendance = {
        method: "put",
        url: `${this.url}/${attendanceId}`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: updateData,
      };

      const response = await axios(updateAttendance);
      return new SuccessResponse({
        statusCode: 200,
        message: " Ok.",
        data: response.data,
      });
    } else {
      var createAttendance = attendanceDto;
      var create = {
        method: "post",
        url: `${this.url}`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: createAttendance,
      };

      console.log(create);

      const response = await axios(create);

      return new SuccessResponse({
        statusCode: 200,
        message: " Ok.",
        data: response.data,
      });
    }
  }
  public async multipleAttendance(request: any, attendanceData: [Object]) {
    let attendeeData = attendanceData["attendanceData"];
    const result = Promise.all(
      attendeeData.map(async (data: any) => {
        data["schoolId"] = attendanceData["schoolId"]
          ? attendanceData["schoolId"]
          : "";
        data["userType"] = attendanceData["userType"]
          ? attendanceData["userType"]
          : "";
        data["groupId"] = attendanceData["groupId"]
          ? attendanceData["groupId"]
          : "";
        data["topicId"] = attendanceData["topicId"]
          ? attendanceData["topicId"]
          : "";
        data["eventId"] = attendanceData["eventId"]
          ? attendanceData["eventId"]
          : "";
        data["attendanceDate"] = attendanceData["attendanceDate"]
          ? attendanceData["attendanceDate"]
          : "";
        data["latitude"] = attendanceData["latitude"]
          ? attendanceData["latitude"]
          : 0;
        data["longitude"] = attendanceData["longitude"]
          ? attendanceData["longitude"]
          : 0;
        data["image"] = attendanceData["image"] ? attendanceData["image"] : "";
        data["metaData"] = attendanceData["metaData"]
          ? attendanceData["metaData"]
          : [];
        data["syncTime"] = attendanceData["syncTime"]
          ? attendanceData["syncTime"]
          : "";

        let attendanceDto = data;
        let axios = require("axios");
        let dataSearch = {
          filters: {
            userId: {
              eq: `${attendanceDto.userId}`,
            },
            attendanceDate: {
              eq: `${attendanceDto.attendanceDate}`,
            },
          },
        };

        let attendanceCreate = {
          method: "post",
          url: `${this.url}/search`,

          data: dataSearch,
        };

        const response = await axios(attendanceCreate);
        let resData = response?.data;
        let result = resData.map((item: any) => new AttendanceDto(item));

        let attendanceId = result.map(function (AttendanceDto) {
          return AttendanceDto.attendanceId;
        });

        if (resData.length > 0) {
          var updateData = attendanceDto;
          var updateAttendance = {
            method: "put",
            url: `${this.url}/${attendanceId}`,
            headers: {
              Authorization: request.headers.authorization,
            },
            data: updateData,
          };

          const response = await axios(updateAttendance);
          return await response.data;
        } else {
          var createAttendance = attendanceDto;
          var create = {
            method: "post",
            url: `${this.url}`,
            headers: {
              Authorization: request.headers.authorization,
            },
            data: createAttendance,
          };

          const response = await axios(create);
          return await response.data;
        }
      })
    );
    const responseArray = await result;
    return new SuccessResponse({
      statusCode: 200,
      message: " Ok.",
      data: responseArray,
    });
  }
}
