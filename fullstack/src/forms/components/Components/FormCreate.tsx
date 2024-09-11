"use client";

import { formComponent } from "@/forms/schemas/SchemasComponent";
import FormBasic from "../FormBasic";
import { postCreateComponent } from "@/actions/postsComponent";

export default function FormCreateComponent({
  componentTypesOptions,
}: {
  componentTypesOptions: {
    value: number;
    name: string;
  }[];
}) {
  const { formSchema, inputs } = formComponent(componentTypesOptions);
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {},
  };

  return (
    <FormBasic
      config={formConfig}
      inputs={inputs}
      fnPost={postCreateComponent}
    />
  );
}
