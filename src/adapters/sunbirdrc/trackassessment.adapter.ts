import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { catchError, map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { TrackAssessmentDto } from "src/trackAssessment/dto/trackassessment.dto";
import { ErrorResponse } from "src/error-response";
import { AssessmentSearchDto } from "src/trackAssessment/dto/assessment-search-dto";
@Injectable()
export class AssessmentService {
  constructor(private httpService: HttpService) {}
  assessmentURL = `${process.env.BASEAPIURL}/Trackassessment`;
  assessmentsetURL = `${process.env.BASEAPIURL}/Assessmentset`;
  public async getAssessment(assessmentId: any, request: any) {
    return this.httpService
      .get(`${this.assessmentURL}/${assessmentId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const assessmentDto = new TrackAssessmentDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: assessmentDto,
          });
        })
      );
  }
  public async createAssessment(
    request: any,
    assessmentDto: TrackAssessmentDto
  ) {
    let answer = JSON.stringify(assessmentDto.answersheet);
    var jsonObj = JSON.parse(answer);
    let params = JSON.parse(jsonObj);

    let sum = 0;

    params.children.map((e: any) => {
      sum += e.score;
      return sum;
    });
    assessmentDto.score = sum.toString();
    return this.httpService
      .post(`${this.assessmentURL}`, assessmentDto, {
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

  public async searchAssessment(
    request: any,
    assessmentSearchDto: AssessmentSearchDto
  ) {
    return this.httpService
      .post(`${this.assessmentURL}/search`, assessmentSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new TrackAssessmentDto(item)
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
}
