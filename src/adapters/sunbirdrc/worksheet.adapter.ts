import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { SuccessResponse } from "src/success-response";
import { WorksheetDto } from "src/worksheet/dto/worksheet.dto";
import { AxiosResponse } from "axios";
import { map, catchError } from "rxjs";
import { ErrorResponse } from "src/error-response";
import { WorksheetSearchDto } from "src/worksheet/dto/worksheet-search.dto";
import { parse } from "path";

@Injectable()
export class WorksheetService {
  constructor(private httpService: HttpService) {}
  url = `${process.env.BASEAPIURL}/Worksheet`;
  questionurl = process.env.DIKSHADEVBASEAPIURL;
  templateurl = process.env.TEMPLATERURL;

  public async createWorksheet(request: any, worksheetDto: WorksheetDto) {
    return this.httpService
      .post(`${this.url}`, worksheetDto, {
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

  public async updateWorksheet(
    id: string,
    request: any,
    worksheetDto: WorksheetDto
  ) {
    var axios = require("axios");
    var data = worksheetDto;

    var config = {
      method: "put",
      url: `${this.url}/${id}`,
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

  public async getWorksheet(worksheetId: any, request: any) {
    return this.httpService
      .get(`${this.url}/${worksheetId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          let data = axiosResponse.data;

          const worksheetDto = new WorksheetDto(data);

          return new SuccessResponse({
            statusCode: 200,
            message: "ok",
            data: worksheetDto,
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
  public async searchWorksheet(
    request: any,
    worksheetSearchDto: WorksheetSearchDto
  ) {
    return this.httpService
      .post(`${this.url}/search`, worksheetSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new WorksheetDto(item)
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

    const worksheetDetail = await axios.get(`${this.url}/${worksheetId}`, {
      headers: {
        Authorization: request.headers.authorization,
      },
    });

    const resData = worksheetDetail.data;

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

      const scoreResponse = {
        question: final.body,
      };
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
}
