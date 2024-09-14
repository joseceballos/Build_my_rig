import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Family, Prisma } from '@prisma/client';

@Injectable()
export class FamilyService {
  constructor(private prisma: PrismaService) {}

  async family(
    familyWhereUniqueInput: Prisma.FamilyWhereUniqueInput,
  ): Promise<Family | null> {
    return this.prisma.family.findUnique({
      where: familyWhereUniqueInput,
      include: {
        productRange: true,
        Components: true,
        Specifications: true,
        SpecificationTypes: true,
      },
    });
  }

  async familyFirstWith(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FamilyWhereUniqueInput;
    where?: Prisma.FamilyWhereInput;
    orderBy?: Prisma.FamilyOrderByWithRelationInput;
  }): Promise<Family> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.family.findFirst({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        productRange: true,
        Components: true,
        Specifications: true,
        SpecificationTypes: true,
      },
    });
  }

  async families(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FamilyWhereUniqueInput;
    where?: Prisma.FamilyWhereInput;
    orderBy?: Prisma.FamilyOrderByWithRelationInput;
  }): Promise<Family[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.family.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        productRange: true,
        Components: true,
        Specifications: true,
        SpecificationTypes: true,
      },
    });
  }

  async createFamily(data: Prisma.FamilyCreateInput): Promise<Family> {
    return this.prisma.family.create({
      data,
    });
  }

  async updateFamily(params: {
    where: Prisma.FamilyWhereUniqueInput;
    data: Prisma.FamilyUpdateInput;
  }): Promise<Family> {
    const { where, data } = params;
    return this.prisma.family.update({
      data,
      where,
    });
  }

  async deleteFamily(where: Prisma.FamilyWhereUniqueInput): Promise<Family> {
    return this.prisma.family.delete({
      where,
    });
  }
}
