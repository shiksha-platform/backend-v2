import { StudentSearchDto } from "src/student/dto/student-search.dto";

export interface IServicelocator {
  getStudent(studentId, request);
  searchStudent(request: any, studentSearchDto: StudentSearchDto);
}
