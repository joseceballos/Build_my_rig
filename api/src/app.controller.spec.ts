import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ComponentService } from './component.service';
import { ComponentTypeService } from './componentType.service';
import { SpecificationTypeService } from './specificationType.service';
import { SpecificationService } from './specification.service';

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
