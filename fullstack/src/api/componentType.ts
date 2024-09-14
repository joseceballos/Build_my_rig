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

  public static async getComponentType(
    id: number,
  ): Promise<ComponentType | undefined> {
    try {
      const res = await fetch(`http://localhost:4000/componentTypes/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Error fetching component types: ${res.statusText}`);
      }
      const data: ComponentTypeProp = await res.json();

      const ComponentTypeItem: ComponentType = new ComponentType(data);

      return ComponentTypeItem;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async getComponentTypes(): Promise<ComponentType[]> {
    try {
      const res = await fetch("http://localhost:4000/componentTypes", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error(`Error fetching component types: ${res.statusText}`);
      }
      const data = await res.json();

      const ComponentTypes: ComponentType[] = data.map(
        (item: ComponentTypeProp) => {
          return new ComponentType(item);
        },
      );

      return ComponentTypes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public static toComponentTypesArray(data: ComponentTypeProp[]) {
    const ComponentTypes: ComponentType[] = data.map(
      (item: ComponentTypeProp) => {
        return new ComponentType(item);
      },
    );

    return ComponentTypes;
  }

  public static async createComponentType(componentType: {
    name: string;
    description: string;
    order: number;
  }): Promise<ComponentType | undefined> {
    try {
      const { name, description, order } = componentType;
      const res = await fetch("http://localhost:4000/componentTypes/create", {
        cache: "no-store",
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

  public static async updateComponentType(
    id: number,
    componentType: { name: string; description: string; order: number },
  ): Promise<ComponentType | undefined> {
    try {
      const { name, description, order } = componentType;
      const oldComponentType = await this.getComponentType(id);
      if (oldComponentType !== undefined) {
        const oldOrder = oldComponentType.order;

        if (oldOrder !== order) {
          const componentTypes = await this.getComponentTypes();
          componentTypes.map(async (componentType) => {
            let newOrder: number | undefined;
            if (
              componentType.order > oldOrder &&
              componentType.order <= order
            ) {
              newOrder = componentType.order - 1;
            } else if (
              componentType.order < oldOrder &&
              componentType.order >= order
            ) {
              newOrder = componentType.order + 1;
            }

            if (newOrder !== undefined) {
              const res = await fetch(
                "http://localhost:4000/componentTypes/update",
                {
                  cache: "no-store",
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    id: componentType.id,
                    name: componentType.name,
                    description: componentType.description,
                    order: newOrder,
                  }),
                },
              );
              if (!res.ok) {
                throw new Error(
                  `Error updating component type: ${res.statusText}`,
                );
              }
            }
          });
        }
        const res = await fetch("http://localhost:4000/componentTypes/update", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, description, order }),
        });
        if (!res.ok) {
          throw new Error(`Error updating component type: ${res.statusText}`);
        }
        const data: Promise<ComponentType> = await res.json();
        return data;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public static async deleteComponentType(
    id: number,
  ): Promise<{ success: boolean }> {
    try {
      const componentType = await this.getComponentType(id);
      if (componentType !== undefined) {
        const order = componentType.order;

        const componentTypes = await this.getComponentTypes();
        componentTypes.map(async (componentType) => {
          if (componentType.order > order) {
            const newOrder = componentType.order - 1;
            const res = await fetch(
              "http://localhost:4000/componentTypes/update",
              {
                cache: "no-store",
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: componentType.id,
                  name: componentType.name,
                  description: componentType.description,
                  order: newOrder,
                }),
              },
            );
            if (!res.ok) {
              throw new Error(
                `Error updating component type: ${res.statusText}`,
              );
            }
          }
        });

        const res = await fetch("http://localhost:4000/componentTypes/delete", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) {
          throw new Error(`Error deleting component type: ${res.statusText}`);
        }
        const data: Promise<ComponentType> = await res.json();
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
