"use server";

import { ComponentType } from "@/api/productType";
import { Component } from "@/api/product";
import FormCreateComponent from "@/forms/components/Components/FormCreate";

export default async function createComponentPage() {
  const components = await Component.getComponents();
  const componentTypes = await ComponentType.getComponentTypes();
  const componentTypesOptions = [
    ...componentTypes.map((componentType) => ({
      value: componentType.id,
      name: componentType.name,
    })),
  ];

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <FormCreateComponent componentTypesOptions={componentTypesOptions} />
    </main>
  );
}
