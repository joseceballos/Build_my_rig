import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductTypeService } from '../services/productType.service';
import { SpecificationService } from '../services/specification.service';
import { SpecificationTypeService } from '../services/specificationType.service';
import { Product as ProductModel } from '@prisma/client';
import { FamilyService } from 'src/services/family.service';
import { ProductRangeService } from 'src/services/productRange.service';
import { ProductSpecificationService } from 'src/services/productSpecification.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productTypeService: ProductTypeService,
    private readonly specificationService: SpecificationService,
    private readonly specificationTypeService: SpecificationTypeService,
    private readonly familyService: FamilyService,
    private readonly productRangeService: ProductRangeService,
    private readonly productSpecificationService: ProductSpecificationService,
  ) {}

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    return this.productService.product({ id: Number(id) });
  }

  @Get('/')
  async getProducts(): Promise<ProductModel[]> {
    return this.productService.products({
      orderBy: {
        productId: 'asc',
      },
    });
  }

  @Get('byFamily/:familyId')
  async getProductsByFamily(
    @Param('familyId') familyId: string,
  ): Promise<ProductModel[]> {
    return this.productService.products({
      where: {
        familyId: Number(familyId),
      },
      orderBy: {
        productId: 'asc',
      },
    });
  }

  @Get('byProductType/:productTypeId')
  async getProductsByProductType(
    @Param('productTypeId') productTypeId: string,
  ): Promise<ProductModel[]> {
    const families = (
      await this.productRangeService.productRanges({
        where: {
          productTypeId: Number(productTypeId),
        },
      })
    ).map((productRange) => productRange.id);
    const products: ProductModel[] = [];
    Promise.all(
      families.map(async (familyId) => {
        const productsForFamily = await this.productService.products({
          where: {
            familyId: familyId,
          },
          orderBy: {
            productId: 'asc',
          },
        });
        products.push(...productsForFamily);
      }),
    );

    return products;
  }

  // @POST Product
  @Post('/create')
  async create(
    @Body()
    productData: {
      productId: string;
      model: string;
      familyId: number;
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<ProductModel> {
    const { productId, model, familyId, specifications } = productData;

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

    return this.productService.createProduct({
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
    productData: {
      id: number;
      productId: string;
      model: string;
      familyId: number;
      specifications?: {
        specificationTypeId: number;
        specificationValue: string | number;
      }[];
    },
  ): Promise<ProductModel> {
    const { id, productId, model, familyId, specifications } = productData;

    const { newSpecifications, deleteSpecifications } =
      await this.productSpecificationService.filterProductSpecifications({
        productId: id,
        data: specifications,
      });

    const specificationsConnector =
      newSpecifications.length > 0
        ? {
            connect: newSpecifications.map((specificationId) => ({
              productId_specificationId: {
                productId: id,
                specificationId: specificationId,
              },
            })),
          }
        : undefined;

    const specificationsDisconnector =
      deleteSpecifications.length > 0
        ? {
            disconnect: deleteSpecifications.map((specificationId) => ({
              productId_specificationId: {
                productId: id,
                specificationId: specificationId,
              },
            })),
          }
        : undefined;

    return this.productService.updateProduct({
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
  ): Promise<ProductModel> {
    const { id } = specificationData;
    console.log(id);
    return this.productService.deleteProduct({
      id,
    });
  }
}
