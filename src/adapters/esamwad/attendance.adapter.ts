import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { IServicelocator } from "../attendanceservicelocator";
import { AttendanceDto } from "src/attendance/dto/attendance.dto";
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

    const mapping = {
      attendanceId: response[0].id,
      schoolId: response[0].taken_by_school_id,
      userId: response[0].student_id,
      attendanceDate: response[0].date,
      attendance: response[0].is_present,
      metadata: response[0].temperature,
    };

    const responsedata = response.map((item: any) => mapping);
    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
  }

  public async getAttendanceByLimit(limit: string, request: any) {
    var axios = require("axios");
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

    const mapping = {
      attendanceId: response[0].id,
      schoolId: response[0].taken_by_school_id,
      userId: response[0].student_id,
      attendanceDate: response[0].date,
      attendance: response[0].is_present,
      metadata: response[0].temperature,
    };

    const responsedata = response.map((item: any) => mapping);
    console.log(response);

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: responsedata,
    });
  }

  public async createAttendance(request: any, attendanceDto: AttendanceDto) {
    var axios = require("axios");
    var checkAttendance = {
      query: `query getAttendance($id:Int!) {
        attendance(where: {id: {_eq: $id}}) {
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
        id: attendanceDto.userId,
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
    console.log("139", attendanceResponse);

    let isPresent: any;
    if (attendanceDto.attendance === "Present") {
      isPresent = "true";
    } else {
      isPresent = "false";
    }

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

    return new SuccessResponse({
      statusCode: 200,
      message: "ok.",
      data: response,
    });
  }

  // public async multipleAttendance(request: any, attendanceData: [Object]) {
  //   let attendeeData = attendanceData["attendanceData"];

  //   attendeeData.forEach((data: any) => {
  //     data["attendanceDate"] = attendanceData["attendanceDate"]
  //       ? attendanceData["attendanceDate"]
  //       : "";

  //     data["schoolId"] = attendanceData["schoolId"]
  //       ? attendanceData["schoolId"]
  //       : "";

  //     let attendanceDate = data.attendanceDate;
  //     let attendance = data.attendance;
  //     let userId = data.userId;
  //     let schoolId = data.schoolId;
  //     let temperature = data.temperature;

  //     this.createAttendance(
  //       attendanceDate,
  //       attendance,
  //       userId,
  //       schoolId,
  //       temperature
  //     );
  //   });
  // }
}