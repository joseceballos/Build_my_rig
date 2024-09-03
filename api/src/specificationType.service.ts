import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, SpecificationType } from '@prisma/client';

@Injectable()
export class SpecificationTypeService {
  constructor(private prisma: PrismaService) {}

  async specificationType(
    specificationTypeWhereUniqueInput: Prisma.SpecificationTypeWhereUniqueInput,
  ): Promise<SpecificationType | null> {
    return this.prisma.specificationType.findUnique({
      where: specificationTypeWhereUniqueInput,
    });
  }

  async specificationTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SpecificationTypeWhereUniqueInput;
    where?: Prisma.SpecificationTypeWhereInput;
    orderBy?: Prisma.SpecificationTypeOrderByWithRelationInput;
  }): Promise<SpecificationType[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.specificationType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { componentType: true },
    });
  }

  async createSpecificationType(
    data: Prisma.SpecificationTypeCreateInput,
  ): Promise<SpecificationType> {
    return this.prisma.specificationType.create({
      data,
    });
  }

  async updateSpecificationType(params: {
    where: Prisma.SpecificationTypeWhereUniqueInput;
    data: Prisma.SpecificationTypeUpdateInput;
  }): Promise<SpecificationType> {
    const { where, data } = params;
    return this.prisma.specificationType.update({
      where,
      data,
    });
  }

  async deleteSpecificationType(
    where: Prisma.SpecificationTypeWhereUniqueInput,
  ): Promise<SpecificationType> {
    return this.prisma.specificationType.delete({
      where,
    });
  }
}
