import { ProductTypeProp } from "@/types/api";

export class ProductType {
  public id: number;
  public name: string;
  public description: string;
  public order: number;

  public constructor({ id, name, description, order }: ProductTypeProp) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.order = order;
  }

  public static async getProductType(
    id: number,
  ): Promise<ProductType | undefined> {
    try {
      const res = await fetch(`http://localhost:4000/productTypes/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Error fetching product types: ${res.statusText}`);
      }
      const data: ProductTypeProp = await res.json();

      const ProductTypeItem: ProductType = new ProductType(data);

      return ProductTypeItem;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async getProductTypes(): Promise<ProductType[]> {
    try {
      const res = await fetch("http://localhost:4000/productTypes", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Error fetching product types: ${res.statusText}`);
      }
      const data = await res.json();

      const ProductTypes: ProductType[] = data.map(
        (item: ProductTypeProp) => {
          return new ProductType(item);
        },
      );

      return ProductTypes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static toProductTypesArray(data: ProductTypeProp[]) {
    const ProductTypes: ProductType[] = data.map(
      (item: ProductTypeProp) => {
        return new ProductType(item);
      },
    );

    return ProductTypes;
  }

  public static async createProductType(productType: {
    name: string;
    description: string;
    order: number;
  }): Promise<ProductType | undefined> {
    try {
      const { name, description, order } = productType;
      const res = await fetch("http://localhost:4000/productTypes/create", {
        cache: "no-store",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, order }),
      });
      if (!res.ok) {
        throw new Error(`Error creating product type: ${res.statusText}`);
      }
      const data: Promise<ProductType> = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async updateProductType(
    id: number,
    productType: { name: string; description: string; order: number },
  ): Promise<ProductType | undefined> {
    try {
      const { name, description, order } = productType;
      const oldProductType = await this.getProductType(id);
      if (oldProductType !== undefined) {
        const oldOrder = oldProductType.order;

        if (oldOrder !== order) {
          const productTypes = await this.getProductTypes();
          productTypes.map(async (productType) => {
            let newOrder: number | undefined;
            if (
              productType.order > oldOrder &&
              productType.order <= order
            ) {
              newOrder = productType.order - 1;
            } else if (
              productType.order < oldOrder &&
              productType.order >= order
            ) {
              newOrder = productType.order + 1;
            }

            if (newOrder !== undefined) {
              const res = await fetch(
                "http://localhost:4000/productTypes/update",
                {
                  cache: "no-store",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: productType.id,
                    name: productType.name,
                    description: productType.description,
                    order: newOrder,
                  }),
                },
              );
              if (!res.ok) {
                throw new Error(
                  `Error updating product type: ${res.statusText}`,
                );
              }
            }
          });
        }
        const res = await fetch("http://localhost:4000/productTypes/update", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, description, order }),
        });
        if (!res.ok) {
          throw new Error(`Error updating product type: ${res.statusText}`);
        }
        const data: Promise<ProductType> = await res.json();
        return data;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async deleteProductType(
    id: number,
  ): Promise<{ success: boolean }> {
    try {
      const productType = await this.getProductType(id);
      if (productType !== undefined) {
        const order = productType.order;

        const productTypes = await this.getProductTypes();
        productTypes.map(async (productType) => {
          if (productType.order > order) {
            const newOrder = productType.order - 1;
            const res = await fetch(
              "http://localhost:4000/productTypes/update",
              {
                cache: "no-store",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: productType.id,
                  name: productType.name,
                  description: productType.description,
                  order: newOrder,
                }),
              },
            );
            if (!res.ok) {
              throw new Error(
                `Error updating product type: ${res.statusText}`,
              );
            }
          }
        });

        const res = await fetch("http://localhost:4000/productTypes/delete", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) {
          throw new Error(`Error deleting product type: ${res.statusText}`);
        }
        const data: Promise<ProductType> = await res.json();
        return {
          success: true,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
      };
    }
    return {
      success: false,
    };
  }
}
