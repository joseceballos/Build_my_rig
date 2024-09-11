"use client";

import { Component } from "@/api/component";
import { ComponentTypeProp, ComponentProp } from "@/types/api";
import { useState } from "react";
import ElementComponentView from "./ElementComponentView";
import ElementComponentEdit from "./ElementComponentEdit";
import { ComponentType } from "@/api/componentType";

type elements = {
  editing: boolean;
  component: Component;
}[];

export default function ElementsComponentEditable({
  plainElements, plainComponentTypes
}: {
  plainElements: ComponentProp[];
  plainComponentTypes: ComponentTypeProp[];
}) {
  const componentTypes = ComponentType.toComponentTypesArray(plainComponentTypes);
  const components =
    Component.toComponentsArray(plainElements);
  const [elements, setElements] = useState<elements>(() => {
    const elementsBuilder: elements = components.map((item) => {
      return {
        editing: false,
        component: item,
      };
    });
    return elementsBuilder;
  });

  const componentTypesOptions = [...componentTypes.map((componentType) => ({ value: componentType.id, name: componentType.name }))];

  async function handleChangeEditable(id: number) {
    console.log("id: ",id);
    const element = elements.find(
      (element) => element.component.id === id
    );
    console.log("element: ", element);
    let component: Component | undefined;
    if (element?.editing) {
      component = await Component.getComponent(id);
      console.log("updated Specification", component);
    }
    

    setElements((prevState) => {
      const nextState = prevState.map((e) => ({ ...e }));
      const index = nextState.findIndex((e) => e.component.id === id);

      if (index > -1) {
        if (nextState[index].editing && component !== undefined) {
          nextState[index].component = component;
        }
        nextState[index].editing = !nextState[index].editing;
      }

      return nextState;
    });
  }

  async function handleDelete(id: number) {
    const deletedElement = elements.find(
      (element) => element.component.id === id
    );
    const deletedIndex = elements.findIndex(
      (element) => element.component.id === id
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
      {elements.map(({ editing, component }) => {
        if (editing) {
          return (
            <ElementComponentEdit
              key={component.id}
              component={component}
              componentTypesOptions={componentTypesOptions}
              onChangeEditable={() =>
                handleChangeEditable(component.id)
              }
            />
          );
        } else {
          return (
            <ElementComponentView
              key={component.id}
              component={component}
              onChangeEditable={() =>
                handleChangeEditable(component.id)
              }
              onDelete={() => handleDelete(component.id)}
            />
          );
        }
      })}
    </>
  );
}
