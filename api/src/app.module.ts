import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { ProductService } from './services/product.service';
import { ProductTypeService } from './services/productType.service';
import { SpecificationTypeService } from './services/specificationType.service';
import { SpecificationService } from './services/specification.service';
import { ProductController } from './controllers/product.controller';
import { ProductTypeController } from './controllers/productType.controller';
import { SpecificationController } from './controllers/specification.controller';
import { SpecificationTypeController } from './controllers/specificationType.controller';
import { FamilyController } from './controllers/Family.controller';
import { ProductRangeController } from './controllers/ProductRange.controller';
import { ProductSpecificationService } from './services/productSpecification.service';
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
    ProductController,
    ProductTypeController,
    FamilyController,
    ProductRangeController,
    SpecificationController,
    SpecificationTypeController,
  ],
  providers: [
    ProductService,
    ProductSpecificationService,
    ProductTypeService,
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
