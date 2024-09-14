import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductTypeService } from '../services/productType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { ProductType as ProductTypeModel } from '@prisma/client';

@Controller('productTypes')
export class ProductTypeController {
  constructor(
    private readonly productService: ProductService,
    private readonly productTypeService: ProductTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
  ) {}

  @Get('/:id')
  async getProductTypeById(@Param('id') id: string): Promise<ProductTypeModel> {
    return this.productTypeService.productType({ id: Number(id) });
  }

  @Get('/')
  async getProductTypes(): Promise<ProductTypeModel[]> {
    return this.productTypeService.productTypes({
      orderBy: {
        order: 'asc',
      },
    });
  }

  // @POST ProductType
  @Post('create')
  async create(
    @Body()
    productTypeData: {
      name: string;
      description: string;
      order?: number;
    },
  ): Promise<ProductTypeModel> {
    const { name, description, order } = productTypeData;
    return this.productTypeService.createProductType({
      name,
      description,
      order,
    });
  }

  @Post('update')
  async update(
    @Body()
    productTypeData: {
      id: number;
      name: string;
      description?: string;
      order?: number;
    },
  ): Promise<ProductTypeModel> {
    const { id, name, description, order } = productTypeData;
    return this.productTypeService.updateProductType({
      where: { id },
      data: { name, description, order },
    });
  }

  @Post('delete')
  async delete(
    @Body()
    productTypeData: {
      id: number;
    },
  ): Promise<ProductTypeModel> {
    const { id } = productTypeData;
    return this.productTypeService.deleteProductType({
      id,
    });
  }
}
