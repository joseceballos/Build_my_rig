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

  @Get('byComponentType/:componentTypeId')
  async getProductRangesByComponentType(
    @Param('componentTypeId') componentTypeId: string,
  ): Promise<ProductRangeModel[]> {
    return this.productRangeService.productRanges({
      where: {
        componentTypeId: Number(componentTypeId),
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
      componentTypeId: number;
      properties?: { propertyId: number; propertyValue: string | number }[];
    },
  ): Promise<ProductRangeModel> {
    const { name, description, componentTypeId, properties } = productRangeData;
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
      componentType: {
        connect: { id: componentTypeId },
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
      componentTypeId: number;
      properties?: { propertyId: number; propertyValue: string | number }[];
    },
  ): Promise<ProductRangeModel> {
    const { id, name, description, componentTypeId, properties } =
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
      componentType: {
        connect: { id: componentTypeId },
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
