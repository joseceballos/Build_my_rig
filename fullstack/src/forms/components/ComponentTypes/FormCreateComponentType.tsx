'use client';

import { formComponentType } from "@/forms/schemas/SchemasComponentType";
import FormBasic from "../FormBasic";
import { postCreateComponentType } from "@/actions/postsComponentType";

export default function FormCreateComponentType({orderOptions}:{orderOptions: { value: number; name: string }[]}) {
  const { formSchema, inputs } = formComponentType(orderOptions);
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      order: orderOptions[(orderOptions.length)-1].value,
    },
  };

  return(
    <FormBasic config={formConfig} inputs={inputs} fnPost={postCreateComponentType} />
  )
}