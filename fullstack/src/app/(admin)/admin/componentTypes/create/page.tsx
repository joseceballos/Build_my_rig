"use server";

import { ComponentType } from "@/api/componentType";
import FormCreateComponentType from "@/forms/components/ComponentTypes/FormCreateComponentType";

export default async function createComponentTypePage() {
  const componentTypes = await ComponentType.getComponentTypes();
  const orderOptions: number[] = componentTypes.map((element) => element.order);
  orderOptions.push(componentTypes.length + 1);


  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <FormCreateComponentType orderOptions={orderOptions} />
    </main>
  );
}
