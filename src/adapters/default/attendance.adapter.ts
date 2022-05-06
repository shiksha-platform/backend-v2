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
@Injectable()
export class AttendanceService {
  constructor(
    private httpService: HttpService,
    private schedulerRegistry: SchedulerRegistry
  ) {}
  url = `${process.env.BASEAPIURL}/Attendance`;
  studentAPIUrl = `${process.env.BASEAPIURL}/Student`;
  UCIURL = `${process.env.UCIAPI}`;

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
  public async createAttendance(request: any, attendanceDto: AttendanceDto) {
    return this.httpService
      .post(`${this.url}`, attendanceDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          return new SuccessResponse({
            statusCode: 200,
            message: "Ok.",
            data: axiosResponse.data,
          });
        }),
        catchError((e) => {
          var error = new ErrorResponse({
            errorCode: e.response?.status,
            errorMessage: e.response?.data?.params?.errmsg,
          });
          throw new HttpException(error, e.response.status);
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

  public async userSegment(attendance: string, date: string, request: any) {
    let axios = require("axios");

    let data: any = {
      filters: {
        attendance: {
          eq: `${attendance}`,
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

    const response = await axios(config);
    let resData = response?.data;

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
      let studentDto = new SegmentDto(data);

      studentArray.push(studentDto);
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
  @Cron("0 00 18 * * 1-5")
  public async sendSMSNotificaiotns() {
    var axios = require("axios");
    const result = Math.random().toString(27).substring(6, 8);
    // Conversation Logic
    var data = {
      data: {
        name: `Siksha SMS Notification Broadcast ${result}`,
        transformers: [
          {
            id: "774cd134-6657-4688-85f6-6338e2323dde",
            meta: {
              body: "Kindly note your OTP @__123__@. Submission of the OTP will be taken as authentication that you have personally verified and overseen the distribution of smartphone to the mentioned student ID of your school. Thank you! - Samagra Shiksha, Himachal Pradesh",
              type: "JS_TEMPLATE_LITERALS",
              user: "25bbdbf7-5286-4b85-a03c-c53d1d990a23",
            },
            type: "broadcast",
          },
        ],
        adapter: "582980ae-95c6-404e-a1a2-5a25104218a8",
      },
    };

    var config = {
      method: "post",
      url: `${this.UCIURL}/conversationLogic/create`,
      headers: {
        "admin-token": "EXnYOvDx4KFqcQkdXqI38MHgFvnJcxMS",
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    const resData = response.data;
    const consversationLogicID = resData.result.data.id;

    // Bot Logic

    var botData = {
      data: {
        startingMessage: `Hi Siksha SMS broadcast ${result}`,
        name: `Siksha SMS Notifications Broadcasts ${result}`,
        users: ["ab1616ad-861c-4824-868b-b5d1206f673f"],
        logic: [consversationLogicID],
        status: "enabled",
        startDate: "2022-05-06",
        endDate: "2023-05-6",
      },
    };

    var botConfig = {
      method: "post",
      url: `${this.UCIURL}/bot/create`,
      headers: {
        "admin-token": "EXnYOvDx4KFqcQkdXqI38MHgFvnJcxMS",
        "Content-Type": "application/json",
      },
      data: botData,
    };
    const botResponse = await axios(botConfig);
    const botResData = botResponse.data;
    const botCreateID = botResData.result.data.id;

    var configs = {
      method: "get",
      url: `${process.env.BOTCALL}${botCreateID}`,
      headers: {},
    };

    const botres = await axios(configs);
    const sendData = botres.data;
    console.log(sendData, "SMS Notification Sent Successfully");
  }
}
