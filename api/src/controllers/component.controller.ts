import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ComponentService } from '../services/component.service';
import { ComponentTypeService } from '../services/componentType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { Component as ComponentModel } from '@prisma/client';
import { FamilyService } from 'src/services/family.service';
import { ProductRangeService } from 'src/services/productRange.service';
import { ComponentSpecificationService } from 'src/services/componentSpecification.service';

@Controller('components')
export class ComponentController {
  constructor(
    private readonly componentService: ComponentService,
    private readonly componentTypeService: ComponentTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
    private readonly familyService: FamilyService,
    private readonly productRangeService: ProductRangeService,
    private readonly componentSpecificationService: ComponentSpecificationService,
  ) {}

  @Get('/:id')
  async getComponentById(@Param('id') id: string): Promise<ComponentModel> {
    return this.componentService.component({ id: Number(id) });
  }

  @Get('/')
  async getComponents(): Promise<ComponentModel[]> {
    return this.componentService.components({
      orderBy: {
        productId: 'asc',
      },
    });
  }

  @Get('byFamily/:familyId')
  async getComponentsByFamily(
    @Param('familyId') familyId: string,
  ): Promise<ComponentModel[]> {
    return this.componentService.components({
      where: {
        familyId: Number(familyId),
      },
      orderBy: {
        productId: 'asc',
      },
    });
  }

  @Get('byComponentType/:componentTypeId')
  async getComponentsByComponentType(
    @Param('componentTypeId') componentTypeId: string,
  ): Promise<ComponentModel[]> {
    const families = (
      await this.productRangeService.productRanges({
        where: {
          componentTypeId: Number(componentTypeId),
        },
      })
    ).map((productRange) => productRange.id);
    const components: ComponentModel[] = [];
    Promise.all(
      families.map(async (familyId) => {
        const componentsForFamily = await this.componentService.components({
          where: {
            familyId: familyId,
          },
          orderBy: {
            productId: 'asc',
          },
        });
        components.push(...componentsForFamily);
      }),
    );

    return components;
  }

  // @POST Component
  @Post('/create')
  async create(
    @Body()
    componentData: {
      productId: string;
      model: string;
      familyId: number;
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<ComponentModel> {
    const { productId, model, familyId, specifications } = componentData;

    let specificationsCreator;

    if (specifications !== undefined) {
      const specificationsId =
        await this.specificationService.connectSpecifications({
          specifications,
        });
      const specificationsConnector = specificationsId.map(
        (specificationId) => ({
          specification: { connect: { id: specificationId } },
        }),
      );

      specificationsCreator = { create: specificationsConnector };
    }

    return this.componentService.createComponent({
      productId,
      model,
      family: {
        connect: {
          id: familyId,
        },
      },
      Specifications: specificationsCreator,
    });
  }

  @Post('/update')
  async update(
    @Body()
    componentData: {
      id: number;
      productId: string;
      model: string;
      familyId: number;
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<ComponentModel> {
    const { id, productId, model, familyId, specifications } = componentData;

    const { newSpecifications, deleteSpecifications } =
      await this.componentSpecificationService.filterComponentSpecifications({
        componentId: id,
        data: specifications,
      });

    const specificationsConnector =
      newSpecifications.length > 0
        ? {
            connect: newSpecifications.map((specificationId) => ({
              componentId_specificationId: {
                componentId: id,
                specificationId: specificationId,
              },
            })),
          }
        : undefined;

    const specificationsDisconnector =
      deleteSpecifications.length > 0
        ? {
            disconnect: deleteSpecifications.map((specificationId) => ({
              componentId_specificationId: {
                componentId: id,
                specificationId: specificationId,
              },
            })),
          }
        : undefined;

    return this.componentService.updateComponent({
      where: { id },
      data: {
        productId,
        model,
        family: {
          connect: {
            id: familyId,
          },
        },
        Specifications: {
          ...(specificationsConnector || {}),
          ...(specificationsDisconnector || {}),
        },
      },
    });
  }

  @Post('/delete')
  async delete(
    @Body()
    specificationData: {
      id: number;
    },
  ): Promise<ComponentModel> {
    const { id } = specificationData;
    console.log(id);
    return this.componentService.deleteComponent({
      id,
    });
  }
}
