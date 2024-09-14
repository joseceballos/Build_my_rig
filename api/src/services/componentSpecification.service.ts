import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ComponentSpecification, Prisma, Specification } from '@prisma/client';

@Injectable()
export class ComponentSpecificationService {
  constructor(private prisma: PrismaService) {}

  async componentSpecification(params: {
    where: Prisma.ComponentSpecificationWhereUniqueInput;
  }): Promise<ComponentSpecification | null> {
    const { where } = params;
    return this.prisma.componentSpecification.findUnique({
      where,
      include: {
        component: true,
        specification: true,
      },
    });
  }

  async componentSpecifications(params: {
    where: Prisma.ComponentSpecificationWhereInput;
  }): Promise<ComponentSpecification[] | null> {
    const { where } = params;
    return this.prisma.componentSpecification.findMany({
      where,
      include: {
        component: true,
        specification: true,
      },
    });
  }

  async deleteComponentSpecificationByFamily(params: {
    familyId: number;
    specificationTypesId: number[];
  }): Promise<void> {
    const { familyId, specificationTypesId } = params;

    const specificationsToDeleteAll: number[] = [];
    const specificationsToDeleteOnlyComponent: {
      componentId: number;
      specificationId: number;
    }[] = [];
    specificationTypesId.map(async (specificationTypeId) => {
      const specificationsForFamily = await this.componentSpecifications({
        where: {
          component: {
            familyId: familyId,
          },
          specification: {
            specificationTypeId: specificationTypeId,
          },
        },
      });
      const specificationsTotal = await this.componentSpecifications({
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
        specificationsToDeleteOnlyComponent.push(...specificationsForFamily);
      }
    });

    specificationsToDeleteAll.forEach((specificationId) => {
      this.prisma.specification.delete({ where: { id: specificationId } });
    });

    specificationsToDeleteOnlyComponent.forEach(
      ({ componentId, specificationId }) => {
        this.prisma.componentSpecification.delete({
          where: {
            componentId_specificationId: {
              componentId: componentId,
              specificationId: specificationId,
            },
          },
        });
      },
    );
  }

  async filterComponentSpecifications(params: {
    componentId: number;
    data: {
      specificationTypeId: number;
      specificationValue: string | number;
    }[];
  }): Promise<{
    newSpecifications: number[];
    deleteSpecifications: number[];
  }> {
    const { componentId, data } = params;
    const newSpecifications: number[] = [];
    const deleteSpecifications: number[] = [];

    const existingSpecifications: Specification[] | null =
      await this.prisma.specification.findMany({
        where: {
          Components: {
            some: {
              componentId: componentId,
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
        const existingSpecificationComponentQty =
          await this.prisma.componentSpecification.findMany({
            where: {
              specificationId: existingSpecification.id,
            },
          });
        if (existingSpecificationComponentQty.length === 1) {
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
            await this.prisma.componentSpecification.deleteMany({
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

  async createComponentSpecification(
    data: Prisma.ComponentSpecificationCreateInput,
  ): Promise<ComponentSpecification> {
    return this.prisma.componentSpecification.create({
      data,
    });
  }

  async updateComponentSpecification(params: {
    where: Prisma.ComponentSpecificationWhereUniqueInput;
    data: Prisma.ComponentSpecificationUpdateInput;
  }): Promise<ComponentSpecification> {
    const { where, data } = params;
    return this.prisma.componentSpecification.update({
      data,
      where,
    });
  }

  async deleteComponentSpecification(
    where: Prisma.ComponentSpecificationWhereUniqueInput,
  ): Promise<ComponentSpecification> {
    return this.prisma.componentSpecification.delete({
      where,
    });
  }
}
