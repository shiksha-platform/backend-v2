import { Injectable } from '@nestjs/common';
import { StudentInterface } from './interfaces/student.interface';
import {HttpService} from '@nestjs/axios'
import {AxiosResponse} from 'axios'
import {map, Observable} from 'rxjs'
import { response } from 'express';

@Injectable()
export class StudentService {
    private student: StudentInterface;

    constructor(private httpService: HttpService) {}

    getOne(id): Observable<AxiosResponse<StudentInterface>> {

        return this.httpService.get('https://dev-shiksha.uniteframework.io/registry/api/v1/Student/6764bd8f-a082-435a-be47-4b871baf42df')
        .pipe(
            map((axiosResponse: AxiosResponse) => {
                return axiosResponse.data;
              })
        );
    }
}