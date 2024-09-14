import { FamilyProp } from "@/types/api";
import { getFetch, postFetch } from "@/lib/fetch";
import { ProductRange } from "./productRange";

export class Family {
  public id: number;
  public name: string;
  public year: number;
  public description: string | undefined;
  public productRange: ProductRange;

  public constructor({ id, name, description, year, productRange }: FamilyProp) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.description = description;
    this.productRange = new ProductRange(productRange);
  }

  public static async getFamily(id: number): Promise<Family | undefined> {
    const data: FamilyProp | undefined = await getFetch(
      "family",
      "families/",
      id.toString(),
    );
    let family;
    if (data !== undefined) {
      family = new Family(data);
    }
    return family;
  }

  public static async getFamilies(): Promise<Family[]> {
    const data: FamilyProp[] | undefined = await getFetch(
      "family",
      "families",
      "",
    );
    let families: Family[] = [];
    if (data !== undefined) {
      families = data.map((item) => {
        return new Family(item);
      });
    }
    return families;
  }

  public static async getFamiliesByProductRange(
    productRangeId: number,
  ): Promise<Family[]> {
    const data: FamilyProp[] | undefined = await getFetch(
      "families",
      "families/byProductRange/",
      productRangeId.toString(),
    );
    let families: Family[] = [];
    if (data !== undefined) {
      families = data.map((item) => {
        return new Family(item);
      });
    }
    return families;
  }

  public static toFamilysArray(data: FamilyProp[]) {
    const families: Family[] = data.map((item) => {
      return new Family(item);
    });

    return families;
  }

  public static async createFamily(productData: {
    name: string;
    year: number;
    description?: string;
    productRangeId: number;
    specifications: { specificationId: number; specificationValue: string | number; };
    specificationTypes: { specificationTypeId: number; };
  }): Promise<Family | undefined> {
    console.log("productData ", productData);
    const { name, year, description, productRangeId, specifications, specificationTypes } = productData;
    const data: FamilyProp | undefined = await postFetch(
      "families/",
      "create",
      { name, year, description, productRangeId, specifications, specificationTypes },
      "creating family",
    );
    let family;
    if (data !== undefined) {
      family = new Family(data);
    }
    console.log("family ", family);
    return family;
  }

  public static async updateFamily(
    id: number,
    productData: {
      name: string;
      year: number;
      description?: string;
      productRangeId: number;
      specifications: { specificationId: number; specificationValue: string | number; };
      specificationTypes: { specificationTypeId: number; };
    },
  ): Promise<Family | undefined> {
    const { name, year, description, productRangeId, specifications, specificationTypes } = productData;
    const data: FamilyProp | undefined = await postFetch(
      "families/",
      "update",
      { id, name, year, description, productRangeId, specifications, specificationTypes },
      "updating family",
    );
    let family;
    if (data !== undefined) {
      family = new Family(data);
    }
    return family;
  }

  public static async deleteFamily(
    id: number,
  ): Promise<{ success: boolean }> {
    const data: FamilyProp | undefined = await postFetch(
      "families/",
      "delete",
      { id },
      "deleting family",
    );
    if (data !== undefined) {
      return { success: true };
    }
    return { success: false };
  }
}
