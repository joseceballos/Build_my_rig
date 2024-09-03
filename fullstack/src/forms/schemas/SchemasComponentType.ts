"use client";

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

const inputsCreate: {
  name: keyof formSchemaCreateType;
  title: string;
  placeHolder: string;
  type: string;
}[] = [
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
    type: "text",
  },
  {
    name: "order",
    title: "Order",
    placeHolder: "Enter order",
    type: "number",
  },
];

export const formCreateComponentType = {
  formSchema: formSchemaCreate,
  inputs: inputsCreate,
};
