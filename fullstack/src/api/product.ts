import { ProductProp } from "@/types/api";
import { getFetch, postFetch } from "@/lib/fetch";
import { Family } from "./family";

export class Product {
  public id: number;
  public productId: string;
  public model: string;
  public family: Family;

  private constructor({ id, productId, model, family }: ProductProp) {
    this.id = id;
    this.productId = productId;
    this.model = model;
    this.family = new Family(family);
  }

  public static async getProduct(id: number): Promise<Product | undefined> {
    console.log(id);
    const data: ProductProp | undefined = await getFetch(
      "product",
      "products/",
      id.toString(),
    );
    let product;
    if (data !== undefined) {
      product = new Product(data);
    }
    return product;
  }

  public static async getProducts(): Promise<Product[]> {
    const data: ProductProp[] | undefined = await getFetch(
      "products",
      "products",
      "",
    );
    let products: Product[] = [];
    if (data !== undefined) {
      products = data.map((item: ProductProp) => {
        return new Product(item);
      });
    }
    return products;
  }

  public static async getProductsByProductType(
    productTypeId: number,
  ): Promise<Product[]> {
    const data: ProductProp[] | undefined = await getFetch(
      "products",
      "products/byProductType/",
      productTypeId.toString(),
    );
    let products: Product[] = [];
    if (data !== undefined) {
      products = data.map((item: ProductProp) => {
        return new Product(item);
      });
    }
    return products;
  }

  public static toProductsArray(data: ProductProp[]) {
    const products: Product[] = data.map((item: ProductProp) => {
      return new Product(item);
    });

    return products;
  }

  public static async createProduct(productData: {
    productId: string;
    model: string;
    productTypeId: number;
  }): Promise<Product | undefined> {
    console.log("productData ", productData);
    const { productId, model, productTypeId } = productData;
    const data: ProductProp | undefined = await postFetch(
      "products/",
      "create",
      { productId, model, productTypeId },
      "creating product",
    );
    let product;
    if (data !== undefined) {
      product = new Product(data);
    }
    console.log("product ", product);
    return product;
  }

  public static async updateProduct(
    id: number,
    productData: {
      productId: string;
      model: string;
      productTypeId: number;
    },
  ): Promise<Product | undefined> {
    const { productId, model, productTypeId } = productData;
    const data: ProductProp | undefined = await postFetch(
      "products/",
      "update",
      { id, productId, model, productTypeId },
      "creating product",
    );
    let product;
    if (data !== undefined) {
      product = new Product(data);
    }
    return product;
  }

  public static async deleteProduct(
    id: number,
  ): Promise<{ success: boolean }> {
    const data: ProductProp | undefined = await postFetch(
      "products/",
      "delete",
      { id },
      "deleting product",
    );
    if (data !== undefined) {
      return { success: true };
    }
    return { success: false };
  }
}
