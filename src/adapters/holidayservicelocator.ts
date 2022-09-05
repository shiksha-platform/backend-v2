import { HolidaySearchDto } from "src/holiday/dto/holiday-search.dto";
import { HolidayDto } from "src/holiday/dto/holiday.dto";

export interface IServicelocator {
  getHoliday(holidayId: string, request: any);
  createHoliday(request: any, holidayDto: HolidayDto);
  updateHoliday(holidayId: string, request: any, holidayDto: HolidayDto);
  searchHoliday(request: any, holidaySearchDto: HolidaySearchDto);
  holidayFilter(fromDate: string, toDate: string, request: any);
}
