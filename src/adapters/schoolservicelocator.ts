import { SchoolSearchDto } from "src/school/dto/school-search.dto";

export interface IServicelocator {
  searchSchool(request: any, schoolSearchDto: SchoolSearchDto);
}
