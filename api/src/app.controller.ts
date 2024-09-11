import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ComponentService } from './services/component.service';
import { ComponentTypeService } from './services/componentType.service';
import { SpecificationService } from './services/specification.service';
import { SpecificationTypeService } from './services/specificationType.service';
import {
  ComponentType as ComponentTypeModel,
  SpecificationType as SpecificationTypeModel,
  Specification as SpecificationModel,
} from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly componentService: ComponentService,
    private readonly componentTypeService: ComponentTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
  ) {}
}
