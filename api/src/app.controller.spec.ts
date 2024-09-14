import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { ComponentService } from './services/product.service';
import { ComponentTypeService } from './services/productType.service';
import { SpecificationTypeService } from './services/specificationType.service';
import { SpecificationService } from './services/specification.service';
import { FamilyService } from './services/family.service';
import { ProductRangeService } from './services/productRange.service';

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
        FamilyService,
        ProductRangeService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {});
});
