'use client';

import { formCreateComponentType } from "@/forms/schemas/SchemasComponentType";
import FormBasic from "../FormBasic";
import { postCreateComponentType } from "@/app/actions/posts";

export default function FormCreateComponentType({orderDefault}:{orderDefault: number}) {
  const { formSchema, inputs } = formCreateComponentType;
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      order: orderDefault,
    },
  };

  return(
    <FormBasic config={formConfig} inputs={inputs} fnPost={postCreateComponentType} />
  )
}