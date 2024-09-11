"use client";

import { formComponent } from "@/forms/schemas/SchemasComponent";
import { postUpdateComponent } from "@/actions/postsComponent";
import { Component } from "@/api/component";
import TableElementBasic from "@/forms/components/TableElementBasic";

export default function ElementComponentEdit({
  component,
  componentTypesOptions,
  onChangeEditable,
}: {
  component: Component;
  componentTypesOptions: {
    value: number;
    name: string;
  }[];
  onChangeEditable: (componentId: number) => void;
}) {
  const { formSchema, inputs } = formComponent(componentTypesOptions);
  const { productId, model, componentType } = component;
  let componentTypeId: number;
  if (componentType === undefined) {
    componentTypeId = 0;
  } else {
    componentTypeId = componentType.id;
  }
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      productId,
      model,
      componentType,
    },
  };

  return (
    <TableElementBasic
      config={formConfig}
      fnPost={postUpdateComponent}
      fnOnSuccess={onChangeEditable}
      id={component.id}
      inputs={inputs}
    />
  );
}
