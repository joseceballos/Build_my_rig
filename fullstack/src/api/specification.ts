import { SpecificationProp } from "@/types/api";
import { SpecificationType } from "./specificationType";
import { getFetch, postFetch } from "@/lib/fetch";

export class Specification {
  public id: number;
  public value: string;
  public description?: string | undefined;
  public specificationType: SpecificationType;

  private constructor({
    id,
    value,
    description,
    specificationType,
  }: SpecificationProp) {
    this.id = id;
    this.value = value;
    this.description = description;
    this.specificationType = new SpecificationType(specificationType);
  }

  public static async getSpecification(
    id: number,
  ): Promise<Specification | undefined> {
    const data: SpecificationProp | undefined = await getFetch(
      "specification",
      "specifications/",
      id.toString(),
    );
    let specification;
    if (data !== undefined) {
      specification = new Specification(data);
    }
    return specification;
  }

  public static async getSpecificationsBySpecificationType(
    specificationTypeId: number,
  ): Promise<Specification[]> {
    const data: SpecificationProp[] | undefined = await getFetch(
      "specifications",
      "specifications/bySpecificationType",
      specificationTypeId.toString(),
    );
    let specifications: Specification[] = [];
    if (data !== undefined) {
      specifications = data.map((item: SpecificationProp) => {
        return new Specification(item);
      });
    }
    return specifications;
  }

  public static async getSpecificationsByComponent(
    componentId: number,
  ): Promise<Specification[]> {
    const data: SpecificationProp[] | undefined = await getFetch(
      "specifications",
      "specifications/byComponent/",
      componentId.toString(),
    );
    let specifications: Specification[] = [];
    if (data !== undefined) {
      specifications = data.map((item: SpecificationProp) => {
        return new Specification(item);
      });
    }
    return specifications;
  }

  public static toSpecificationsArray(data: SpecificationProp[]) {
    const specifications: Specification[] = data.map(
      (item: SpecificationProp) => {
        return new Specification(item);
      },
    );

    return specifications;
  }

  public static async createSpecification(specificationData: {
    value: string;
    description?: string;
    specificationTypeId: number;
  }): Promise<Specification | undefined> {
    const { value, description, specificationTypeId } = specificationData;

    const data: SpecificationProp | undefined = await postFetch(
      "specifications/",
      "create",
      [value, description, specificationTypeId],
      "creating specification",
    );
    let specification;
    if (data !== undefined) {
      specification = new Specification(data);
    }
    return specification;
  }

  public static async updateSpecification(
    id: number,
    specificationData: {
      value: string;
      description?: string;
      specificationTypeId: number;
    },
  ): Promise<Specification | undefined> {
    const { value, description, specificationTypeId } = specificationData;
    const data: SpecificationProp | undefined = await postFetch(
      "specifications/",
      "update",
      [id, value, description, specificationTypeId],
      "creating specification",
    );
    let specification;
    if (data !== undefined) {
      specification = new Specification(data);
    }
    return specification;
  }

  public static async deleteSpecification(
    id: number,
  ): Promise<{ success: boolean }> {
    const data: SpecificationProp | undefined = await postFetch(
      "specifications/",
      "delete",
      [id],
      "deleting specification",
    );
    if (data !== undefined) {
      return { success: true };
    }
    return { success: false };
  }
}
