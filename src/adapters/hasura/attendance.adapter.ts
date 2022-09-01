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
import moment from "moment";

import { IServicelocator } from "../attendanceservicelocator";
import { StudentDto } from "src/student/dto/student.dto";
export const ShikshaAttendanceToken = "ShikshaAttendance";

@Injectable()
export class AttendanceHasuraService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Attendance`;
  studentAPIUrl = `${process.env.BASEAPIURL}/Student`;
  baseUrl = process.env.BASEAPIURL;
  public async getAttendance(attendanceId: any, request: any) {
    var axios = require("axios");
    console.log("Hasura Adapter");

    var data = {
      query: `query GetAttendance($attendanceId:uuid) {
        attendance(where: {attendanceId: {_eq: $attendanceId}}) {
            attendance
            attendanceDate
            attendanceId
            created_at
            eventId
            groupId
            image
            latitude
            longitude
            metaData
            remark
            schoolId
            syncTime
            topicId
            updated_at
            userId
            userType
        }
      }
      `,
      variables: { attendanceId: attendanceId },
    };
    console.log("52");

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
    console.log(response.data.data.attendance);

    let result = response?.data?.data?.attendance.map(
      (item: any) => new AttendanceDto(item)
    );
    console.log(result);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateAttendance(
    attendanceId: string,
    request: any,
    attendanceDto: AttendanceDto
  ) {
    var axios = require("axios");
    const attendanceSchema = new AttendanceDto({});

    let newDataObject = "";
    const newData = Object.keys(attendanceDto).forEach((e) => {
      if (
        attendanceDto[e] &&
        attendanceDto[e] != "" &&
        Object.keys(attendanceSchema).includes(e)
      ) {
        newDataObject += `${e}: "${attendanceDto[e]}", `;
      }
    });

    var data = {
      query: `mutation UpdateAttendance($attendanceId:uuid) {
          update_attendance(where: {attendanceId: {_eq: $attendanceId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
      variables: {
        attendanceId: attendanceId,
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

  public async searchAttendance(
    request: any,
    attendanceSearchDto: AttendanceSearchDto
  ) {
    var axios = require("axios");

    let offset = 0;
    if (attendanceSearchDto.page > 1) {
      offset =
        parseInt(attendanceSearchDto.limit) * (attendanceSearchDto.page - 1);
    }

    let newDataObject = "";
    const newData = Object.keys(attendanceSearchDto.filters).forEach((e) => {
      if (
        attendanceSearchDto.filters[e] &&
        attendanceSearchDto.filters[e] != ""
      ) {
        newDataObject += `${e}:{_eq:"${attendanceSearchDto.filters[e]}"}`;
      }
    });

    var data = {
      query: `query SearchAttendance($limit:Int, $offset:Int) {
            attendance(where:{ ${newDataObject}}, limit: $limit, offset: $offset,) {
              attendance
              attendanceDate
              attendanceId
              created_at
              eventId
              groupId
              image
              latitude
              longitude
              metaData
              remark
              schoolId
              syncTime
              topicId
              updated_at
              userId
              userType
            }
          }`,
      variables: {
        limit: parseInt(attendanceSearchDto.limit),
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

    let result = response.data.data.attendance.map(
      (item: any) => new AttendanceDto(item)
    );

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async userSegment(
    groupId: string,
    attendance: string,
    date: string,
    request: any
  ) {
    let axios = require("axios");
    let fromDate: any;
    let toDate: any;

    let data = {
      fromDate: fromDate,
      toDate: toDate,
      attendance: attendance,
      attendanceDate: date,
    };
    switch (date) {
      case "today":
        data = {
          ...data,
          attendanceDate: `${moment().format("Y-MM-DD")}`,
        };
        break;

      case "yesterday":
        data = {
          ...data,
          attendanceDate: `${moment().add(-1, "days").format("Y-MM-DD")}`,
        };
        break;

      case "lastthreedays":
        data = {
          ...data,
          fromDate: `${moment().add(-3, "days").format("Y-MM-DD")}`,
          toDate: `${moment().format("Y-MM-DD")}`,
          attendanceDate: "",
        };
        break;

      case "thisweek":
        data = {
          ...data,

          fromDate: moment().startOf("week").format("Y-MM-DD"),
          toDate: moment().endOf("week").format("Y-MM-DD"),
          attendanceDate: "",
        };
        break;

      case "lastweek":
        data = {
          ...data,

          fromDate: moment()
            .subtract(1, "weeks")
            .startOf("week")
            .format("YYYY-MM-DD"),
          toDate: moment()
            .subtract(1, "weeks")
            .endOf("week")
            .format("YYYY-MM-DD"),
          attendanceDate: "",
        };

        break;

      case "thismonth":
        data = {
          ...data,

          fromDate: moment().startOf("month").format("Y-MM-DD"),
          toDate: moment().endOf("month").format("Y-MM-DD"),
          attendanceDate: "",
        };
        break;

      case "lastmonth":
        data = {
          ...data,

          fromDate: moment()
            .subtract(1, "months")
            .startOf("month")
            .format("YYYY-MM-DD"),
          toDate: moment()
            .subtract(1, "months")
            .endOf("month")
            .format("YYYY-MM-DD"),
          attendanceDate: "",
        };

        break;
    }

    let newDataObject = "";
    if (data.fromDate && data.toDate) {
      newDataObject += `attendanceDate:{_gte: "${data.fromDate}"}, _and: {attendanceDate: {_lte: "${data.toDate}"}} `;
    }
    const objectKeys = Object.keys(data);
    objectKeys.forEach((e, index) => {
      if (data[e] && data[e] != "" && !["fromDate", "toDate"].includes(e)) {
        newDataObject += `${e}:{_eq:"${data[e]}"}`;
        if (index !== objectKeys.length - 1) {
          newDataObject += " ";
        }
      }
    });

    var FilterData = {
      query: `query AttendanceFilter {
            attendance(where:{ ${newDataObject}}) {
              attendance
              attendanceDate
              attendanceId
              created_at
              eventId
              groupId
              image
              latitude
              longitude
              metaData
              remark
              schoolId
              syncTime
              topicId
              updated_at
              userId
              userType
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
      data: FilterData,
    };

    let startDates: any;
    let endDates: any;

    if (data.attendanceDate === undefined) {
      startDates = "";
      endDates = "";
    } else {
      startDates = data.fromDate ? data.fromDate : "";
      endDates = data.toDate ? data.toDate : "";
    }

    const response = await axios(config);
    let resData = response?.data?.data?.attendance;

    let dateData = resData.map((e: any) => {
      return e.attendanceDate;
    });

    const groupData = await axios.get(`${this.baseUrl}/Class/${groupId}`);

    const teacherData = await axios.get(
      `${this.baseUrl}/User/${groupData.data.teacherId}`
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

    const filterParams = {
      userId,
      userType,
      attendance,
      groupId,
      schoolId,
      eventId,
      topicId,
    };

    let newDataObject = "";
    const newData = Object.keys(filterParams).forEach((e) => {
      if (filterParams[e] && filterParams[e] != "") {
        newDataObject += `${e}:{_eq:"${filterParams[e]}"}`;
      }
    });

    var FilterData = {
      query: `query AttendanceFilter($fromDate:date,$toDate:date) {
            attendance(where:{  attendanceDate: {_gte: $fromDate}, _and: {attendanceDate: {_lte: $toDate}} ${newDataObject}}) {
              attendance
              attendanceDate
              attendanceId
              created_at
              eventId
              groupId
              image
              latitude
              longitude
              metaData
              remark
              schoolId
              syncTime
              topicId
              updated_at
              userId
              userType
            }
          }`,
      variables: {
        fromDate: fromDate,
        toDate: toDate,
      },
    };
    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: FilterData,
    };

    const response = await axios(config);

    let result =
      response?.data.data.attendance &&
      response.data.data.attendance.map((item: any) => new AttendanceDto(item));

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: result,
    });
  }

  public async createAttendance(request: any, attendanceDto: AttendanceDto) {
    let axios = require("axios");
    const attendanceSchema = new AttendanceDto({});

    let dataObject = "";
    const newDataObj = Object.keys(attendanceDto).forEach((e) => {
      if (
        attendanceDto[e] &&
        attendanceDto[e] != "" &&
        Object.keys(attendanceSchema).includes(e)
      ) {
        dataObject += `${e}:{_eq:"${attendanceDto[e]}"}`;
      }
    });

    var data = {
      query: `query SearchAttendance {
            attendance(where:{ ${dataObject}}) {
              attendanceId
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

    let resData = responseData.data.data.attendance.map(
      (item: any) => new AttendanceDto(item)
    );

    if (resData.length > 0) {
      let newDataObject = "";
      const newData = Object.keys(attendanceDto).forEach((e) => {
        if (
          attendanceDto[e] &&
          attendanceDto[e] != "" &&
          Object.keys(attendanceSchema).includes(e)
        ) {
          newDataObject += `${e}: "${attendanceDto[e]}", `;
        }
      });

      var updateQuery = {
        query: `mutation UpdateAttendance($attendanceId:uuid) {
          update_attendance(where: {attendanceId: {_eq: $attendanceId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
        variables: {
          attendanceId: resData[0].attendanceId,
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
      const newData = Object.keys(attendanceDto).forEach((e) => {
        if (
          attendanceDto[e] &&
          attendanceDto[e] != "" &&
          Object.keys(attendanceSchema).includes(e)
        ) {
          newDataObject += `${e}: "${attendanceDto[e]}", `;
        }
      });

      var data = {
        query: `mutation CreateAttendance {
        insert_attendance_one(object: {${newDataObject}}) {
         attendanceId
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

      const result = response.data.data.insert_attendance_one;

      return new SuccessResponse({
        statusCode: 200,
        message: "Ok.",
        data: result,
      });
    }
  }
  public async multipleAttendance(request: any, attendanceData: [Object]) {
    let axios = require("axios");
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
        let dataObject = "";
        const newDataObj = Object.keys(attendanceDto).forEach((e) => {
          if (attendanceDto[e] && attendanceDto[e] != "") {
            dataObject += `${e}:{_eq:"${attendanceDto[e]}"}`;
          }
        });

        var search = {
          query: `query SearchAttendance {
            attendance(where:{ ${dataObject}}) {
              attendanceId
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
          data: search,
        };

        const responseData = await axios(config);

        let resData = responseData.data.data.attendance.map(
          (item: any) => new AttendanceDto(item)
        );

        if (resData.length > 0) {
          let newDataObject = "";
          const newData = Object.keys(attendanceDto).forEach((e) => {
            if (attendanceDto[e] && attendanceDto[e] != "") {
              newDataObject += `${e}: "${attendanceDto[e]}", `;
            }
          });

          var updateQuery = {
            query: `mutation UpdateAttendance($attendanceId:uuid) {
          update_attendance(where: {attendanceId: {_eq: $attendanceId}}, _set: {${newDataObject}}) {
          affected_rows
        }
}`,
            variables: {
              attendanceId: resData[0].attendanceId,
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

          return await response.data.data;
        } else {
          let newDataObject = "";
          const newData = Object.keys(attendanceDto).forEach((e) => {
            if (attendanceDto[e] && attendanceDto[e] != "") {
              newDataObject += `${e}: "${attendanceDto[e]}", `;
            }
          });

          var CreateData = {
            query: `mutation CreateAttendance {
        insert_attendance_one(object: {${newDataObject}}) {
         attendanceId
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
            data: CreateData,
          };

          const response = await axios(config);

          return await response.data.data.insert_attendance_one;
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

  public async studentAttendanceByGroup(
    date: string,
    groupId: string,
    request: any
  ) {
    let axios = require("axios");
    let studentArray = [];
    const filterParams = {
      groupId,
      attendanceDate: date,
    };

    let newDataObject = "";
    const newData = Object.keys(filterParams).forEach((e) => {
      if (filterParams[e] && filterParams[e] != "") {
        newDataObject += `${e}:{_eq:"${filterParams[e]}"}`;
      }
    });

    var FilterData = {
      query: `query AttendanceFilter {
              attendance(where:{   ${newDataObject}}) {
                attendance
                attendanceDate
                attendanceId
                groupId
                schoolId
                userId
                userType
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
      data: FilterData,
    };

    const response = await axios(config);

    if (response.data.data.attendance.length > 0) {
      const studentIds = response.data.data.attendance.map((e: any) => {
        return e.userId;
      });

      for (let studentId of studentIds) {
        const studentData = await axios.get(
          `${this.studentAPIUrl}/${studentId}`,
          {
            headers: {
              Authorization: request.headers.authorization,
            },
          }
        );

        let result = new StudentDto(studentData.data);
        const updatedStudent = {
          ...result,
          attendance: response.data.data.attendance[0].attendance,
          attendanceDate: response.data.data.attendance[0].attendanceDate,
        };
        studentArray.push(updatedStudent);
      }

      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: studentArray,
      });
    } else {
      return new SuccessResponse({
        statusCode: 200,
        message: "Attendance not marked for this class yet",
        data: [],
      });
    }
  }

  public async studentAttendanceByUserId(
    date: string,
    userId: string,
    request: any
  ) {
    let axios = require("axios");
    const filterParams = {
      userId,
      attendanceDate: date,
    };

    let newDataObject = "";
    const newData = Object.keys(filterParams).forEach((e) => {
      if (filterParams[e] && filterParams[e] != "") {
        newDataObject += `${e}:{_eq:"${filterParams[e]}"}`;
      }
    });

    var FilterData = {
      query: `query AttendanceFilter {
              attendance(where:{   ${newDataObject}}) {
                attendance
                attendanceDate
                attendanceId
                groupId
                schoolId
                userId
                userType
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
      data: FilterData,
    };

    const response = await axios(config);

    const studentId = response.data.data.attendance[0].userId;
    const studentData = await axios.get(`${this.studentAPIUrl}/${studentId}`, {
      headers: {
        Authorization: request.headers.authorization,
      },
    });

    let result = new StudentDto(studentData.data);
    const updatedStudent = {
      ...result,
      attendance: response.data.data.attendance[0].attendance,
      attendanceDate: response.data.data.attendance[0].attendanceDate,
    };

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: updatedStudent,
    });
  }
}
