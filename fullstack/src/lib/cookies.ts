import { cookies } from "next/headers";
import { ComponentType } from "@/api/productType";
import { Component } from "@/api/product";

type ComponentResumeFromCookiesReturn = {
  type: ComponentType;
  component: Component | undefined;
};

export async function getComponentsResumeFromCookies(): Promise<
  ComponentResumeFromCookiesReturn[]
> {
  const cookiesStore = cookies();
  const componentTypes = await ComponentType.getComponentTypes();

  const componentsResumeData = componentTypes.map((componentType) => {
    if (cookiesStore.has(componentType.name)) {
      return {
        type: componentType,
        componentId: +cookiesStore.get(componentType.name)!.value,
      };
    }
    return { type: componentType, componentId: undefined };
  });

  const componentsResume: ComponentResumeFromCookiesReturn[] =
    await Promise.all(
      componentsResumeData.map(async ({ type, componentId }) => {
        if (componentId !== undefined) {
          const component = await Component.getComponent(componentId);
          return { type: type, component: component };
        }
        return { type: type, component: undefined };
      }),
    );

  return componentsResume;
}
