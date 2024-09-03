import { ComponentTypeProp } from "@/types/api";

export class ComponentType {
  public id: number;
  public name: string;
  public description: string;
  public order: number;

  public constructor({ id, name, description, order }: ComponentTypeProp) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.order = order;
  }

  public static async getComponentTypes(): Promise<ComponentType[]> {
    try {
      const res = await fetch("http://localhost:4000/componentTypes");
      if (!res.ok) {
        throw new Error(`Error fetching component types: ${res.statusText}`);
      }
      const data = await res.json();

      const ComponentTypes: ComponentType[] = data.map(
        (item: ComponentTypeProp) => {
          return new ComponentType(item);
        }
      );

      return ComponentTypes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static async createComponentType(
    componentType: { name: string ; description: string; order: number;}
  ): Promise<ComponentType | undefined> {
    try {
      const { name, description, order } = componentType;
      const res = await fetch("http://localhost:4000/createComponentType", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, order }),
      });
      if (!res.ok) {
        throw new Error(`Error creating component type: ${res.statusText}`);
      }
      const data: Promise<ComponentType> = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
