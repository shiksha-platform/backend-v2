import { StudentSearchDto } from "src/student/dto/student-search.dto";
import { StudentDto } from "src/student/dto/student.dto";

export interface IServicelocator {
  getStudent(studentId: any, request: any);
  createStudent(request: any, studentDto: StudentDto);
  updateStudent(id: string, request: any, studentDto: StudentDto);
  searchStudent(request: any, studentSearchDto: StudentSearchDto);
}
