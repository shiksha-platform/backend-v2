import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../attendanceservicelocator";
import { AttendanceDto } from "src/attendance/dto/attendance.dto";

import { AttendanceSearchDto } from "src/attendance/dto/attendance-search.dto";
export const EsamwadAttendanceToken = "EsamwadAttendance";
@Injectable()
export class AttendanceEsamwadService implements IServicelocator {
  constructor(private httpService: HttpService) {}
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;

  public async getAttendance(attendanceId: string, request: any) {
    var axios = require("axios");
    var data = {
      query: `query getAttendance($id:Int!) {
        attendance(where: {id: {_eq: $id}}) {
          student_id
          taken_by_school_id
          temperature
          updated
          created
          date
          is_present
          id
        }
      }`,
      variables: {
        id: attendanceId,
      },
    };
    var config = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const responseData = await axios(config);
    const response = responseData.data.data.attendance;

    const attendanceData = response.map((item: any) => {
      if (item.is_present === true) {
        item.is_present = "Present";
      }
      if (item.is_present === false) {
        item.is_present = "Absent";
      }
      return item;
    });

    const mappedResponse = await this.mappedResponse(attendanceData);

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: mappedResponse[0],
    });
  }

  public async searchAttendance(
    request: any,
    attendanceSearchDto: AttendanceSearchDto
  ) {
    var axios = require("axios");

    let limit = attendanceSearchDto.limit;
    var data = {
      query: `query getAttendance($limit:Int!) {
    attendance(limit:$limit) {
      id
      is_present
      date
      student_id
      taken_by_school_id
      temperature
      updated
    }
  }`,
      variables: { limit: parseInt(limit) },
    };

    var config = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const responseData = await axios(config);
    const response = responseData.data.data.attendance;

    const attendanceData = response.map((item: any) => {
      if (item.is_present === true) {
        item.is_present = "Present";
      }
      if (item.is_present === false) {
        item.is_present = "Absent";
      }
      return item;
    });

    const mappedResponse = await this.mappedResponse(attendanceData);

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: mappedResponse,
    });
  }

  public async createAttendance(request: any, attendanceDto: AttendanceDto) {
    var axios = require("axios");
    var checkAttendance = {
      query: `query getAttendance($student_id:Int!,$date:date) {
        attendance(where: {student_id: {_eq: $student_id}, date:{_eq:$date}}) {
          student_id
          taken_by_school_id
          temperature
          updated
          date
          is_present
          id
        }
      }`,
      variables: {
        student_id: attendanceDto.userId,
        date: attendanceDto.attendanceDate,
      },
    };
    var attendanceConfig = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: checkAttendance,
    };

    const responsedata = await axios(attendanceConfig);
    const attendanceResponse = responsedata.data.data.attendance;

    let attendanceId = attendanceResponse.map((EsamwadAttendanceDto) => {
      return EsamwadAttendanceDto.id;
    });

    let isPresent: any;
    if (attendanceDto.attendance === "Present") {
      isPresent = "true";
    } else {
      isPresent = "false";
    }
    if (attendanceResponse.length > 0) {
      var updateData = {
        query: `mutation UpdateAttendance($isPresent:Boolean,$id:Int) {
          update_attendance(_set: {is_present: $isPresent}, where: {id: {_eq: $id}}) {
            affected_rows
          }
        }`,
        variables: { isPresent: isPresent, id: attendanceId[0] },
      };

      var updateConfig = {
        method: "post",
        url: this.baseURL,
        headers: {
          "x-hasura-admin-secret": this.adminSecret,
          "Content-Type": "application/json",
        },
        data: updateData,
      };

      const responseData = await axios(updateConfig);
      const response = responseData.data;

      return new SuccessResponse({
        statusCode: 200,
        message: "ok.",
        data: response,
      });
    } else {
      var data = {
        query: `mutation CreateAttendance($date: date, $is_present: Boolean = true, $student_id: Int, $taken_by_school_id: Int, $temperature: float8) {
        insert_attendance_one(object: {date: $date, is_present: $is_present, student_id: $student_id, taken_by_school_id: $taken_by_school_id, temperature: $temperature}){
          id,
          updated
        }
      }`,
        variables: {
          date: attendanceDto.attendanceDate,
          is_present: isPresent,
          student_id: attendanceDto.userId,
          taken_by_school_id: attendanceDto.schoolId,
          temperature: attendanceDto.metaData,
        },
      };

      var config = {
        method: "post",
        url: this.baseURL,
        headers: {
          "x-hasura-admin-secret": this.adminSecret,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const responseData = await axios(config);

      const response = responseData.data;

      let final = {
        ...response,
        result: {
          Attendance: { attendanceId: response.data.insert_attendance_one.id },
        },
      };

      return new SuccessResponse({
        statusCode: 200,
        message: "ok.",
        data: final,
      });
    }
  }

  public async updateAttendance(
    attendanceId: string,
    request: any,
    attendanceDto: AttendanceDto
  ) {
    var axios = require("axios");
    let isPresent: any;
    if (attendanceDto.attendance === "Present") {
      isPresent = "true";
    } else {
      isPresent = "false";
    }
    var updateData = {
      query: `mutation UpdateAttendance($isPresent:Boolean,$id:Int) {
        update_attendance(_set: {is_present: $isPresent}, where: {id: {_eq: $id}}) {
          affected_rows
        }
      }`,
      variables: { isPresent: isPresent, id: attendanceId },
    };

    var updateConfig = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: updateData,
    };

    const responseData = await axios(updateConfig);
    const response = responseData.data;

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: response,
    });
  }
  public async multipleAttendance(request: any, attendanceData: [Object]) {
    let attendeeData = attendanceData["attendanceData"];

    attendeeData.forEach((data: any) => {
      data["attendanceDate"] = attendanceData["attendanceDate"]
        ? attendanceData["attendanceDate"]
        : "";

      data["schoolId"] = attendanceData["schoolId"]
        ? attendanceData["schoolId"]
        : "";

      this.createAttendance(request, data);
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
    var axios = require("axios");
    var data: any;
    if (userId) {
      data = {
        query: `query AttendanceFilter($fromDate:date,$toDate:date,$userId:Int!) {
        attendance(where: {date: {_gte: $fromDate}, _and: {date: {_lte: $toDate}, student_id: {_eq: $userId}}}) {
                id
                date
                created
                is_present
                student_id
                taken_by_school_id
                temperature
                updated
        }
      }`,
        variables: { fromDate: fromDate, toDate: toDate, userId: userId },
      };
    } else {
      data = {
        query: `query AttendanceFilter($fromDate:date,$toDate:date) {
      attendance(where: {date: {_gte: $fromDate}, _and: {date: {_lte: $toDate}}}) {
              id
              date
              created
              is_present
              student_id
              taken_by_school_id
              temperature
              updated
      }
    }`,
        variables: { fromDate: fromDate, toDate: toDate },
      };
    }

    var config = {
      method: "post",
      url: this.baseURL,
      headers: {
        "x-hasura-admin-secret": this.adminSecret,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const responseData = await axios(config);

    const response = responseData.data.data.attendance;

    const attendanceData = response.map((item: any) => {
      if (item.is_present === true) {
        item.is_present = "Present";
      }
      if (item.is_present === false) {
        item.is_present = "Absent";
      }
      return item;
    });

    const mappedResponse = await this.mappedResponse(attendanceData);

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: mappedResponse,
    });
  }
  public async studentAttendanceByGroup(
    date: string,
    userId: string,
    request: any
  ) {}

  studentAttendanceByUserId(date: string, userId: string, request: any) {}
  userSegment(
    groupId: string,
    attendance: string,
    date: string,
    request: any
  ) {}

  public async mappedResponse(result: any) {
    const attendanceResponse = result.map((item: any) => {
      const attendanceMapping = {
        attendanceId: item?.id ? `${item.id}` : "",
        schoolId: item?.taken_by_school_id ? item.taken_by_school_id : "",
        userId: item?.student_id ? `${item.student_id}` : "",
        attendanceDate: item?.date ? `${item.date}` : "",
        attendance: item.is_present,
        metaData: item?.temperature,
        createdAt: item?.created ? `${item.created}` : "",
        updatedAt: item?.updated ? `${item.updated}` : "",
      };

      return new AttendanceDto(attendanceMapping);
    });

    return attendanceResponse;
  }
}
