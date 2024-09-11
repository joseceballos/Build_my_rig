"use client";

import { formSpecificationType } from "@/forms/schemas/SchemasSpecificationType";
import FormBasic from "../FormBasic";
import { postCreateSpecificationType } from "@/actions/postsSpecificationType";

export default function FormCreateSpecificationType({
  componentTypesOptions,
}: {
  componentTypesOptions: {
    value: number;
    name: string;
  }[];
}) {
  const { formSchema, inputs } = formSpecificationType(componentTypesOptions);
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      valueType: "number",
      filterType: "select",
    },
  };

  return (
    <FormBasic
      config={formConfig}
      inputs={inputs}
      fnPost={postCreateSpecificationType}
    />
  );
}
