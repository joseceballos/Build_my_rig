import { z } from "zod";

const formSchemaCreate = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "description must be at least 10 characters",
  }),
  order: z.number().min(1, {
    message: "order can't be negative",
  }),
});

type formSchemaCreateType = z.infer<typeof formSchemaCreate>;

function inputsCreate(orderOptions?: number[], defaultValue?: number): {
  name: keyof formSchemaCreateType;
  title: string;
  placeHolder: string;
  type: string;
  options?: number[] | string[];
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

export function formCreateComponentType(orderOptions?: number[]) {
  return {
    formSchema: formSchemaCreate,
    inputs: inputsCreate(orderOptions),
  };
}
