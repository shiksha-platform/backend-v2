import { Test, TestingModule } from '@nestjs/testing';
import { ContentPagesController } from './contentPages.controller';

describe('ContentPagesController', () => {
  let controller: ContentPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentPagesController],
    }).compile();

    controller = module.get<ContentPagesController>(ContentPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
