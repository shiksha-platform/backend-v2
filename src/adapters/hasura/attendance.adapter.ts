import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";

@Injectable()
export class AttendanceHasuraService {
  constructor(private httpService: HttpService) {}
  baseURL = process.env.HASURAURL;
  adminSecret = process.env.ADMINSECRET;
  public async getHasuraAttendance(limit: string, request: any) {
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

  public async getAttendanceByStudentId(studentId: string, request: any) {
    console.log(studentId);

    var axios = require("axios");
    var data = {
      query: `query getAttendance($student_id:Int!) {
        attendance(where: {student_id: {_eq: $student_id}}) {
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
        student_id: studentId,
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

  public async createAttendance(
    date: string,
    isPresent: string,
    studentId: string,
    takenBySchoolId: string,
    temperature: string
    //request: any
  ) {
    var axios = require("axios");
    var data = {
      query: `mutation CreateAttendance($date: date, $is_present: Boolean = true, $student_id: Int, $taken_by_school_id: Int, $temperature: float8) {
        insert_attendance_one(object: {date: $date, is_present: $is_present, student_id: $student_id, taken_by_school_id: $taken_by_school_id, temperature: $temperature}){
          id,
          updated
        }
      }`,
      variables: {
        date: date,
        is_present: isPresent,
        student_id: studentId,
        taken_by_school_id: takenBySchoolId,
        temperature: temperature,
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

  public async multipleAttendance(request: any, attendanceData: [Object]) {
    let attendeeData = attendanceData["attendanceData"];
    console.log("167", attendanceData);

    attendeeData.forEach((data) => {
      data["date"] = attendanceData["date"] ? attendanceData["date"] : "";

      data["takenBySchoolId"] = attendanceData["takenBySchoolId"]
        ? attendanceData["takenBySchoolId"]
        : "";

      let date = data.date;
      let isPresent = data.isPresent;
      let studentId = data.studentId;
      let takenBySchoolId = data.takenBySchoolId;
      let temperature = data.temperature;

      this.createAttendance(
        date,
        isPresent,
        studentId,
        takenBySchoolId,
        temperature
      );
    });
  }
}
