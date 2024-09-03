"use server";

import { ComponentType } from "@/api/componentType";
import FormCreateComponentType from "@/forms/components/ComponentTypes/FormCreateComponentTypes";

export default async function createComponentTypePage() {
  const componentTypes = await ComponentType.getComponentTypes();

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <FormCreateComponentType orderDefault={componentTypes.length + 1} />
    </main>
  );
}
