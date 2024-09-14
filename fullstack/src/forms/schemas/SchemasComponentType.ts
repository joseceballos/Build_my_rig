import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters",
  }),
  order: z.number(),
});

type formSchemaCreateType = z.infer<typeof formSchema>;

function inputs(
  orderOptions?: { value: number; name: string }[],
  defaultValue?: number,
): {
  name: keyof formSchemaCreateType;
  title: string;
  placeHolder: string;
  type: string;
  options?: { value: number | string; name: string }[] | undefined;
  defaultValue?: number | string;
}[] {
  return [
    {
      name: "name",
      title: "Name",
      placeHolder: "Enter name",
      type: "text",
    },
    {
      name: "description",
      title: "Description",
      placeHolder: "Enter description",
      type: "textarea",
    },
    {
      name: "order",
      title: "Order",
      placeHolder: "Enter order",
      type: "select",
      options: orderOptions,
      defaultValue: defaultValue,
    },
  ];
}

export function formComponentType(
  orderOptions?: { value: number; name: string }[] | undefined,
) {
  return {
    formSchema: formSchema,
    inputs: inputs(orderOptions),
  };
}
