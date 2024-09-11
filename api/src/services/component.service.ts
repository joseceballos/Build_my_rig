import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Component, Prisma } from '@prisma/client';

@Injectable()
export class ComponentService {
  constructor(private prisma: PrismaService) {}

  async component(
    componentWhereUniqueInput: Prisma.ComponentWhereUniqueInput,
  ): Promise<Component | null> {
    return this.prisma.component.findUnique({
      where: componentWhereUniqueInput,
      include: {
        componentType: true,
        Specifications: {
          include: {
            specification: true,
          },
        },
      },
    });
  }

  async componentFirstWith(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ComponentWhereUniqueInput;
    where?: Prisma.ComponentWhereInput;
    orderBy?: Prisma.ComponentOrderByWithRelationInput;
  }): Promise<Component> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.component.findFirst({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { componentType: true, Specifications: true },
    });
  }

  async components(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ComponentWhereUniqueInput;
    where?: Prisma.ComponentWhereInput;
    orderBy?: Prisma.ComponentOrderByWithRelationInput;
  }): Promise<Component[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.component.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { componentType: true, Specifications: true },
    });
  }

  async createComponent(data: Prisma.ComponentCreateInput): Promise<Component> {
    return this.prisma.component.create({
      data,
    });
  }

  async updateComponent(params: {
    where: Prisma.ComponentWhereUniqueInput;
    data: Prisma.ComponentUpdateInput;
  }): Promise<Component> {
    const { where, data } = params;
    return this.prisma.component.update({
      data,
      where,
    });
  }

  async deleteComponent(
    where: Prisma.ComponentWhereUniqueInput,
  ): Promise<Component> {
    return this.prisma.component.delete({
      where,
    });
  }
}
