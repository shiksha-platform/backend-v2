import { Test, TestingModule } from "@nestjs/testing";
import { ConfigFormController } from "./configform.controller";

describe("ConfigFormController", () => {
  let controller: ConfigFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigFormController],
    }).compile();

    controller = module.get<ConfigFormController>(ConfigFormController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
