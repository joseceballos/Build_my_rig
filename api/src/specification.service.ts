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
      include: { specificationType: true },
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
      include: { specificationType: true },
    });
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
