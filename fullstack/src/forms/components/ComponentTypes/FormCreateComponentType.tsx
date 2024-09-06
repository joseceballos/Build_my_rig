'use client';

import { formCreateComponentType } from "@/forms/schemas/SchemasComponentType";
import FormBasic from "../FormBasic";
import { postCreateComponentType } from "@/app/actions/posts";

export default function FormCreateComponentType({orderOptions}:{orderOptions: number[]}) {
  const { formSchema, inputs } = formCreateComponentType(orderOptions);
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      order: orderOptions[(orderOptions.length)-1],
    },
  };

  return(
    <FormBasic config={formConfig} inputs={inputs} fnPost={postCreateComponentType} />
  )
}