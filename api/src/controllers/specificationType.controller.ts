import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ComponentService } from '../services/component.service';
import { ComponentTypeService } from '../services/componentType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { SpecificationType as SpecificationTypeModel } from '@prisma/client';

@Controller('specificationTypes')
export class SpecificationTypeController {
  constructor(
    private readonly componentService: ComponentService,
    private readonly componentTypeService: ComponentTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
  ) {}

  @Get('/:id')
  async getSpecificationTypeById(
    @Param('id') id: string,
  ): Promise<SpecificationTypeModel> {
    return this.specificationTypeService.specificationType({ id: Number(id) });
  }

  @Get('/')
  async getSpecificationTypes(): Promise<SpecificationTypeModel[]> {
    return this.specificationTypeService.specificationTypes({
      orderBy: {
        componentType: {
          order: 'asc',
        },
      },
    });
  }

  @Get('byComponentType/:componentTypeId')
  async getSpecificationTypesByComponentType(
    @Param('componentTypeId') componentTypeId: string,
  ): Promise<SpecificationTypeModel[]> {
    return this.specificationTypeService.specificationTypes({
      where: {
        componentTypeId: Number(componentTypeId),
      },
    });
  }

  // @POST SpecificationType
  @Post('create')
  async create(
    @Body()
    specificationTypeData: {
      name: string;
      description: string;
      valueType: string;
      filterType: string;
      componentTypeId?: number | undefined;
    },
  ): Promise<SpecificationTypeModel> {
    const { name, description, valueType, filterType, componentTypeId } =
      specificationTypeData;

    let data: {
      name: string;
      description: string;
      valueType: string;
      filterType: string;
      componentType?: undefined | { connect: { id: number } };
    };
    if (componentTypeId === undefined || componentTypeId === 0) {
      data = {
        name,
        description,
        valueType,
        filterType,
      };
    } else {
      data = {
        name,
        description,
        valueType,
        filterType,
        componentType: {
          connect: { id: componentTypeId },
        },
      };
    }
    return this.specificationTypeService.createSpecificationType({
      ...data,
    });
  }

  @Post('update')
  async update(
    @Body()
    specificationTypeData: {
      id: number;
      name: string;
      description: string;
      valueType: string;
      filterType: string;
      componentTypeId?: number | null;
    },
  ): Promise<SpecificationTypeModel> {
    const { id, name, description, valueType, filterType, componentTypeId } =
      specificationTypeData;
    const oldSpecificationType =
      await this.specificationTypeService.specificationType({ id });

    let componentTypeConnector;

    if (
      ((componentTypeId === undefined || componentTypeId === 0) &&
        oldSpecificationType.componentTypeId !== null) ||
      (componentTypeId !== undefined &&
        componentTypeId > 0 &&
        oldSpecificationType.componentTypeId !== null &&
        componentTypeId !== oldSpecificationType.componentTypeId)
    ) {
      componentTypeConnector = {
        disconnect: { id: oldSpecificationType.componentTypeId },
      };
      console.log(
        'componentTypeId: ',
        componentTypeId,
        ' oldSpecificationType: ',
        oldSpecificationType,
      );
    } else if (componentTypeId !== undefined && componentTypeId > 0) {
      componentTypeConnector = {
        connect: { id: componentTypeId },
      };
    }

    console.log(componentTypeConnector);

    return this.specificationTypeService.updateSpecificationType({
      where: { id },
      data: {
        name,
        description,
        valueType,
        filterType,
        componentType: componentTypeConnector,
      },
    });
  }

  @Post('delete')
  async delete(
    @Body()
    specificationTypeData: {
      id: number;
    },
  ): Promise<SpecificationTypeModel> {
    const { id } = specificationTypeData;
    return this.specificationTypeService.deleteSpecificationType({
      id,
    });
  }
}
