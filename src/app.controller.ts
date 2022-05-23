import { Controller, Get, Param, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("files/:fileName")
  seeUploadedFile(@Param("fileName") fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: "./uploads" });
  }
}
