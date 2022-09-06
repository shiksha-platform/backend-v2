import { UserSearchDto } from "src/user/dto/user-search.dto";
import { UserDto } from "src/user/dto/user.dto";

export interface IServicelocator {
  getUser(id: any, request: any);
  getUserByAuth(request);
  createUser(request: any, teacherDto: UserDto);
  updateUser(id: string, request: any, teacherDto: UserDto);
  searchUser(request: any, teacherSearchDto: UserSearchDto);
  teacherSegment(schoolId: string, templateId: string, request: any);
}
