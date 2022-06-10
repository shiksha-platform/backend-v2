import { Test, TestingModule } from "@nestjs/testing";
import { FormschemaController } from "./formschema.controller";

describe("FormschemaController", () => {
  let controller: FormschemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormschemaController],
    }).compile();

    controller = module.get<FormschemaController>(FormschemaController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
