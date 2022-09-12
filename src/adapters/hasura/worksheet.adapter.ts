import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { WorksheetDto } from "src/worksheet/dto/worksheet.dto";
import { WorksheetSearchDto } from "src/worksheet/dto/worksheet-search.dto";
import { StudentDto } from "src/student/dto/student.dto";
import { ErrorResponse } from "src/error-response";

@Injectable()
export class WorksheetService {
  constructor(private httpService: HttpService) {}
  questionurl = process.env.DIKSHADEVBASEAPIURL;
  templateurl = process.env.TEMPLATERURL;
  url = `${process.env.BASEAPIURL}`;
  public async createWorksheet(request: any, worksheetDto: WorksheetDto) {
    var axios = require("axios");
    const worksheetSchema = new WorksheetDto(worksheetDto);
    let query = "";
    Object.keys(worksheetDto).forEach((e) => {
      if (
        worksheetDto[e] &&
        worksheetDto[e] != "" &&
        Object.keys(worksheetSchema).includes(e)
      ) {
        if (Array.isArray(worksheetDto[e])) {
          query += `${e}: ${JSON.stringify(worksheetDto[e])}, `;
        } else {
          query += `${e}: "${worksheetDto[e]}", `;
        }
      }
    });

    var data = {
      query: `mutation CreateWorksheet {
        insert_worksheet_one(object: {${query}}) {
          worksheetId
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

    const result = response.data.data.insert_worksheet_one;

    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: result,
    });
  }

  public async updateWorksheet(
    id: string,
    request: any,
    worksheetDto: WorksheetDto
  ) {
    var axios = require("axios");
    const worksheetSchema = new WorksheetDto(worksheetDto);
    let query = "";
    Object.keys(worksheetDto).forEach((e) => {
      if (
        worksheetDto[e] &&
        worksheetDto[e] != "" &&
        Object.keys(worksheetSchema).includes(e)
      ) {
        if (Array.isArray(worksheetDto[e])) {
          query += `${e}: ${JSON.stringify(worksheetDto[e])}, `;
        } else {
          query += `${e}: ${worksheetDto[e]}, `;
        }
      }
    });

    var data = {
      query: `mutation UpdateWorksheet($worksheetId:uuid) {
          update_worksheet(where: {worksheetId: {_eq: $worksheetId}}, _set: {${query}}) {
          affected_rows
        }
}`,
      variables: {
        worksheetId: id,
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

  public async getWorksheet(worksheetId: any, request: any) {
    var axios = require("axios");

    var data = {
      query: `query GetWorksheet($worksheetId:uuid!) {
        worksheet_by_pk(worksheetId:  $worksheetId) {
          created_at
          feedback
          criteria
          grade
          hints
          instructions
          level
          name
          navigationMode
          outcomeDeclaration
          outcomeProcessing
          purpose
          questionSetType
          questionSets
          questions
          qumlVersion
          showHints
          source
          state
          subject
          timeLimits
          topic
          updated_at
          usedFor
          visibility
          worksheetId
        }
      }
      `,
      variables: { worksheetId: worksheetId },
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
    let result = [response.data.data.worksheet_by_pk];
    const worksheetResponse = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: worksheetResponse[0],
    });
  }

  public async searchWorksheet(
    worksheetSearchDto: WorksheetSearchDto,
    request: any
  ) {
    var axios = require("axios");

    let offset = 0;
    if (worksheetSearchDto.page > 1) {
      offset =
        parseInt(worksheetSearchDto.limit) * (worksheetSearchDto.page - 1);
    }

    let filters = worksheetSearchDto.filters;

    Object.keys(worksheetSearchDto.filters).forEach((item) => {
      Object.keys(worksheetSearchDto.filters[item]).forEach((e) => {
        if (!e.startsWith("_")) {
          filters[item][`_${e}`] = filters[item][e];
          delete filters[item][e];
        }
      });
    });

    var data = {
      query: `query SearchWorksheet($filters:worksheet_bool_exp,$limit:Int, $offset:Int) {
            worksheet(where:$filters, limit: $limit, offset: $offset,) {
              created_at
              feedback
              criteria
              grade
              hints
              instructions
              level
              name
              navigationMode
              outcomeDeclaration
              outcomeProcessing
              purpose
              questionSetType
              questionSets
              questions
              qumlVersion
              showHints
              source
              state
              subject
              timeLimits
              topic
              updated_at
              usedFor
              visibility
              worksheetId
            }
          }`,
      variables: {
        limit: parseInt(worksheetSearchDto.limit),
        offset: offset,
        filters: worksheetSearchDto.filters,
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

    let result = response.data.data.worksheet;
    const worksheetResponse = await this.mappedResponse(result);
    return new SuccessResponse({
      statusCode: 200,
      message: "Ok.",
      data: worksheetResponse,
    });
  }

  public async downloadWorksheet(
    worksheetId: any,
    templateId: any,
    request: any
  ) {
    var axios = require("axios");
    var template_id = parseInt(templateId);

    const templateDetail = await axios.get(
      `${this.templateurl}${template_id}`,
      {
        headers: {
          Authorization: request.headers.authorization,
        },
      }
    );

    const templateData = templateDetail.data;
    var templateTags = templateData.tag;

    var worksheetData = {
      query: `query GetWorksheet($worksheetId:uuid) {
        worksheet(where: {worksheetId: {_eq: $worksheetId}}) {
          created_at
          feedback
          criteria
          grade
          hints
          instructions
          level
          name
          navigationMode
          outcomeDeclaration
          outcomeProcessing
          purpose
          questionSetType
          questionSets
          questions
          qumlVersion
          showHints
          source
          state
          subject
          timeLimits
          topic
          updated_at
          usedFor
          visibility
          worksheetId
        }
      }
      `,
      variables: { worksheetId: worksheetId },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: worksheetData,
    };

    const response = await axios(config);

    let resData = response.data.data.worksheet[0];

    let questionIds = resData.questions;

    let questionsArray = [];

    for (let value of questionIds) {
      let qData = {
        method: "get",
        url: `${this.questionurl}/question/v1/read/${value}?fields=body`,
      };
      const response = await axios(qData);
      const data = response?.data;
      const final = data.result.question;

      if (templateTags.includes("with_answers")) {
        questionsArray.push(
          "<li>" + final.body + "<br>Ans - <hr><hr><hr></li>"
        );
      } else {
        questionsArray.push("<li>" + final.body + "</li>");
      }
    }

    var data = {
      config_id: 1,
      data: {
        title: resData.name,
        grade: resData.grade,
        subject: resData.subject,
        questions: questionsArray,
      },
      template_id: template_id,
    };

    const pdf = await axios.post(
      `http://68.183.94.187:8000/generate/?plugin=pdf`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const pdfUrl = pdf.data;
    return new SuccessResponse({
      statusCode: 200,
      message: "ok",
      data: pdfUrl,
    });
  }

  public async mappedResponse(result: any) {
    const worksheetResponse = result.map((item: any) => {
      const worksheetMapping = {
        worksheetId: item?.worksheetId ? `${item.worksheetId}` : "",
        name: item?.name ? `${item.name}` : "",
        state: item?.state ? `${item.state}` : "",
        subject: item?.subject ? `${item.subject}` : "",
        grade: item?.grade ? `${item.grade}` : "",
        level: item?.level ? `${item.level}` : "",
        instructions: item?.instructions ? `${item.instructions}` : "",
        feedback: item?.feedback ? `${item.feedback}` : "",
        hints: item?.hints ? `${item.hints}` : "",
        navigationMode: item?.navigationMode ? `${item.navigationMode}` : "",
        timeLimits: item?.timeLimits ? `${item.timeLimits}` : "",
        showHints: item?.showHints ? item.showHints : "",
        questions: item?.questions ? item.questions : "",
        questionSets: item?.questionSets ? `${item.questionSets}` : "",
        outcomeDeclaration: item?.outcomeDeclaration
          ? `${item.outcomeDeclaration}`
          : "",
        outcomeProcessing: item?.outcomeProcessing
          ? `${item.outcomeProcessing}`
          : "",
        questionSetType: item?.questionSetType ? `${item.questionSetType}` : "",
        criteria: item?.criteria ? `${item.criteria}` : "",
        usedFor: item?.usedFor ? `${item.usedFor}` : "",
        purpose: item?.purpose ? `${item.purpose}` : "",
        visibility: item?.visibility ? `${item.visibility}` : "",
        qumlVersion: item?.qumlVersion ? `${item.qumlVersion}` : "",
        topic: item?.topic ? item.topic : "",
        source: item?.source ? `${item.source}` : "",
        createdAt: item?.created_at ? `${item.created_at}` : "",
        updatedAt: item?.updated_at ? `${item.updated_at}` : "",
      };
      return new WorksheetDto(worksheetMapping);
    });

    return worksheetResponse;
  }

  public async studentSegment(
    groupId: string,
    templateId: string,
    worksheetId: string,
    request: any
  ) {
    let axios = require("axios");
    let userData = [];
    let response: any;
    var findMember = {
      query: `query GetGroupMembership($groupId:uuid) {
       groupmembership(where: {groupId: {_eq: $groupId},role:{_eq:"Student"}}) {
        userId
        groupId
        }
      }`,
      variables: {
        groupId: groupId,
      },
    };

    var getMemberData = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: findMember,
    };

    response = await axios(getMemberData);
    let result = response.data.data.groupmembership;

    var template_id = parseInt(templateId);

    const templateDetail = await axios.get(`${this.templateurl}${template_id}`);

    const templateData = templateDetail.data;
    var templateTags = templateData.tag;

    var worksheetData = {
      query: `query GetWorksheet($worksheetId:uuid) {
        worksheet(where: {worksheetId: {_eq: $worksheetId}}) {
          created_at
          feedback
          criteria
          grade
          hints
          instructions
          level
          name
          navigationMode
          outcomeDeclaration
          outcomeProcessing
          purpose
          questionSetType
          questionSets
          questions
          qumlVersion
          showHints
          source
          state
          subject
          timeLimits
          topic
          updated_at
          usedFor
          visibility
          worksheetId
        }
      }
      `,
      variables: { worksheetId: worksheetId },
    };

    var config = {
      method: "post",
      url: process.env.REGISTRYHASURA,
      headers: {
        "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
        "Content-Type": "application/json",
      },
      data: worksheetData,
    };

    response = await axios(config);

    let resData = response.data.data.worksheet[0];

    let questionIds = resData.questions;

    let questionsArray = [];

    for (let value of questionIds) {
      let qData = {
        method: "get",
        url: `${this.questionurl}/question/v1/read/${value}?fields=body`,
      };
      const response = await axios(qData);
      const data = response?.data;
      const final = data.result.question;

      if (templateTags.includes("with_answers")) {
        questionsArray.push(
          "<li>" + final.body + "<br>Ans - <hr><hr><hr></li>"
        );
      } else {
        questionsArray.push("<li>" + final.body + "</li>");
      }
    }

    var data = {
      config_id: 1,
      data: {
        title: resData.name,
        grade: resData.grade,
        subject: resData.subject,
        questions: questionsArray,
      },
      template_id: template_id,
    };

    const pdf = await axios.post(
      `http://68.183.94.187:8000/generate/?plugin=pdf`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const worksheetLink = pdf.data;

    if (Array.isArray(result)) {
      let userIds = result.map((e: any) => {
        return e.userId;
      });

      for (let value of userIds) {
        let studentSearch = {
          method: "get",
          url: `${this.url}/Student/${value}`,
        };

        response = await axios(studentSearch);
        let responseData = await this.StudentMappedResponse([response.data]);
        let studentData = responseData[0];

        var groupData = {
          query: `query GetGroup($groupId:uuid!) {
        group_by_pk(groupId: $groupId) {
        groupId
        schoolId
        teacherId
      }
    }`,
          variables: {
            groupId: studentData.groupId,
          },
        };

        var groupCall = {
          method: "post",
          url: process.env.REGISTRYHASURA,
          headers: {
            "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
            "Content-Type": "application/json",
          },
          data: groupData,
        };

        response = await axios(groupCall);
        let result = response?.data?.data?.group_by_pk;

        const teacherData = await axios.get(
          `${this.url}/User/${result.teacherId}`
        );

        var getSchool = {
          query: `query GetSchool($schoolId:uuid!) {
        school_by_pk(schoolId: $schoolId) {
          schoolName
        
      }
    }`,
          variables: {
            schoolId: result.schoolId,
          },
        };

        var schoolCall = {
          method: "post",
          url: process.env.REGISTRYHASURA,
          headers: {
            "x-hasura-admin-secret": process.env.REGISTRYHASURAADMINSECRET,
            "Content-Type": "application/json",
          },
          data: getSchool,
        };

        response = await axios(schoolCall);

        let schoolData = response?.data?.data?.school_by_pk;

        const studentDto = {
          id: studentData.osid,
          name: studentData?.firstName + " " + studentData?.lastName,
          phoneNo: studentData.studentPhoneNumber,
          teacherName: teacherData.data.firstName + " " + teacherData.lastName,
          schoolName: schoolData.schoolName,
          worksheetLink: worksheetLink.data,
          topic: resData.name,
          subject: resData.subject,
        };

        userData.push(studentDto);
      }

      return new SuccessResponse({
        data: userData,
      });
    } else {
      return new ErrorResponse({
        errorCode: response.data.errors[0].extensions,
        errorMessage: response.data.errors[0].message,
      });
    }
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
