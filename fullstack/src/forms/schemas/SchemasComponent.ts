import { z } from "zod";

const formSchema = z.object({
  productId: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  componentTypeId: z.number(),
  model: z.string().min(5, {
    message: "Name must be at least 5 characters.",
  }),
  
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
  return [
    {
      name: "productId",
      title: "ProductId",
      placeHolder: "Enter product Id",
      type: "text",
    },
    {
      name: "componentTypeId",
      title: "Component Type",
      placeHolder: "Select type of component",
      type: "select",
      options: componentTypesOptions,
      defaultValue: "0",
    },
    {
      name: "model",
      title: "Model",
      placeHolder: "Enter model",
      type: "text",
    },    
  ];
}

export function formComponent(
  componentTypesOptions?: { value: number; name: string }[]
) {
  return {
    formSchema: formSchema,
    inputs: inputs(componentTypesOptions),
  };
}
