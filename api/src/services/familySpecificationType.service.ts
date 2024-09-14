import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { FamilySpecificationType, Prisma } from '@prisma/client';

@Injectable()
export class FamilySpecificationTypeService {
  constructor(private prisma: PrismaService) {}

  async familySpecificationType(params: {
    where: Prisma.FamilySpecificationTypeWhereUniqueInput;
  }): Promise<FamilySpecificationType | null> {
    const { where } = params;
    return this.prisma.familySpecificationType.findUnique({
      where,
      include: {
        family: true,
        specificationType: true,
      },
    });
  }

  async familySpecificationTypes(params: {
    where: Prisma.FamilySpecificationTypeWhereInput;
  }): Promise<FamilySpecificationType[] | null> {
    const { where } = params;
    return this.prisma.familySpecificationType.findMany({
      where,
      include: {
        family: true,
        specificationType: true,
      },
    });
  }

  async filterFamilySpecificationTypes(params: {
    familyId: number;
    data: number[];
  }): Promise<{
    newSpecificationTypes: number[];
    deleteSpecificationTypes: number[];
  }> {
    const { familyId, data } = params;
    const newSpecificationTypes: number[] = [];
    const deleteSpecificationTypes: number[] = [];

    const existingSpecificationTypes: FamilySpecificationType[] | null =
      await this.familySpecificationTypes({
        where: { familyId: familyId },
      });

    data.forEach((specificationTypeId) => {
      if (
        !existingSpecificationTypes.find(
          (item) => specificationTypeId === item.specificationTypeId,
        )
      ) {
        newSpecificationTypes.push(specificationTypeId);
      }
    });
    existingSpecificationTypes.forEach((item) => {
      if (
        !data.find(
          (specificationTypeId) =>
            specificationTypeId === item.specificationTypeId,
        )
      ) {
        deleteSpecificationTypes.push(item.specificationTypeId);
      }
    });
    return {
      newSpecificationTypes,
      deleteSpecificationTypes,
    };
  }

  async createFamilySpecificationType(
    data: Prisma.FamilySpecificationTypeCreateInput,
  ): Promise<FamilySpecificationType> {
    return this.prisma.familySpecificationType.create({
      data,
    });
  }

  async updateFamilySpecificationType(params: {
    where: Prisma.FamilySpecificationTypeWhereUniqueInput;
    data: Prisma.FamilySpecificationTypeUpdateInput;
  }): Promise<FamilySpecificationType> {
    const { where, data } = params;
    return this.prisma.familySpecificationType.update({
      data,
      where,
    });
  }

  async deleteFamilySpecificationType(
    where: Prisma.FamilySpecificationTypeWhereUniqueInput,
  ): Promise<FamilySpecificationType> {
    return this.prisma.familySpecificationType.delete({
      where,
    });
  }
}
