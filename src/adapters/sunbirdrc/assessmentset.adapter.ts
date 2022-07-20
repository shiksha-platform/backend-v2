import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { catchError, map } from "rxjs";
import { SuccessResponse } from "src/success-response";
import { ErrorResponse } from "src/error-response";
import { AssessmentsetDto } from "src/assessmentset/dto/assessmentset.dto";
import { AssessmentSetSearchDto } from "src/assessmentset/dto/assessmentset-search-dto";
@Injectable()
export class AssessmentsetService {
  constructor(private httpService: HttpService) {}
  assessmentsetURL = `${process.env.BASEAPIURL}/Assessmentset`;

  public async createAssessmentSet(
    request: any,
    assessmentsetDto: AssessmentsetDto
  ) {
    return this.httpService
      .post(`${this.assessmentsetURL}`, assessmentsetDto, {
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
  public async getAssessmentset(assessmentsetId: any, request: any) {
    return this.httpService
      .get(`${this.assessmentsetURL}/${assessmentsetId}`, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => {
          const data = axiosResponse.data;
          const assessmentDto = new AssessmentsetDto(data);
          return new SuccessResponse({
            statusCode: 200,
            message: "ok.",
            data: assessmentDto,
          });
        })
      );
  }

  public async searchAssessmentset(
    request: any,
    assessmentSearchDto: AssessmentSetSearchDto
  ) {
    return this.httpService
      .post(`${this.assessmentsetURL}/search`, assessmentSearchDto, {
        headers: {
          Authorization: request.headers.authorization,
        },
      })
      .pipe(
        map((response) => {
          const responsedata = response.data.map(
            (item: any) => new AssessmentsetDto(item)
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
