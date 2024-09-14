"use server";

import { ComponentType } from "@/api/productType";
import FormCreateComponentType from "@/forms/components/ComponentTypes/FormCreateComponentType";

export default async function createComponentTypePage() {
  const componentTypes = await ComponentType.getComponentTypes();
  const orderOptions: { value: number; name: string }[] = componentTypes.map(
    (element) => ({ value: element.order, name: element.order.toString() }),
  );
  orderOptions.push({
    value: componentTypes.length + 1,
    name: (componentTypes.length + 1).toString(),
  });

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <FormCreateComponentType orderOptions={orderOptions} />
    </main>
  );
}
