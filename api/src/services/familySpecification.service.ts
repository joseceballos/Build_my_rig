import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FamilySpecification, Prisma, Specification } from '@prisma/client';

@Injectable()
export class FamilySpecificationService {
  constructor(private prisma: PrismaService) {}

  async familySpecification(params: {
    where: Prisma.FamilySpecificationWhereUniqueInput;
  }): Promise<FamilySpecification | null> {
    const { where } = params;
    return this.prisma.familySpecification.findUnique({
      where,
      include: {
        family: true,
        specification: true,
      },
    });
  }

  async familySpecifications(params: {
    where: Prisma.FamilySpecificationWhereInput;
  }): Promise<FamilySpecification[] | null> {
    const { where } = params;
    return this.prisma.familySpecification.findMany({
      where,
      include: {
        family: true,
        specification: true,
      },
    });
  }

  async filterFamilySpecifications(params: {
    familyId: number;
    data: {
      specificationTypeId: number;
      specificationValue: string | number;
    }[];
  }): Promise<{
    newSpecifications: number[];
    deleteSpecifications: number[];
  }> {
    const { familyId, data } = params;
    const newSpecifications: number[] = [];
    const deleteSpecifications: number[] = [];

    const existingSpecifications: Specification[] | null =
      await this.prisma.specification.findMany({
        where: { Families: { some: { familyId: familyId } } },
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
        const existingSpecificationFamilyQty =
          await this.prisma.familySpecification.findMany({
            where: {
              specificationId: existingSpecification.id,
            },
          });
        if (existingSpecificationFamilyQty.length === 1) {
          const existingSpecificationProductQty =
            await this.prisma.productSpecification.findMany({
              where: {
                specificationId: existingSpecification.id,
              },
            });
          if (existingSpecificationProductQty.length === 0) {
            await this.prisma.specification.delete({
              where: {
                id: existingSpecification.id,
              },
            });
          } else {
            await this.prisma.familySpecification.deleteMany({
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

  async createFamilySpecification(
    data: Prisma.FamilySpecificationCreateInput,
  ): Promise<FamilySpecification> {
    return this.prisma.familySpecification.create({
      data,
    });
  }

  async updateFamilySpecification(params: {
    where: Prisma.FamilySpecificationWhereUniqueInput;
    data: Prisma.FamilySpecificationUpdateInput;
  }): Promise<FamilySpecification> {
    const { where, data } = params;
    return this.prisma.familySpecification.update({
      data,
      where,
    });
  }

  async deleteFamilySpecification(
    where: Prisma.FamilySpecificationWhereUniqueInput,
  ): Promise<FamilySpecification> {
    return this.prisma.familySpecification.delete({
      where,
    });
  }
}
