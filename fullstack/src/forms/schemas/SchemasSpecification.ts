import { z } from "zod";

const formSchema = z.object({
  value: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  specificationTypeId: z.number(),
  description: z.string(),
  
});

type formSchemaCreateType = z.infer<typeof formSchema>;

function inputs(specificationTypesOptions?: { value: number; name: string }[]): {
  name: keyof formSchemaCreateType;
  title: string;
  placeHolder: string;
  type: string;
  options?: { value: number | string; name: string }[];
  defaultValue?: number | string;
}[] {
  return [
    {
      name: "value",
      title: "Value",
      placeHolder: "Enter value",
      type: "text",
    },
    {
      name: "specificationTypeId",
      title: "Specification Type",
      placeHolder: "Select type of specification",
      type: "select",
      options: specificationTypesOptions,
      defaultValue: "0",
    },
    {
      name: "description",
      title: "Description",
      placeHolder: "Enter description",
      type: "textarea",
    },    
  ];
}

export function formSpecification(
  specificationTypesOptions?: { value: number; name: string }[]
) {
  return {
    formSchema: formSchema,
    inputs: inputs(specificationTypesOptions),
  };
}
