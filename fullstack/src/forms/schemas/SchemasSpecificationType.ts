import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  componentTypeId: z.number(),
  description: z.string(),
  valueType: z.string(),
  filterType: z.string(),
  
});

type formSchemaCreateType = z.infer<typeof formSchema>;

function inputs(componentTypesOptions?: { value: number; name: string }[]): {
  name: keyof formSchemaCreateType;
  title: string;
  placeHolder: string;
  type: string;
  options?: { value: number | string; name: string }[];
  defaultValue?: number | string;
}[] {
  const valueTypeOptions = [
    { value: "number", name: "number" },
    { value: "text", name: "text" },
  ];
  const filterTypeOptions = [
    { value: "select", name: "select" },
    { value: "checkbox", name: "checkbox" },
    { value: "slider", name: "slider" },
  ];
  return [
    {
      name: "name",
      title: "Name",
      placeHolder: "Enter name",
      type: "text",
    },
    {
      name: "componentTypeId",
      title: "Component Type",
      placeHolder: "Select type of component",
      type: "select",
      options: componentTypesOptions,
      defaultValue: "select",
    },
    {
      name: "description",
      title: "Description",
      placeHolder: "Enter description",
      type: "textarea",
    },
    {
      name: "valueType",
      title: "Value",
      placeHolder: "Select type of value",
      type: "select",
      options: valueTypeOptions,
      defaultValue: "number",
    },
    {
      name: "filterType",
      title: "Filter",
      placeHolder: "Select type of filtering",
      type: "select",
      options: filterTypeOptions,
      defaultValue: "select",
    },
    
  ];
}

export function formSpecificationType(
  componentTypesOptions?: { value: number; name: string }[]
) {
  return {
    formSchema: formSchema,
    inputs: inputs(componentTypesOptions),
  };
}
