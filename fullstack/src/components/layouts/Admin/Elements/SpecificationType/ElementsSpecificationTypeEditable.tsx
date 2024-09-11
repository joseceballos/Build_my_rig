"use client";

import { SpecificationType } from "@/api/specificationType";
import { ComponentTypeProp, SpecificationTypeProp } from "@/types/api";
import { useState } from "react";
import ElementSpecificationTypeView from "./ElementSpecificationTypeView";
import ElementSpecificationTypeEdit from "./ElementSpecificationTypeEdit";
import { ComponentType } from "@/api/componentType";

type elements = {
  editing: boolean;
  specificationType: SpecificationType;
}[];

export default function ElementsSpecificationTypeEditable({
  plainElements, plainComponentTypes
}: {
  plainElements: SpecificationTypeProp[];
  plainComponentTypes: ComponentTypeProp[];
}) {
  const componentTypes = ComponentType.toComponentTypesArray(plainComponentTypes);
  const specificationTypes =
    SpecificationType.toSpecificationTypesArray(plainElements);
  const [elements, setElements] = useState<elements>(() => {
    const elementsBuilder: elements = specificationTypes.map((item) => {
      return {
        editing: false,
        specificationType: item,
      };
    });
    return elementsBuilder;
  });

  const componentTypesOptions = [{value: 0, name: "<No Type>"}, ...componentTypes.map((componentType) => ({ value: componentType.id, name: componentType.name }))];

  async function handleChangeEditable(id: number) {
    console.log("id: ",id);
    const element = elements.find(
      (element) => element.specificationType.id === id
    );
    console.log("element: ", element);
    let specificationType: SpecificationType | undefined;
    if (element?.editing) {
      specificationType = await SpecificationType.getSpecificationType(id);
      console.log("updated Specification", specificationType);
    }
    

    setElements((prevState) => {
      const nextState = prevState.map((e) => ({ ...e }));
      const index = nextState.findIndex((e) => e.specificationType.id === id);

      if (index > -1) {
        if (nextState[index].editing && specificationType !== undefined) {
          nextState[index].specificationType = specificationType;
        }
        nextState[index].editing = !nextState[index].editing;
      }

      return nextState;
    });
  }

  async function handleDelete(id: number) {
    const deletedElement = elements.find(
      (element) => element.specificationType.id === id
    );
    const deletedIndex = elements.findIndex(
      (element) => element.specificationType.id === id
    );
    if (deletedElement !== undefined) {
      setElements((prevState) => {
        const nextState = prevState.map((e) => ({ ...e }));

        nextState.splice(deletedIndex, 1);
        return nextState;
      });
    }
  }

  return (
    <>
      {elements.map(({ editing, specificationType }) => {
        if (editing) {
          return (
            <ElementSpecificationTypeEdit
              key={specificationType.id}
              specificationType={specificationType}
              componentTypesOptions={componentTypesOptions}
              onChangeEditable={() =>
                handleChangeEditable(specificationType.id)
              }
            />
          );
        } else {
          return (
            <ElementSpecificationTypeView
              key={specificationType.id}
              specificationType={specificationType}
              onChangeEditable={() =>
                handleChangeEditable(specificationType.id)
              }
              onDelete={() => handleDelete(specificationType.id)}
            />
          );
        }
      })}
    </>
  );
}
