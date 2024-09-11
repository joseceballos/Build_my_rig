"use server";

import { ComponentType } from "@/api/componentType";
import { SpecificationType } from "@/api/specificationType";
import FormCreateSpecificationType from "@/forms/components/SpecificationTypes/FormCreate";

export default async function createSpecificationTypePage() {
  const specificationTypes = await SpecificationType.getSpecificationTypes();
  const componentTypes = await ComponentType.getComponentTypes();
  const componentTypesOptions = [{value: 0, name: "<No Type>"}, ...componentTypes.map((componentType) => ({ value: componentType.id, name: componentType.name }))];

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <FormCreateSpecificationType componentTypesOptions={componentTypesOptions} />
    </main>
  );
}
