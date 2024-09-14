import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { ComponentService } from './services/component.service';
import { ComponentTypeService } from './services/componentType.service';
import { SpecificationTypeService } from './services/specificationType.service';
import { SpecificationService } from './services/specification.service';
import { ComponentController } from './controllers/component.controller';
import { ComponentTypeController } from './controllers/componentType.controller';
import { SpecificationController } from './controllers/specification.controller';
import { SpecificationTypeController } from './controllers/specificationType.controller';
import { FamilyController } from './controllers/Family.controller';
import { ProductRangeController } from './controllers/ProductRange.controller';
import { ComponentSpecificationService } from './services/componentSpecification.service';
import { FamilyService } from './services/family.service';
import { FamilySpecificationService } from './services/familySpecification.service';
import { FamilySpecificationTypeService } from './services/familySpecificationType.service';
import { ProductRangeService } from './services/productRange.service';
import { ProductRangePropertyService } from './services/productRangeProperties.service';
import { PropertyService } from './services/property.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    AppController,
    ComponentController,
    ComponentTypeController,
    FamilyController,
    ProductRangeController,
    SpecificationController,
    SpecificationTypeController,
  ],
  providers: [
    ComponentService,
    ComponentSpecificationService,
    ComponentTypeService,
    FamilyService,
    FamilySpecificationService,
    FamilySpecificationTypeService,
    ProductRangeService,
    ProductRangePropertyService,
    PropertyService,
    SpecificationTypeService,
    SpecificationService,
  ],
})
export class AppModule {}
