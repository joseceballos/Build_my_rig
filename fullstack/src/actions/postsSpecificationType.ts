"use server";

import { SpecificationType } from "@/api/specificationType";
import { formSpecificationType } from "@/forms/schemas/SchemasSpecificationType";

export async function postCreateSpecificationType(data: FormData) {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const valueType = data.get("valueType") as string;
  const filterType = data.get("filterType") as string;
  const componentTypeId = parseInt(data.get("componentTypeId") as string);

  const parsedData = formSpecificationType().formSchema.safeParse({
    name,
    componentTypeId,
    description,
    valueType,
    filterType,
  });

  if (!parsedData.success) {
    return { success: false, errors: parsedData.error.flatten() };
  }

  await SpecificationType.createSpecificationType(parsedData.data);
  return {
    success: true,
  };
}

export async function postUpdateSpecificationType(id: number, data: FormData) {
  const name = data.get("name") as string;
  const description = data.get("description") as string;
  const valueType = data.get("valueType") as string;
  const filterType = data.get("filterType") as string;
  const componentTypeId = parseInt(data.get("componentTypeId") as string);

  const parsedData = formSpecificationType().formSchema.safeParse({
    name,
    componentTypeId,
    description,
    valueType,
    filterType,
  });

  if (!parsedData.success) {
    return { success: false, errors: parsedData.error.flatten() };
  }

  await SpecificationType.updateSpecificationType(id, parsedData.data);
  return {
    success: true,
  };
}

export async function postDeleteSpecificationType(id: number) {
  return await SpecificationType.deleteSpecificationType(id);
}
