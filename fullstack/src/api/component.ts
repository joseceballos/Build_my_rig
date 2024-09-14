import { ComponentProp } from "@/types/api";
import { ComponentType } from "./componentType";
import { getFetch, postFetch } from "@/lib/fetch";

export class Component {
  public id: number;
  public productId: string;
  public model: string;
  public componentType: ComponentType;

  private constructor({ id, productId, model, componentType }: ComponentProp) {
    this.id = id;
    this.productId = productId;
    this.model = model;
    this.componentType = new ComponentType(componentType);
  }

  public static async getComponent(id: number): Promise<Component | undefined> {
    console.log(id);
    const data: ComponentProp | undefined = await getFetch(
      "component",
      "components/",
      id.toString(),
    );
    let component;
    if (data !== undefined) {
      component = new Component(data);
    }
    return component;
  }

  public static async getComponents(): Promise<Component[]> {
    const data: ComponentProp[] | undefined = await getFetch(
      "components",
      "components",
      "",
    );
    let components: Component[] = [];
    if (data !== undefined) {
      components = data.map((item: ComponentProp) => {
        return new Component(item);
      });
    }
    return components;
  }

  public static async getComponentsByComponentType(
    componentTypeId: number,
  ): Promise<Component[]> {
    const data: ComponentProp[] | undefined = await getFetch(
      "components",
      "components/byComponentType/",
      componentTypeId.toString(),
    );
    let components: Component[] = [];
    if (data !== undefined) {
      components = data.map((item: ComponentProp) => {
        return new Component(item);
      });
    }
    return components;
  }

  public static toComponentsArray(data: ComponentProp[]) {
    const components: Component[] = data.map((item: ComponentProp) => {
      return new Component(item);
    });

    return components;
  }

  public static async createComponent(componentData: {
    productId: string;
    model: string;
    componentTypeId: number;
  }): Promise<Component | undefined> {
    console.log("componentData ", componentData);
    const { productId, model, componentTypeId } = componentData;
    const data: ComponentProp | undefined = await postFetch(
      "components/",
      "create",
      { productId, model, componentTypeId },
      "creating component",
    );
    let component;
    if (data !== undefined) {
      component = new Component(data);
    }
    console.log("component ", component);
    return component;
  }

  public static async updateComponent(
    id: number,
    componentData: {
      productId: string;
      model: string;
      componentTypeId: number;
    },
  ): Promise<Component | undefined> {
    const { productId, model, componentTypeId } = componentData;
    const data: ComponentProp | undefined = await postFetch(
      "components/",
      "update",
      { id, productId, model, componentTypeId },
      "creating component",
    );
    let component;
    if (data !== undefined) {
      component = new Component(data);
    }
    return component;
  }

  public static async deleteComponent(
    id: number,
  ): Promise<{ success: boolean }> {
    const data: ComponentProp | undefined = await postFetch(
      "components/",
      "delete",
      { id },
      "deleting component",
    );
    if (data !== undefined) {
      return { success: true };
    }
    return { success: false };
  }
}
