import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductTypeService } from '../services/productType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { Specification as SpecificationModel } from '@prisma/client';

@Controller('specifications')
export class SpecificationController {
  constructor(
    private readonly productService: ProductService,
    private readonly productTypeService: ProductTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
  ) {}

  @Get('/:id')
  async getSpecificationById(
    @Param('id') id: string,
  ): Promise<SpecificationModel> {
    return this.specificationService.specification({ id: Number(id) });
  }

  @Get('bySpecificationType/:specificationTypeId')
  async getSpecificationsBySpecificationType(
    @Param('specificationTypeId') specificationTypeId: string,
  ): Promise<SpecificationModel[]> {
    return this.specificationService.specifications({
      where: {
        specificationTypeId: Number(specificationTypeId),
      },
    });
  }

  // @POST SpecificationType
  @Post('create')
  async create(
    @Body()
    specificationData: {
      value: string;
      description?: string;
      specificationTypeId?: number;
    },
  ): Promise<SpecificationModel> {
    const { value, description, specificationTypeId } = specificationData;
    return this.specificationService.createSpecification({
      value,
      description,
      specificationType: {
        connect: { id: specificationTypeId },
      },
    });
  }

  @Post('update')
  async update(
    @Body()
    specificationData: {
      id: number;
      value: string;
      description?: string;
    },
  ): Promise<SpecificationModel> {
    const { id, value, description } = specificationData;
    return this.specificationService.updateSpecification({
      where: {
        id,
      },
      data: {
        value,
        description,
      },
    });
  }

  @Post('delete')
  async delete(
    @Body()
    specificationData: {
      id: number;
    },
  ): Promise<SpecificationModel> {
    const { id } = specificationData;
    return this.specificationService.deleteSpecification({
      id,
    });
  }
}
