import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ComponentService } from './services/component.service';
import { ComponentTypeService } from './services/componentType.service';
import { SpecificationTypeService } from './services/specificationType.service';
import { SpecificationService } from './services/specification.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        ComponentService,
        ComponentTypeService,
        SpecificationTypeService,
        SpecificationService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {});
});
