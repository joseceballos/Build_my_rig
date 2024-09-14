"use server";

import { Specification } from "@/api/specification";
import { formSpecification } from "@/forms/schemas/SchemasSpecification";

export async function postCreateSpecification(data: FormData) {
  const value = data.get("value") as string;
  const description = data.get("description") as string;
  const specificationTypeId = parseInt(
    data.get("specificationTypeId") as string,
  );

  const parsedData = formSpecification().formSchema.safeParse({
    value,
    specificationTypeId,
    description,
  });

  if (!parsedData.success) {
    return { success: false, errors: parsedData.error.flatten() };
  }

  await Specification.createSpecification(parsedData.data);
  return {
    success: true,
  };
}

export async function postUpdateSpecification(id: number, data: FormData) {
  const value = data.get("value") as string;
  const description = data.get("description") as string;
  const specificationTypeId = parseInt(
    data.get("specificationTypeId") as string,
  );

  const parsedData = formSpecification().formSchema.safeParse({
    value,
    specificationTypeId,
    description,
  });

  if (!parsedData.success) {
    return { success: false, errors: parsedData.error.flatten() };
  }

  await Specification.updateSpecification(id, parsedData.data);
  return {
    success: true,
  };
}

export async function postDeleteSpecification(id: number) {
  return await Specification.deleteSpecification(id);
}
