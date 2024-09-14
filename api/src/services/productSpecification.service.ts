import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductSpecification, Prisma, Specification } from '@prisma/client';

@Injectable()
export class ProductSpecificationService {
  constructor(private prisma: PrismaService) {}

  async productSpecification(params: {
    where: Prisma.ProductSpecificationWhereUniqueInput;
  }): Promise<ProductSpecification | null> {
    const { where } = params;
    return this.prisma.productSpecification.findUnique({
      where,
      include: {
        product: true,
        specification: true,
      },
    });
  }

  async productSpecifications(params: {
    where: Prisma.ProductSpecificationWhereInput;
  }): Promise<ProductSpecification[] | null> {
    const { where } = params;
    return this.prisma.productSpecification.findMany({
      where,
      include: {
        product: true,
        specification: true,
      },
    });
  }

  async deleteProductSpecificationByFamily(params: {
    familyId: number;
    specificationTypesId: number[];
  }): Promise<void> {
    const { familyId, specificationTypesId } = params;

    const specificationsToDeleteAll: number[] = [];
    const specificationsToDeleteOnlyProduct: {
      productId: number;
      specificationId: number;
    }[] = [];
    specificationTypesId.map(async (specificationTypeId) => {
      const specificationsForFamily = await this.productSpecifications({
        where: {
          product: {
            familyId: familyId,
          },
          specification: {
            specificationTypeId: specificationTypeId,
          },
        },
      });
      const specificationsTotal = await this.productSpecifications({
        where: {
          specification: {
            specificationTypeId: specificationTypeId,
          },
        },
      });
      if (specificationsForFamily.length === specificationsTotal.length) {
        specificationsToDeleteAll.push(
          ...specificationsForFamily.map(
            (specification) => specification.specificationId,
          ),
        );
      } else {
        specificationsToDeleteOnlyProduct.push(...specificationsForFamily);
      }
    });

    specificationsToDeleteAll.forEach((specificationId) => {
      this.prisma.specification.delete({ where: { id: specificationId } });
    });

    specificationsToDeleteOnlyProduct.forEach(
      ({ productId, specificationId }) => {
        this.prisma.productSpecification.delete({
          where: {
            productId_specificationId: {
              productId: productId,
              specificationId: specificationId,
            },
          },
        });
      },
    );
  }

  async filterProductSpecifications(params: {
    productId: number;
    data: {
      specificationTypeId: number;
      specificationValue: string | number;
    }[];
  }): Promise<{
    newSpecifications: number[];
    deleteSpecifications: number[];
  }> {
    const { productId, data } = params;
    const newSpecifications: number[] = [];
    const deleteSpecifications: number[] = [];

    const existingSpecifications: Specification[] | null =
      await this.prisma.specification.findMany({
        where: {
          Products: {
            some: {
              productId: productId,
            },
          },
        },
      });

    data.forEach(async (specification) => {
      if (
        !existingSpecifications.find(
          (existingSpecification) =>
            specification.specificationTypeId ===
              existingSpecification.specificationTypeId &&
            specification.specificationValue === existingSpecification.value,
        )
      ) {
        const specificationUsed = await this.prisma.specification.findFirst({
          where: {
            specificationTypeId: specification.specificationTypeId,
            value: specification.specificationValue.toString(),
          },
        });
        if (specificationUsed === null) {
          const specificationCreated = await this.prisma.specification.create({
            data: {
              value: specification.specificationValue.toString(),
              specificationType: {
                connect: { id: specification.specificationTypeId },
              },
            },
          });
          newSpecifications.push(specificationCreated.id);
        } else {
          newSpecifications.push(specificationUsed.id);
        }
      }
    });
    existingSpecifications.forEach(async (existingSpecification) => {
      if (
        !data.find(
          (specification) =>
            specification.specificationTypeId ===
              existingSpecification.specificationTypeId &&
            specification.specificationValue === existingSpecification.value,
        )
      ) {
        const existingSpecificationProductQty =
          await this.prisma.productSpecification.findMany({
            where: {
              specificationId: existingSpecification.id,
            },
          });
        if (existingSpecificationProductQty.length === 1) {
          const existingSpecificationFamilyQty =
            await this.prisma.familySpecification.findMany({
              where: {
                specificationId: existingSpecification.id,
              },
            });
          if (existingSpecificationFamilyQty.length === 0) {
            await this.prisma.specification.delete({
              where: {
                id: existingSpecification.id,
              },
            });
          } else {
            await this.prisma.productSpecification.deleteMany({
              where: {
                specificationId: existingSpecification.id,
              },
            });
          }
        } else {
          deleteSpecifications.push(existingSpecification.id);
        }
      }
    });

    return {
      newSpecifications,
      deleteSpecifications,
    };
  }

  async createProductSpecification(
    data: Prisma.ProductSpecificationCreateInput,
  ): Promise<ProductSpecification> {
    return this.prisma.productSpecification.create({
      data,
    });
  }

  async updateProductSpecification(params: {
    where: Prisma.ProductSpecificationWhereUniqueInput;
    data: Prisma.ProductSpecificationUpdateInput;
  }): Promise<ProductSpecification> {
    const { where, data } = params;
    return this.prisma.productSpecification.update({
      data,
      where,
    });
  }

  async deleteProductSpecification(
    where: Prisma.ProductSpecificationWhereUniqueInput,
  ): Promise<ProductSpecification> {
    return this.prisma.productSpecification.delete({
      where,
    });
  }
}
