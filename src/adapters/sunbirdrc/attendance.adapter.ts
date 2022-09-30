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
export const SunbirdAttendanceToken = "SunbirdAttendance";

@Injectable()
export class AttendanceService implements IServicelocator {
  constructor(private httpService: HttpService) {}
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
        map(async (axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const result = [data];
          const mappedResponse = await this.mappedResponse(result);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: mappedResponse[0],
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
        map(async (response) => {
          const responsedata = response.data;
          const mappedResponse = await this.mappedResponse(responsedata);
          return new SuccessResponse({
            statusCode: response.status,
            message: "Ok.",
            data: mappedResponse,
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
    let result = response?.data && response.data;
    const mappedResponse = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: mappedResponse,
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
    let result = await this.mappedResponse(resData);

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
        let result = await this.mappedResponse(resData);

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

  public async studentAttendanceByGroup(
    date: string,
    groupId: string,
    request: any
  ) {
    let axios = require("axios");
    try {
      let studentArray = [];
      let data = {
        filters: {
          groupId: {
            eq: `${groupId}`,
          },
          attendanceDate: {
            eq: `${date}`,
          },
        },
      };
      let config = {
        method: "post",
        url: `${this.url}/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const response = await axios(config);

      if (response.data.length > 0) {
        const studentIds = response.data.map((e: any) => {
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

          let responseData = await this.StudentMappedResponse([
            studentData.data,
          ]);
          let result = responseData[0];
          const updatedStudent = {
            ...result,
            attendance: response.data[0].attendance,
            attendanceDate: response.data[0].attendanceDate,
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
    } catch (e) {
      return new ErrorResponse({
        errorCode: e.response.status,
        errorMessage: e.response.data.params.errmsg,
      });
    }
  }

  public async studentAttendanceByUserId(
    date: string,
    userId: string,
    request: any
  ) {
    let axios = require("axios");
    try {
      let data = {
        filters: {
          userId: {
            eq: `${userId}`,
          },
          attendanceDate: {
            eq: `${date}`,
          },
        },
      };
      let config = {
        method: "post",
        url: `${this.url}/search`,
        headers: {
          Authorization: request.headers.authorization,
        },
        data: data,
      };

      const response = await axios(config);
      const studentId = response.data[0].userId;
      const studentData = await axios.get(
        `${this.studentAPIUrl}/${studentId}`,
        {
          headers: {
            Authorization: request.headers.authorization,
          },
        }
      );

      let responseData = await this.StudentMappedResponse([studentData.data]);
      let result = responseData[0];
      const updatedStudent = {
        ...result,
        attendance: response.data[0].attendance,
        attendanceDate: response.data[0].attendanceDate,
      };

      return new SuccessResponse({
        statusCode: 200,
        message: "ok",
        data: updatedStudent,
      });
    } catch (e) {
      return `${e}`;
    }
  }

  public async mappedResponse(result: any) {
    const attendanceResponse = result.map((item: any) => {
      const attendanceMapping = {
        attendanceId: item?.osid ? `${item.osid}` : "",
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
        createdAt: item?.osCreatedAt ? `${item.osCreatedAt}` : "",
        updatedAt: item?.osUpdatedAt ? `${item.osUpdatedAt}` : "",
        createdBy: item?.osCreatedBy ? `${item.osCreatedBy}` : "",
        updatedBy: item?.osUpdatedBy ? `${item.osUpdatedBy}` : "",
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
