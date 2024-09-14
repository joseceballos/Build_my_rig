import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRangeProperty, Prisma } from '@prisma/client';

@Injectable()
export class ProductRangePropertyService {
  constructor(private prisma: PrismaService) {}

  async productRangeProperty(params: {
    where: Prisma.ProductRangePropertyWhereUniqueInput;
  }): Promise<ProductRangeProperty | null> {
    const { where } = params;
    return this.prisma.productRangeProperty.findUnique({
      where,
      include: {
        productRange: true,
        property: true,
      },
    });
  }

  async productRangeProperties(params: {
    where: Prisma.ProductRangePropertyWhereInput;
  }): Promise<ProductRangeProperty[] | null> {
    const { where } = params;
    return this.prisma.productRangeProperty.findMany({
      where,
      include: {
        productRange: true,
        property: true,
      },
    });
  }

  async filterProductRangeProperties(params: {
    productRangeId: number;
    data: { propertyId: number; propertyValue: number | string }[];
  }): Promise<{
    newProperties: { propertyId: number; propertyValue: number | string }[];
    updateProperties: { propertyId: number; propertyValue: number | string }[];
    deleteProperties: { propertyId: number }[];
  }> {
    const { productRangeId, data } = params;
    const newProperties: {
      propertyId: number;
      propertyValue: number | string;
    }[] = [];
    const updateProperties: {
      propertyId: number;
      propertyValue: number | string;
    }[] = [];
    const deleteProperties: { propertyId: number }[] = [];

    const existingProperties: ProductRangeProperty[] | null =
      await this.productRangeProperties({
        where: { productRangeId: productRangeId },
      });

    data.forEach((property) => {
      const existingProperty = existingProperties.find(
        (item) => property.propertyId === item.propertyId,
      );

      if (existingProperty) {
        if (property.propertyValue !== existingProperty.value) {
          updateProperties.push(property);
        }
      } else {
        // If the property doesn't exist, add it to new properties
        newProperties.push(property);
      }
    });
    existingProperties.forEach((property) => {
      if (!data.find((item) => item.propertyId === property.propertyId)) {
        deleteProperties.push({ propertyId: property.propertyId });
      }
    });
    return {
      newProperties,
      updateProperties,
      deleteProperties,
    };
  }

  async createProductRangeProperty(
    data: Prisma.ProductRangePropertyCreateInput,
  ): Promise<ProductRangeProperty> {
    return this.prisma.productRangeProperty.create({
      data,
    });
  }

  async updateProductRangeProperty(params: {
    where: Prisma.ProductRangePropertyWhereUniqueInput;
    data: Prisma.ProductRangePropertyUpdateInput;
  }): Promise<ProductRangeProperty> {
    const { where, data } = params;
    return this.prisma.productRangeProperty.update({
      data,
      where,
    });
  }

  async deleteProductRangeProperty(
    where: Prisma.ProductRangePropertyWhereUniqueInput,
  ): Promise<ProductRangeProperty> {
    return this.prisma.productRangeProperty.delete({
      where,
    });
  }
}
