import { AdminFormSearchDto } from "src/adminForm/dto/adminForm-search.dto";
import { AdminFormDto } from "src/adminForm/dto/adminForm.dto";

export interface IServicelocator {
  getAdminForm(adminFormId: string, request: any);
  createAdminForm(request: any, adminFormDto: AdminFormDto);
  updateAdminForm(
    adminFormId: string,
    request: any,
    adminFormDto: AdminFormDto
  );
  searchAdminForm(request: any, adminFormSearchDto: AdminFormSearchDto);
}
