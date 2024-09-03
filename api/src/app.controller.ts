import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ComponentService } from './component.service';
import { ComponentTypeService } from './componentType.service';
import { SpecificationService } from './specification.service';
import { SpecificationTypeService } from './specificationType.service';
import {
  Component as ComponentModel,
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

  @Get('componentType/:id')
  async getComponentTypeById(
    @Param('id') id: string,
  ): Promise<ComponentTypeModel> {
    return this.componentTypeService.componentType({ id: Number(id) });
  }

  @Get('componentTypes/')
  async getComponentTypes(): Promise<ComponentTypeModel[]> {
    return this.componentTypeService.componentTypes({});
  }

  @Get('component/:id')
  async getComponentById(@Param('id') id: string): Promise<ComponentModel> {
    return this.componentService.component({ id: Number(id) });
  }

  @Get('componentsByType/:typeId')
  async getComponentsByType(
    @Param('typeId') typeId: string,
  ): Promise<ComponentModel[]> {
    return this.componentService.components({
      where: {
        typeId: Number(typeId),
      },
    });
  }

  @Get('specificationType/:id')
  async getSpecificationTypeById(
    @Param('id') id: string,
  ): Promise<SpecificationTypeModel> {
    return this.specificationTypeService.specificationType({ id: Number(id) });
  }

  @Get('specificationTypesByComponentType/:componentTypeId')
  async getSpecificationsTypesByComponentType(
    @Param('componentTypeId') componentTypeId: string,
  ): Promise<SpecificationTypeModel[]> {
    return this.specificationTypeService.specificationTypes({
      where: {
        componentTypeId: Number(componentTypeId),
      },
    });
  }

  @Get('specification/:id')
  async getSpecificationById(
    @Param('id') id: string,
  ): Promise<SpecificationModel> {
    return this.specificationService.specification({ id: Number(id) });
  }

  @Get('specificationsByComponent/:componentId')
  async getSpecificationsByComponent(
    @Param('componentId') componentId: string,
  ): Promise<SpecificationModel[]> {
    return this.specificationService.specifications({
      where: {
        componentId: Number(componentId),
      },
    });
  }

  @Get('specificationsBySpecificationType/:specificationTypeId')
  async getSpecificationsBySpecificationType(
    @Param('specificationTypeId') specificationTypeId: string,
  ): Promise<SpecificationModel[]> {
    return this.specificationService.specifications({
      where: {
        specificationTypeId: Number(specificationTypeId),
      },
    });
  }

  @Post('createComponentType')
  async createComponentType(
    @Body()
    componentTypeData: {
      name: string;
      description: string;
      order?: number;
    },
  ): Promise<ComponentTypeModel> {
    const { name, description, order } = componentTypeData;
    return this.componentTypeService.createComponentType({
      name,
      description,
      order,
    });
  }

  @Post('updateComponentType')
  async updateComponentType(
    @Body()
    componentTypeData: {
      id: number;
      name: string;
      description?: string;
      order?: number;
    },
  ): Promise<ComponentTypeModel> {
    const { id, name, description, order } = componentTypeData;
    return this.componentTypeService.updateComponentType({
      where: { id },
      data: { name, description, order },
    });
  }

  @Post('deleteComponentType')
  async deleteComponentType(
    @Body()
    componentTypeData: {
      id: number;
    },
  ): Promise<ComponentTypeModel> {
    const { id } = componentTypeData;
    return this.componentTypeService.deleteComponentType({
      id,
    });
  }
}
