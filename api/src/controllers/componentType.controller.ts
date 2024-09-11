import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ComponentService } from '../services/component.service';
import { ComponentTypeService } from '../services/componentType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { ComponentType as ComponentTypeModel } from '@prisma/client';

@Controller('componentTypes')
export class ComponentTypeController {
  constructor(
    private readonly componentService: ComponentService,
    private readonly componentTypeService: ComponentTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
  ) {}

  @Get('/:id')
  async getComponentTypeById(
    @Param('id') id: string,
  ): Promise<ComponentTypeModel> {
    return this.componentTypeService.componentType({ id: Number(id) });
  }

  @Get('/')
  async getComponentTypes(): Promise<ComponentTypeModel[]> {
    return this.componentTypeService.componentTypes({
      orderBy: {
        order: 'asc',
      },
    });
  }

  // @POST ComponentType
  @Post('create')
  async create(
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

  @Post('update')
  async update(
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

  @Post('delete')
  async delete(
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
