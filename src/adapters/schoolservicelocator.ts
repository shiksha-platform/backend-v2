import { SchoolSearchDto } from "src/school/dto/school-search.dto";
import { SchoolDto } from "src/school/dto/school.dto";

export interface IServicelocator {
  searchSchool(request: any, schoolSearchDto: SchoolSearchDto);
  createSchool(request: any, schoolDto: SchoolDto);
  updateSchool(id: string, request: any, schoolDto: SchoolDto);
  getSchool(schoolId: any, request: any);
}
