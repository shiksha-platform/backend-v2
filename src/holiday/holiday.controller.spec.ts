import { Test, TestingModule } from "@nestjs/testing";
import { HolidayController } from "./holiday.controller";

describe("HolidayController", () => {
  let controller: HolidayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HolidayController],
    }).compile();

    controller = module.get<HolidayController>(HolidayController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
