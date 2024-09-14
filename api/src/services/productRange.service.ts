import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRange, Prisma } from '@prisma/client';

@Injectable()
export class ProductRangeService {
  constructor(private prisma: PrismaService) {}

  async productRange(
    productRangeWhereUniqueInput: Prisma.ProductRangeWhereUniqueInput,
  ): Promise<ProductRange | null> {
    return this.prisma.productRange.findUnique({
      where: productRangeWhereUniqueInput,
      include: {
        componentType: true,
        Properties: true,
        Families: true,
      },
    });
  }

  async productRangeFirstWith(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductRangeWhereUniqueInput;
    where?: Prisma.ProductRangeWhereInput;
    orderBy?: Prisma.ProductRangeOrderByWithRelationInput;
  }): Promise<ProductRange> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productRange.findFirst({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { componentType: true, Properties: true, Families: true },
    });
  }

  async productRanges(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductRangeWhereUniqueInput;
    where?: Prisma.ProductRangeWhereInput;
    orderBy?: Prisma.ProductRangeOrderByWithRelationInput;
  }): Promise<ProductRange[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.productRange.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { componentType: true, Properties: true, Families: true },
    });
  }

  async createProductRange(
    data: Prisma.ProductRangeCreateInput,
  ): Promise<ProductRange> {
    return this.prisma.productRange.create({
      data,
    });
  }

  async updateProductRange(params: {
    where: Prisma.ProductRangeWhereUniqueInput;
    data: Prisma.ProductRangeUpdateInput;
  }): Promise<ProductRange> {
    const { where, data } = params;
    return this.prisma.productRange.update({
      data,
      where,
    });
  }

  async deleteProductRange(
    where: Prisma.ProductRangeWhereUniqueInput,
  ): Promise<ProductRange> {
    return this.prisma.productRange.delete({
      where,
    });
  }
}
