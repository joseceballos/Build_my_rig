import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductTypeService } from '../services/productType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { SpecificationType as SpecificationTypeModel } from '@prisma/client';

@Controller('specificationTypes')
export class SpecificationTypeController {
  constructor(
    private readonly productService: ProductService,
    private readonly productTypeService: ProductTypeService,
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
        productType: {
          order: 'asc',
        },
      },
    });
  }

  @Get('byProductType/:productTypeId')
  async getSpecificationTypesByProductType(
    @Param('productTypeId') productTypeId: string,
  ): Promise<SpecificationTypeModel[]> {
    return this.specificationTypeService.specificationTypes({
      where: {
        productTypeId: Number(productTypeId),
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
      productTypeId?: number | undefined;
    },
  ): Promise<SpecificationTypeModel> {
    const { name, description, valueType, filterType, productTypeId } =
      specificationTypeData;

    let data: {
      name: string;
      description: string;
      valueType: string;
      filterType: string;
      productType?: undefined | { connect: { id: number } };
    };
    if (productTypeId === undefined || productTypeId === 0) {
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
        productType: {
          connect: { id: productTypeId },
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
      productTypeId?: number | null;
    },
  ): Promise<SpecificationTypeModel> {
    const { id, name, description, valueType, filterType, productTypeId } =
      specificationTypeData;
    const oldSpecificationType =
      await this.specificationTypeService.specificationType({ id });

    let productTypeConnector;

    if (
      ((productTypeId === undefined || productTypeId === 0) &&
        oldSpecificationType.productTypeId !== null) ||
      (productTypeId !== undefined &&
        productTypeId > 0 &&
        oldSpecificationType.productTypeId !== null &&
        productTypeId !== oldSpecificationType.productTypeId)
    ) {
      productTypeConnector = {
        disconnect: { id: oldSpecificationType.productTypeId },
      };
      console.log(
        'productTypeId: ',
        productTypeId,
        ' oldSpecificationType: ',
        oldSpecificationType,
      );
    } else if (productTypeId !== undefined && productTypeId > 0) {
      productTypeConnector = {
        connect: { id: productTypeId },
      };
    }

    console.log(productTypeConnector);

    return this.specificationTypeService.updateSpecificationType({
      where: { id },
      data: {
        name,
        description,
        valueType,
        filterType,
        productType: productTypeConnector,
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
