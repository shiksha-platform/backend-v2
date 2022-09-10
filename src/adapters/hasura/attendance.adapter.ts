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
    var data = {
      query: `query GetAttendance($attendanceId:uuid!) {
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
    let result = response?.data?.data?.attendance;
    const mappedResponse = await this.mappedResponse(result);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: mappedResponse[0],
    });
  }

  public async updateAttendance(
    attendanceId: string,
    request: any,
    attendanceDto: AttendanceDto
  ) {
    var axios = require("axios");
    const attendanceSchema = new AttendanceDto(attendanceDto);

    let query = "";
    Object.keys(attendanceDto).forEach((e) => {
      if (
        attendanceDto[e] &&
        attendanceDto[e] != "" &&
        Object.keys(attendanceSchema).includes(e)
      ) {
        query += `${e}: "${attendanceDto[e]}", `;
      }
    });

    var data = {
      query: `mutation UpdateAttendance($attendanceId:uuid) {
          update_attendance(where: {attendanceId: {_eq: $attendanceId}}, _set: {${query}}) {
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

    let query = "";
    Object.keys(attendanceSearchDto.filters).forEach((e) => {
      if (
        attendanceSearchDto.filters[e] &&
        attendanceSearchDto.filters[e] != ""
      ) {
        query += `${e}:{_eq:"${attendanceSearchDto.filters[e]}"}`;
      }
    });

    var data = {
      query: `query SearchAttendance($limit:Int, $offset:Int) {
            attendance(where:{ ${query}}, limit: $limit, offset: $offset,) {
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
    let result = response?.data?.data?.attendance;

    const mappedResponse = await this.mappedResponse(result);

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: mappedResponse,
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

    let query = "";
    Object.keys(filterParams).forEach((e) => {
      if (filterParams[e] && filterParams[e] != "") {
        query += `${e}:{_eq:"${filterParams[e]}"}`;
      }
    });

    var FilterData = {
      query: `query AttendanceFilter($fromDate:date,$toDate:date) {
            attendance(where:{  attendanceDate: {_gte: $fromDate}, _and: {attendanceDate: {_lte: $toDate}} ${query}}) {
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
      response?.data.data.attendance && response.data.data.attendance;

    const mappedResponse = await this.mappedResponse(result);

    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: mappedResponse,
    });
  }

  public async createAttendance(request: any, attendanceDto: AttendanceDto) {
    let axios = require("axios");
    // const attendanceSchema = new AttendanceDto(attendanceDto);

    let query = "";
    Object.keys(attendanceDto).forEach((e) => {
      if (attendanceDto[e] && attendanceDto[e] != "") {
        query += `${e}:{_eq:"${attendanceDto[e]}"}`;
      }
    });

    var data = {
      query: `query SearchAttendance {
            attendance(where:{ ${query}}) {
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

    const resData = responseData.data.data.attendance;

    if (resData.length > 0) {
      let query = "";
      Object.keys(attendanceDto).forEach((e) => {
        if (attendanceDto[e] && attendanceDto[e] != "") {
          query += `${e}: "${attendanceDto[e]}", `;
        }
      });

      var updateQuery = {
        query: `mutation UpdateAttendance($attendanceId:uuid) {
          update_attendance(where: {attendanceId: {_eq: $attendanceId}}, _set: {${query}}) {
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
      let query = "";
      Object.keys(attendanceDto).forEach((e) => {
        if (attendanceDto[e] && attendanceDto[e] != "") {
          query += `${e}: "${attendanceDto[e]}", `;
        }
      });

      var data = {
        query: `mutation CreateAttendance {
        insert_attendance_one(object: {${query}}) {
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

        let resData = await this.mappedResponse(
          responseData.data.data.attendance
        );

        if (resData.length > 0) {
          let query = "";
          Object.keys(attendanceDto).forEach((e) => {
            if (attendanceDto[e] && attendanceDto[e] != "") {
              query += `${e}: "${attendanceDto[e]}", `;
            }
          });

          var updateQuery = {
            query: `mutation UpdateAttendance($attendanceId:uuid) {
          update_attendance(where: {attendanceId: {_eq: $attendanceId}}, _set: {${query}}) {
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
          let query = "";
          Object.keys(attendanceDto).forEach((e) => {
            if (attendanceDto[e] && attendanceDto[e] != "") {
              query += `${e}: "${attendanceDto[e]}", `;
            }
          });

          var CreateData = {
            query: `mutation CreateAttendance {
        insert_attendance_one(object: {${query}}) {
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

    let query = "";
    Object.keys(filterParams).forEach((e) => {
      if (filterParams[e] && filterParams[e] != "") {
        query += `${e}:{_eq:"${filterParams[e]}"}`;
      }
    });

    var FilterData = {
      query: `query AttendanceFilter {
              attendance(where:{   ${query}}) {
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

        let response = await this.StudentMappedResponse([studentData.data]);
        let result = response[0];
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

    let query = "";
    Object.keys(filterParams).forEach((e) => {
      if (filterParams[e] && filterParams[e] != "") {
        query += `${e}:{_eq:"${filterParams[e]}"}`;
      }
    });

    var FilterData = {
      query: `query AttendanceFilter {
              attendance(where:{   ${query}}) {
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

    let responseData = await this.StudentMappedResponse([studentData.data]);
    let result = responseData[0];
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

  public async mappedResponse(result: any) {
    const attendanceResponse = result.map((item: any) => {
      const attendanceMapping = {
        attendanceId: item?.attendanceId ? `${item.attendanceId}` : "",
        schoolId: item?.schoolId ? `${item.schoolId}` : "",
        userType: item?.userType ? `${item.userType}` : "",
        userId: item?.userId ? `${item.userId}` : "",
        groupId: item?.groupId ? `${item.groupId}` : "",
        topicId: item?.topicId ? `${item.topicId}` : "",
        eventId: item?.eventId ? `${item.eventId}` : "",
        remark: item?.remark ? `${item.remark}` : "",
        attendance: item?.attendance ? `${item.attendance}` : "",
        attendanceDate: item?.attendanceDate ? `${item.attendanceDate}` : "",
        latitude: item?.latitude ? item.latitude : 0,
        longitude: item?.longitude ? item.longitude : 0,
        image: item?.image ? `${item.image}` : "",
        syncTime: item?.syncTime ? `${item.syncTime}` : "",
        metaData: item?.metaData ? item.metaData : [],
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
      };

      return new AttendanceDto(attendanceMapping);
    });

    return attendanceResponse;
  }
  public async StudentMappedResponse(result: any) {
    const studentResponse = result.map((item: any) => {
      const studentMapping = {
        studentId: item?.osid ? `${item.osid}` : "",
        refId1: item?.admissionNo ? `${item.admissionNo}` : "",
        refId2: item?.refId2 ? `${item.refId2}` : "",
        aadhaar: item?.aadhaar ? `${item.aadhaar}` : "",
        firstName: item?.firstName ? `${item.firstName}` : "",
        middleName: item?.middleName ? `${item.middleName}` : "",
        lastName: item?.lastName ? `${item.lastName}` : "",
        groupId: item?.groupId ? `${item.groupId}` : "",
        schoolId: item?.schoolId ? `${item.schoolId}` : "",
        studentEmail: item?.studentEmail ? `${item.studentEmail}` : "",
        studentPhoneNumber: item?.studentPhoneNumber
          ? item.studentPhoneNumber
          : "",
        iscwsn: item?.iscwsn ? `${item.iscwsn}` : "",
        gender: item?.gender ? `${item.gender}` : "",
        socialCategory: item?.socialCategory ? `${item.socialCategory}` : "",
        religion: item?.religion ? `${item.religion}` : "",
        singleGirl: item?.singleGirl ? item.singleGirl : "",
        weight: item?.weight ? `${item.weight}` : "",
        height: item?.height ? `${item.height}` : "",
        bloodGroup: item?.bloodGroup ? `${item.bloodGroup}` : "",
        birthDate: item?.birthDate ? `${item.birthDate}` : "",
        homeless: item?.homeless ? item.homeless : "",
        bpl: item?.bpl ? item.bpl : "",
        migrant: item?.migrant ? item.migrant : "",
        status: item?.status ? `${item.status}` : "",

        fatherFirstName: item?.fatherFirstName ? `${item.fatherFirstName}` : "",

        fatherMiddleName: item?.fatherMiddleName
          ? `${item.fatherMiddleName}`
          : "",

        fatherLastName: item?.fatherLastName ? `${item.fatherLastName}` : "",
        fatherPhoneNumber: item?.fatherPhoneNumber
          ? item.fatherPhoneNumber
          : "",
        fatherEmail: item?.fatherEmail ? `${item.fatherEmail}` : "",

        motherFirstName: item?.motherFirstName ? `${item.motherFirstName}` : "",
        motherMiddleName: item?.motherMiddleName
          ? `${item.motherMiddleName}`
          : "",
        motherLastName: item?.motherLastName ? `${item.motherLastName}` : "",
        motherPhoneNumber: item?.motherPhoneNumber
          ? item.motherPhoneNumber
          : "",
        motherEmail: item?.motherEmail ? `${item.motherEmail}` : "",

        guardianFirstName: item?.guardianFirstName
          ? `${item.guardianFirstName}`
          : "",
        guardianMiddleName: item?.guardianMiddleName
          ? `${item.guardianMiddleName}`
          : "",
        guardianLastName: item?.guardianLastName
          ? `${item.guardianLastName}`
          : "",
        guardianPhoneNumber: item?.guardianPhoneNumber
          ? item.guardianPhoneNumber
          : "",
        guardianEmail: item?.guardianEmail ? `${item.guardianEmail}` : "",
        image: item?.image ? `${item.image}` : "",
        deactivationReason: item?.deactivationReason
          ? `${item.deactivationReason}`
          : "",
        studentAddress: item?.studentAddress ? `${item.studentAddress}` : "",
        village: item?.village ? `${item.village}` : "",
        block: item?.block ? `${item.block}` : "",
        district: item?.district ? `${item.district}` : "",
        stateId: item?.stateId ? `${item.stateId}` : "",
        pincode: item?.pincode ? item.pincode : "",
        locationId: item?.locationId ? `${item.locationId}` : "",
        metaData: item?.metaData ? item.metaData : [],
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
      };
      return new StudentDto(studentMapping);
    });

    return studentResponse;
  }
}
