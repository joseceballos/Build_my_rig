import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Specification } from '@prisma/client';

@Injectable()
export class SpecificationService {
  constructor(private prisma: PrismaService) {}

  async specification(
    specificationWhereUniqueInput: Prisma.SpecificationWhereUniqueInput,
  ): Promise<Specification> {
    return this.prisma.specification.findUnique({
      where: specificationWhereUniqueInput,
      include: { specificationType: true, Components: true },
    });
  }

  async specificationsFirstWith(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SpecificationWhereUniqueInput;
    where?: Prisma.SpecificationWhereInput;
    orderBy?: Prisma.SpecificationOrderByWithRelationInput;
  }): Promise<Specification | null> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.specification.findFirst({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { specificationType: true, Components: true },
    });
  }

  async specifications(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SpecificationWhereUniqueInput;
    where?: Prisma.SpecificationWhereInput;
    orderBy?: Prisma.SpecificationOrderByWithRelationInput;
  }): Promise<Specification[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.specification.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { specificationType: true, Components: true },
    });
  }

  async connectSpecifications(params: {
    specifications: {
      specificationTypeId: number;
      specificationValue: string | number;
    }[];
  }): Promise<number[]> {
    const { specifications } = params;
    const connectSpecifications: number[] = [];
    const createSpecifications: {
      specificationTypeId: number;
      specificationValue: string | number;
    }[] = [];
    specifications.forEach(async (specification) => {
      const existingSpecification = await this.specificationsFirstWith({
        where: {
          specificationTypeId: specification.specificationTypeId,
          value: specification.specificationValue.toString(),
        },
      });
      if (existingSpecification) {
        connectSpecifications.push(existingSpecification.id);
      } else {
        createSpecifications.push(specification);
      }
    });

    createSpecifications.forEach(async (specification) => {
      const newSpecification = await this.createSpecification({
        value: specification.specificationValue.toString(),
        specificationType: {
          connect: { id: specification.specificationTypeId },
        },
      });
      connectSpecifications.push(newSpecification.id);
    });

    return connectSpecifications;
  }

  async createSpecification(
    data: Prisma.SpecificationCreateInput,
  ): Promise<Specification> {
    return this.prisma.specification.create({
      data,
    });
  }

  async updateSpecification(params: {
    where: Prisma.SpecificationWhereUniqueInput;
    data: Prisma.SpecificationUpdateInput;
  }): Promise<Specification> {
    const { where, data } = params;
    return this.prisma.specification.update({
      where,
      data,
    });
  }

  async deleteSpecification(
    where: Prisma.SpecificationWhereUniqueInput,
  ): Promise<Specification> {
    return this.prisma.specification.delete({
      where,
    });
  }
}
