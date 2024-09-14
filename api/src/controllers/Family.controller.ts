import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FamilyService } from '../services/family.service';
import { Family as FamilyModel } from '@prisma/client';
import { FamilySpecificationService } from 'src/services/familySpecification.service';
import { FamilySpecificationTypeService } from 'src/services/familySpecificationType.service';
import { SpecificationService } from 'src/services/specification.service';
import { ComponentSpecificationService } from 'src/services/componentSpecification.service';

@Controller('families')
export class FamilyController {
  constructor(
    private readonly familyService: FamilyService,
    private readonly familySpecificationService: FamilySpecificationService,
    private readonly familySpecificationTypeService: FamilySpecificationTypeService,
    private readonly specificationService: SpecificationService,
    private readonly componentSpecificationService: ComponentSpecificationService,
  ) {}

  @Get('/:id')
  async getFamilyById(@Param('id') id: string): Promise<FamilyModel> {
    return this.familyService.family({ id: Number(id) });
  }

  @Get('/')
  async getFamilies(): Promise<FamilyModel[]> {
    return this.familyService.families({
      orderBy: {
        name: 'asc',
      },
    });
  }

  @Get('ByProductRange/:productRangeId')
  async getFamilysByProductRange(
    @Param('productRangeId') productRangeId: string,
  ): Promise<FamilyModel[]> {
    return this.familyService.families({
      where: {
        productRangeId: Number(productRangeId),
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  // @POST Family
  @Post('create')
  async create(
    @Body()
    familyData: {
      name: string;
      year: number;
      description?: string;
      productRangeId: number;
      specificationTypes?: { specificationTypeId: number }[];
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<FamilyModel> {
    const {
      name,
      year,
      description,
      productRangeId,
      specificationTypes,
      specifications,
    } = familyData;
    let specificationTypesConnector = undefined;
    if (specificationTypes !== undefined && specificationTypes.length > 0) {
      specificationTypesConnector = {
        connect: specificationTypes.map((specificationTypeId) => ({
          id: specificationTypeId,
        })),
      };
    }

    let specificationsConnector;
    if (specifications !== undefined && specifications.length > 0) {
      if (specifications !== undefined) {
        const specificationsId =
          await this.specificationService.connectSpecifications({
            specifications,
          });
        const specificationsCreator = specificationsId.map(
          (specificationId) => ({
            specification: { connect: { id: specificationId } },
          }),
        );

        specificationsConnector = { create: specificationsCreator };
      }
    }

    return this.familyService.createFamily({
      name,
      year,
      description,
      productRange: {
        connect: { id: productRangeId },
      },
      SpecificationTypes: specificationTypesConnector,
      Specifications: specificationsConnector,
    });
  }

  @Post('update')
  async update(
    @Body()
    familyData: {
      id: number;
      name: string;
      year: number;
      description?: string;
      productRangeId: number;
      specificationTypes?: number[];
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<FamilyModel> {
    const {
      id,
      name,
      year,
      description,
      productRangeId,
      specificationTypes,
      specifications,
    } = familyData;
    const { newSpecificationTypes, deleteSpecificationTypes } =
      await this.familySpecificationTypeService.filterFamilySpecificationTypes({
        familyId: id,
        data: specificationTypes,
      });

    const specificationTypesConnector =
      newSpecificationTypes.length > 0
        ? {
            connect: newSpecificationTypes.map((specificationTypeId) => ({
              familyId_specificationTypeId: {
                familyId: id,
                specificationTypeId: specificationTypeId,
              },
            })),
          }
        : undefined;

    const specificationTypesDisconnector =
      deleteSpecificationTypes.length > 0
        ? {
            disconnect: deleteSpecificationTypes.map((specificationTypeId) => ({
              familyId_specificationTypeId: {
                familyId: id,
                specificationTypeId: specificationTypeId,
              },
            })),
          }
        : undefined;

    await this.componentSpecificationService.deleteComponentSpecificationByFamily(
      {
        familyId: id,
        specificationTypesId: deleteSpecificationTypes,
      },
    );

    const { newSpecifications, deleteSpecifications } =
      await this.familySpecificationService.filterFamilySpecifications({
        familyId: id,
        data: specifications,
      });

    const specificationsConnector =
      newSpecifications.length > 0
        ? {
            connect: newSpecifications.map((specificationId) => ({
              familyId_specificationId: {
                familyId: id,
                specificationId: specificationId,
              },
            })),
          }
        : undefined;

    const specificationsDisconnector =
      deleteSpecifications.length > 0
        ? {
            disconnect: deleteSpecifications.map((specificationId) => ({
              familyId_specificationId: {
                familyId: id,
                specificationId: specificationId,
              },
            })),
          }
        : undefined;

    return this.familyService.updateFamily({
      where: { id },
      data: {
        name,
        year,
        description,
        productRange: {
          connect: { id: productRangeId },
        },
        SpecificationTypes: {
          ...(specificationTypesConnector || {}),
          ...(specificationTypesDisconnector || {}),
        },
        Specifications: {
          ...(specificationsConnector || {}),
          ...(specificationsDisconnector || {}),
        },
      },
    });
  }

  @Post('delete')
  async delete(
    @Body()
    familyData: {
      id: number;
    },
  ): Promise<FamilyModel> {
    const { id } = familyData;
    return this.familyService.deleteFamily({
      id,
    });
  }
}
