"use client";

import { formComponentType } from "@/forms/schemas/SchemasComponentType";
import { postUpdateComponentType } from "@/actions/postsComponentType";
import { ComponentType } from "@/api/productType";
import TableElementBasic from "@/forms/components/TableElementBasic";

export default function ElementComponentTypeEdit({
  componentType,
  orderOptions,
  onChangeEditable,
}: {
  componentType: ComponentType;
  orderOptions: { value: number; name: string }[];
  onChangeEditable: (componentTypeId: number) => void;
}) {
  const { formSchema, inputs } = formComponentType(orderOptions);
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      name: componentType.name,
      description: componentType.description,
      order: componentType.order,
    },
  };

  return (
    <TableElementBasic
      config={formConfig}
      fnPost={postUpdateComponentType}
      fnOnSuccess={onChangeEditable}
      id={componentType.id}
      inputs={inputs}
    />
  );
}
