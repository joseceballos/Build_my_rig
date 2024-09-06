'use client';

import { formCreateComponentType } from "@/forms/schemas/SchemasComponentType";
import { updateCreateComponentType } from "@/app/actions/posts";
import { ComponentType } from "@/api/componentType";
import TableElementBasic from "../../../../forms/components/TableElementBasic";

export default function ElementComponentTypeEdit({componentType, orderOptions, onChangeEditable}:{componentType: ComponentType, orderOptions: number[], onChangeEditable: (componentTypeId: number) => void}) {
  const { formSchema, inputs } = formCreateComponentType(orderOptions);
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      name: componentType.name,
      description: componentType.description,
      order: componentType.order,
    },
  };

  return(
    <TableElementBasic config={formConfig} fnPost={updateCreateComponentType} fnOnSuccess={onChangeEditable} id={componentType.id}  inputs={inputs}   />
  )
}