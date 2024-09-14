"use client";

import { formSpecificationType } from "@/forms/schemas/SchemasSpecificationType";
import { postUpdateSpecificationType } from "@/actions/postsSpecificationType";
import { SpecificationType } from "@/api/specificationType";
import TableElementBasic from "@/forms/components/TableElementBasic";

export default function ElementSpecificationTypeEdit({
  specificationType,
  componentTypesOptions,
  onChangeEditable,
}: {
  specificationType: SpecificationType;
  componentTypesOptions: {
    value: number;
    name: string;
  }[];
  onChangeEditable: (specificationTypeId: number) => void;
}) {
  const { formSchema, inputs } = formSpecificationType(componentTypesOptions);
  const { name, description, valueType, filterType, componentType } =
    specificationType;
  let componentTypeId: number;
  if (componentType === undefined) {
    componentTypeId = 0;
  } else {
    componentTypeId = componentType.id;
  }
  const formConfig = {
    formSchema: formSchema,
    defaultValues: {
      name,
      description,
      valueType,
      filterType,
      componentTypeId,
    },
  };

  return (
    <TableElementBasic
      config={formConfig}
      fnPost={postUpdateSpecificationType}
      fnOnSuccess={onChangeEditable}
      id={specificationType.id}
      inputs={inputs}
    />
  );
}
