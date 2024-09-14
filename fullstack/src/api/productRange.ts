import { ProductRangeProp } from "@/types/api";
import { getFetch, postFetch } from "@/lib/fetch";
import { ProductType } from "./productType";

export class ProductRange {
  public id: number;
  public name: string;
  public description: string | undefined;
  public productType: ProductType;

  public constructor({ id, name, description, productType }: ProductRangeProp) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.productType = new ProductType(productType);
  }

  public static async getProductRange(id: number): Promise<ProductRange | undefined> {
    const data: ProductRangeProp | undefined = await getFetch(
      "productRange",
      "productRanges/",
      id.toString(),
    );
    let productRange;
    if (data !== undefined) {
      productRange = new ProductRange(data);
    }
    return productRange;
  }

  public static async getProductRanges(): Promise<ProductRange[]> {
    const data: ProductRangeProp[] | undefined = await getFetch(
      "productRange",
      "productRanges",
      "",
    );
    let productRanges: ProductRange[] = [];
    if (data !== undefined) {
      productRanges = data.map((item) => {
        return new ProductRange(item);
      });
    }
    return productRanges;
  }

  public static async getProductRangesByProductType(
    productTypeId: number,
  ): Promise<ProductRange[]> {
    const data: ProductRangeProp[] | undefined = await getFetch(
      "productRanges",
      "productRanges/byProductType/",
      productTypeId.toString(),
    );
    let productRanges: ProductRange[] = [];
    if (data !== undefined) {
      productRanges = data.map((item) => {
        return new ProductRange(item);
      });
    }
    return productRanges;
  }

  public static toProductRangesArray(data: ProductRangeProp[]) {
    const productRanges: ProductRange[] = data.map((item) => {
      return new ProductRange(item);
    });

    return productRanges;
  }

  public static async createProductRange(productData: {
    name: string;
    description?: string;
    productTypeId: number;
    properties: { propertyId: number; propertyValue: string | number; }
  }): Promise<ProductRange | undefined> {
    console.log("productData ", productData);
    const { name, description, productTypeId, properties } = productData;
    const data: ProductRangeProp | undefined = await postFetch(
      "productRanges/",
      "create",
      { name, description, productTypeId, properties },
      "creating productRange",
    );
    let productRange;
    if (data !== undefined) {
      productRange = new ProductRange(data);
    }
    console.log("productRange ", productRange);
    return productRange;
  }

  public static async updateProductRange(
    id: number,
    productData: {
      name: string;
      description: string;
      productTypeId: number;
      properties: { propertyId: number; propertyValue: string | number; };
    },
  ): Promise<ProductRange | undefined> {
    const { name, description, productTypeId, properties } = productData;
    const data: ProductRangeProp | undefined = await postFetch(
      "productRanges/",
      "update",
      { id, name, description, productTypeId, properties },
      "updating productRange",
    );
    let productRange;
    if (data !== undefined) {
      productRange = new ProductRange(data);
    }
    return productRange;
  }

  public static async deleteProductRange(
    id: number,
  ): Promise<{ success: boolean }> {
    const data: ProductRangeProp | undefined = await postFetch(
      "productRanges/",
      "delete",
      { id },
      "deleting productRange",
    );
    if (data !== undefined) {
      return { success: true };
    }
    return { success: false };
  }
}
