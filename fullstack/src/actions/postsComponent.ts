"use server";

import { Component } from "@/api/component";
import { formComponent } from "@/forms/schemas/SchemasComponent";

export async function postCreateComponent(data: FormData) {
  console.log("postCreateComponent");
  const productId = data.get("productId") as string;
  const model = data.get("model") as string;
  const componentTypeId = parseInt(data.get("componentTypeId") as string);

  const parsedData = formComponent().formSchema.safeParse({
    productId,
    componentTypeId,
    model,
  });

  if (!parsedData.success) {
    return { success: false, errors: parsedData.error.flatten() };
  }

  await Component.createComponent(parsedData.data);
  return {
    success: true,
  };
}

export async function postUpdateComponent(id: number, data: FormData) {
  const productId = data.get("productId") as string;
  const model = data.get("model") as string;
  const componentTypeId = parseInt(data.get("componentTypeId") as string);

  const parsedData = formComponent().formSchema.safeParse({
    productId,
    componentTypeId,
    model,
  });

  if (!parsedData.success) {
    return { success: false, errors: parsedData.error.flatten() };
  }

  await Component.updateComponent(id, parsedData.data);
  return {
    success: true,
  };
}

export async function postDeleteComponent(id: number) {
  return await Component.deleteComponent(id);
}
