import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ComponentService } from '../services/component.service';
import { ComponentTypeService } from '../services/componentType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { Component as ComponentModel } from '@prisma/client';

@Controller('components')
export class ComponentController {
  constructor(
    private readonly componentService: ComponentService,
    private readonly componentTypeService: ComponentTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
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

  @Get('byComponentType/:componentTypeId')
  async getComponentsByComponentType(
    @Param('componentTypeId') componentTypeId: string,
  ): Promise<ComponentModel[]> {
    return this.componentService.components({
      where: {
        componentTypeId: Number(componentTypeId),
      },
    });
  }

  // @POST Component
  @Post('/create')
  async create(
    @Body()
    componentData: {
      productId: string;
      model: string;
      componentTypeId: number;
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<ComponentModel> {
    const { productId, model, componentTypeId, specifications } = componentData;

    let specificationsCreator;

    if (specifications !== undefined) {
      const specificationsConnector = await Promise.all(
        specifications?.map(
          async ({ specificationTypeId, specificationValue }) => {
            const existingSpecification =
              await this.specificationService.specificationsFirstWith({
                where: {
                  specificationTypeId: Number(specificationTypeId),
                  value: specificationValue.toString(),
                },
              });
            let specificationId: number;
            if (existingSpecification) {
              specificationId = existingSpecification.id;
            } else {
              const newSpecification =
                await this.specificationService.createSpecification({
                  value: specificationValue.toString(),
                  specificationType: {
                    connect: { id: specificationTypeId },
                  },
                });
              specificationId = newSpecification.id;
            }
            return { specification: { connect: { id: specificationId } } };
          },
        ),
      );

      specificationsCreator = { create: specificationsConnector };
    }

    return this.componentService.createComponent({
      productId,
      model,
      componentType: {
        connect: { id: componentTypeId },
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
      componentTypeId: number;
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<ComponentModel> {
    const { id, productId, model, componentTypeId, specifications } =
      componentData;

    if (specifications !== undefined) {
      const oldSpecifications = await this.specificationService.specifications({
        where: {
          Components: {
            some: {
              componentId: Number(id),
            },
          },
        },
      });

      const existingSpecifications: {
        id: number;
        value: string;
        description: string | null;
        specificationTypeId: number;
      }[] = [];
      const newSpecifications: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[] = [];

      for (const updatedSpecification of specifications) {
        for (const oldSpecification of oldSpecifications) {
          if (
            updatedSpecification.specificationTypeId ===
              oldSpecification.specificationTypeId &&
            updatedSpecification.specificationValue === oldSpecification.value
          ) {
            existingSpecifications.push(oldSpecification);
          } else {
            newSpecifications.push(updatedSpecification);
          }
        }
      }

      const deleteSpecifications = oldSpecifications
        .filter(
          (oldSpecification) =>
            !existingSpecifications.some(
              (existingSpecification) =>
                existingSpecification.id === oldSpecification.id,
            ),
        )
        .map((specification) => {
          return {
            componentId_specificationId: {
              componentId: id,
              specificationId: specification.id,
            },
          };
        });

      const specificationsCreator = await Promise.all(
        newSpecifications?.map(
          async ({ specificationTypeId, specificationValue }) => {
            const existingSpecification =
              await this.specificationService.specificationsFirstWith({
                where: {
                  specificationTypeId: Number(specificationTypeId),
                  value: specificationValue.toString(),
                },
              });

            let specificationId: number;
            if (existingSpecification) {
              specificationId = existingSpecification.id;
            } else {
              const newSpecification =
                await this.specificationService.createSpecification({
                  value: specificationValue.toString(),
                  specificationType: {
                    connect: { id: specificationTypeId },
                  },
                });
              specificationId = newSpecification.id;
            }
            return { specification: { connect: { id: specificationId } } };
          },
        ),
      );

      let specificationsDisconnect;
      if (deleteSpecifications.length > 0) {
        specificationsDisconnect = { disconnect: deleteSpecifications };
      }

      let specificationsCreate;
      if (deleteSpecifications.length > 0) {
        specificationsCreate = { create: specificationsCreator };
      }

      const specificationsConnector = {
        ...specificationsDisconnect,
        ...specificationsCreate,
      };

      return this.componentService.updateComponent({
        where: { id },
        data: {
          productId,
          model,
          componentType: {
            connect: { id: componentTypeId },
          },
          Specifications: specificationsConnector,
        },
      });
    } else {
      const deleteSpecifications = (
        await this.specificationService.specifications({
          where: {
            Components: {
              some: {
                componentId: Number(id),
              },
            },
          },
        })
      ).map((specification) => {
        return {
          componentId_specificationId: {
            componentId: id,
            specificationId: specification.id,
          },
        };
      });

      let specificationsDisconnect;
      if (deleteSpecifications.length > 0) {
        specificationsDisconnect = { disconnect: deleteSpecifications };
      }

      return this.componentService.updateComponent({
        where: { id },
        data: {
          productId,
          model,
          componentType: {
            connect: { id: componentTypeId },
          },
          Specifications: specificationsDisconnect,
        },
      });
    }
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
