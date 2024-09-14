import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Property, Prisma } from '@prisma/client';

@Injectable()
export class PropertyService {
  constructor(private prisma: PrismaService) {}

  async property(
    propertyWhereUniqueInput: Prisma.PropertyWhereUniqueInput,
  ): Promise<Property | null> {
    return this.prisma.property.findUnique({
      where: propertyWhereUniqueInput,
      include: {
        ProductRanges: true,
      },
    });
  }

  async propertyFirstWith(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PropertyWhereUniqueInput;
    where?: Prisma.PropertyWhereInput;
    orderBy?: Prisma.PropertyOrderByWithRelationInput;
  }): Promise<Property> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.property.findFirst({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { ProductRanges: true },
    });
  }

  async properties(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PropertyWhereUniqueInput;
    where?: Prisma.PropertyWhereInput;
    orderBy?: Prisma.PropertyOrderByWithRelationInput;
  }): Promise<Property[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.property.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { ProductRanges: true },
    });
  }

  async createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
    return this.prisma.property.create({
      data,
    });
  }

  async updateProperty(params: {
    where: Prisma.PropertyWhereUniqueInput;
    data: Prisma.PropertyUpdateInput;
  }): Promise<Property> {
    const { where, data } = params;
    return this.prisma.property.update({
      data,
      where,
    });
  }

  async deleteProperty(
    where: Prisma.PropertyWhereUniqueInput,
  ): Promise<Property> {
    return this.prisma.property.delete({
      where,
    });
  }
}
