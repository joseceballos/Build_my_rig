import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ComponentType, Prisma } from '@prisma/client';

@Injectable()
export class ComponentTypeService {
  constructor(private prisma: PrismaService) {}

  async componentType(
    componentTypeWhereUniqueInput: Prisma.ComponentTypeWhereUniqueInput,
  ): Promise<ComponentType | null> {
    return this.prisma.componentType.findUnique({
      where: componentTypeWhereUniqueInput,
    });
  }

  async componentTypes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ComponentTypeWhereUniqueInput;
    where?: Prisma.ComponentTypeWhereInput;
    orderBy?: Prisma.ComponentTypeOrderByWithRelationInput;
  }): Promise<ComponentType[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.componentType.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createComponentType(
    data: Prisma.ComponentTypeCreateInput,
  ): Promise<ComponentType> {
    return this.prisma.componentType.create({
      data,
    });
  }

  async updateComponentType(params: {
    where: Prisma.ComponentTypeWhereUniqueInput;
    data: Prisma.ComponentTypeUpdateInput;
  }): Promise<ComponentType> {
    const { where, data } = params;
    return this.prisma.componentType.update({
      data,
      where,
    });
  }

  async deleteComponentType(
    where: Prisma.ComponentTypeWhereUniqueInput,
  ): Promise<ComponentType> {
    return this.prisma.componentType.delete({
      where,
    });
  }
}
