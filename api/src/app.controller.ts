import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductTypeService } from './services/productType.service';
import { SpecificationService } from './services/specification.service';
import { SpecificationTypeService } from './services/specificationType.service';
import {
  ProductType as ProductTypeModel,
  SpecificationType as SpecificationTypeModel,
  Specification as SpecificationModel,
} from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly productService: ProductService,
    private readonly productTypeService: ProductTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
  ) {}
}
