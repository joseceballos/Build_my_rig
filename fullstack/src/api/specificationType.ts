import { SpecificationTypeProp } from "@/types/api";
import { ProductType } from "./productType";

export class SpecificationType {
  public id: number;
  public name: string;
  public description?: string;
  public valueType: string;
  public filterType: string;
  public productType?: ProductType | undefined;

  public constructor({
    id,
    name,
    description,
    valueType,
    filterType,
    productType,
  }: SpecificationTypeProp) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.valueType = valueType;
    this.filterType = filterType;
    if (productType !== null && productType !== undefined) {
      this.productType = new ProductType(productType);
    }
  }

  public static async getSpecificationType(
    id: number,
  ): Promise<SpecificationType | undefined> {
    try {
      const res = await fetch(
        `http://localhost:4000/specificationTypes/${id}`,
        {
          cache: "no-store",
        },
      );
      if (!res.ok) {
        throw new Error(`Error fetching product types: ${res.statusText}`);
      }
      const data: SpecificationTypeProp = await res.json();

      const specificationTypeItem = new SpecificationType(data);

      return specificationTypeItem;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async getSpecificationTypes(): Promise<SpecificationType[]> {
    try {
      const res = await fetch("http://localhost:4000/specificationTypes", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(
          `Error fetching specification types: ${res.statusText}`,
        );
      }
      const data = await res.json();

      const SpecificationTypes: SpecificationType[] = data.map(
        (item: SpecificationTypeProp) => {
          return new SpecificationType(item);
        },
      );

      return SpecificationTypes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static async getSpecificationTypesByProductType(
    productTypeId: number,
  ): Promise<SpecificationType[]> {
    try {
      const res = await fetch(
        `http://localhost:4000/specificationTypes/byProductType/${productTypeId}`,
      );
      if (!res.ok) {
        throw new Error(
          `Error fetching specification types: ${res.statusText}`,
        );
      }

      const data: SpecificationTypeProp[] = await res.json();
      const specificationTypes = data.map((item) => {
        return new SpecificationType(item);
      });

      return specificationTypes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static toSpecificationTypesArray(data: SpecificationTypeProp[]) {
    const specificationTypes: SpecificationType[] = data.map(
      (item: SpecificationTypeProp) => {
        return new SpecificationType(item);
      },
    );

    return specificationTypes;
  }

  public static async createSpecificationType(specificationType: {
    name: string;
    description: string;
    valueType: string;
    filterType: string;
    productTypeId?: number | undefined;
  }): Promise<SpecificationType | undefined> {
    try {
      const { name, description, valueType, filterType, productTypeId } =
        specificationType;
      const res = await fetch(
        "http://localhost:4000/SpecificationTypes/create",
        {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            valueType,
            filterType,
            productTypeId,
          }),
        },
      );
      if (!res.ok) {
        throw new Error(`Error creating specification type: ${res.statusText}`);
      }
      const data: Promise<SpecificationType> = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async updateSpecificationType(
    id: number,
    specificationType: {
      name: string;
      description: string;
      valueType: string;
      filterType: string;
      productTypeId?: number;
    },
  ): Promise<SpecificationType | undefined> {
    try {
      const {
        name,
        description,
        valueType,
        filterType,
        productTypeId = undefined,
      } = specificationType;

      const res = await fetch(
        "http://localhost:4000/specificationTypes/update",
        {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            description,
            valueType,
            filterType,
            productTypeId,
          }),
        },
      );
      if (!res.ok) {
        throw new Error(`Error updating specification type: ${res.statusText}`);
      }
      const data: Promise<SpecificationType> = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async deleteSpecificationType(
    id: number,
  ): Promise<{ success: boolean }> {
    try {
      const res = await fetch(
        "http://localhost:4000/specificationTypes/delete",
        {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        },
      );
      if (!res.ok) {
        throw new Error(`Error deleting specification type: ${res.statusText}`);
      }
      const data: Promise<ProductType> = await res.json();
      return {
        success: true,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
  }
}
