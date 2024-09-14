import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductRangeService } from '../services/productRange.service';
import { ProductRange as ProductRangeModel } from '@prisma/client';
import { ProductRangePropertyService } from 'src/services/productRangeProperties.service';

@Controller('productRanges')
export class ProductRangeController {
  constructor(
    private readonly productRangeService: ProductRangeService,
    private readonly productRangePropertyService: ProductRangePropertyService,
  ) {}

  @Get('/:id')
  async getProductRangeById(
    @Param('id') id: string,
  ): Promise<ProductRangeModel> {
    return this.productRangeService.productRange({ id: Number(id) });
  }

  @Get('/')
  async getProductRanges(): Promise<ProductRangeModel[]> {
    return this.productRangeService.productRanges({
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Get('byProductType/:productTypeId')
  async getProductRangesByProductType(
    @Param('productTypeId') productTypeId: string,
  ): Promise<ProductRangeModel[]> {
    return this.productRangeService.productRanges({
      where: {
        productTypeId: Number(productTypeId),
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  // @POST ProductRange
  @Post('create')
  async create(
    @Body()
    productRangeData: {
      name: string;
      description?: string;
      productTypeId: number;
      properties?: { propertyId: number; propertyValue: string | number }[];
    },
  ): Promise<ProductRangeModel> {
    const { name, description, productTypeId, properties } = productRangeData;
    let propertiesConnector;
    if (properties !== undefined) {
      if (properties.length > 0) {
        const propertiesValues = properties.map((propertyItem) => {
          return {
            value: propertyItem.propertyValue.toString(),
            property: {
              connect: {
                id: propertyItem.propertyId,
              },
            },
          };
        });
        propertiesConnector = { create: propertiesValues };
      }
    }

    return this.productRangeService.createProductRange({
      name,
      description,
      productType: {
        connect: { id: productTypeId },
      },
      Properties: propertiesConnector,
    });
  }

  @Post('update')
  async update(
    @Body()
    productRangeData: {
      id: number;
      name: string;
      description?: string;
      productTypeId: number;
      properties?: { propertyId: number; propertyValue: string | number }[];
    },
  ): Promise<ProductRangeModel> {
    const { id, name, description, productTypeId, properties } =
      productRangeData;

    const { newProperties, updateProperties, deleteProperties } =
      await this.productRangePropertyService.filterProductRangeProperties({
        productRangeId: id,
        data: properties,
      });

    for (const propertyItem of updateProperties) {
      await this.productRangePropertyService.updateProductRangeProperty({
        where: {
          productRangeId_propertyId: {
            productRangeId: id,
            propertyId: propertyItem.propertyId,
          },
        },
        data: {
          value: propertyItem.propertyValue.toString(),
        },
      });
    }

    const propertiesCreateConnector =
      newProperties.length > 0
        ? {
            create: newProperties.map((propertyItem) => ({
              value: propertyItem.propertyValue.toString(),
              property: {
                connect: {
                  id: propertyItem.propertyId,
                },
              },
            })),
          }
        : undefined;

    const propertiesDeleteConnector =
      deleteProperties.length > 0
        ? {
            disconnect: deleteProperties.map((propertyItem) => ({
              productRangeId_propertyId: {
                productRangeId: id,
                propertyId: propertyItem.propertyId,
              },
            })),
          }
        : undefined;

    return this.productRangeService.createProductRange({
      name,
      description,
      productType: {
        connect: { id: productTypeId },
      },
      Properties: {
        ...(propertiesCreateConnector || {}),
        ...(propertiesDeleteConnector || {}),
      },
    });
  }

  @Post('delete')
  async delete(
    @Body()
    productRangeData: {
      id: number;
    },
  ): Promise<ProductRangeModel> {
    const { id } = productRangeData;
    return this.productRangeService.deleteProductRange({
      id,
    });
  }
}
