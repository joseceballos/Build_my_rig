import { ComponentProp } from "@/types/api";
import { ComponentType } from "./componentType";
import { ok } from "assert";

export class Component {
  public id: number;
  public productId: string;
  public model: string;
  public componentType: ComponentType;

  private constructor(
    { id, productId, model, type }: ComponentProp
  ) {
    this.id = id;
    this.productId = productId;
    this.model = model;
    this.componentType = new ComponentType(type);
  }

  public static async getComponent(id: number): Promise<Component | undefined> {
    try {
      const res = await fetch(`http://localhost:4000/component/${id}`);
      if (!res.ok) {
        throw new Error(`Error fetching component: ${res.statusText}`);
      }

      const data: ComponentProp = await res.json();
      return new Component(data);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async getComponentsByType(typeId: number): Promise<Component[] | undefined> {
    try {
      const res = await fetch(`http://localhost:4000/componentsByType/${typeId}`);
      if (!res.ok) {
        throw new Error(`Error fetching components: ${res.statusText}`);
      }

      const data: ComponentProp[] = await res.json();
      const components = data.map((item) => {
        return new Component(item);
      })
      
      return components;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
