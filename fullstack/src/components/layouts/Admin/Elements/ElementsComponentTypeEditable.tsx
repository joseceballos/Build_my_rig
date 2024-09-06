"use client";

import { ComponentType } from "@/api/componentType";
import { ComponentTypeProp } from "@/types/api";
import { useState } from "react";
import ElementComponentTypeView from "./ElementComponentTypeView";
import ElementComponentTypeEdit from "./ElementComponentTypeEdit";

type elements = {
  editing: boolean;
  componentType: ComponentType;
}[];

export default function ElementsComponentTypeEditable({
  plainElements,
}: {
  plainElements: ComponentTypeProp[];
}) {
  const componentTypes = ComponentType.toComponentTypesArray(plainElements);
  const [elements, setElements] = useState<elements>(() => {
    const elementsBuilder: elements = componentTypes.map((item) => {
      return {
        editing: false,
        componentType: item,
      };
    });
    return elementsBuilder;
  });

  console.log(elements);

  const orderOptions: number[] = elements.map(
    (element) => element.componentType.order
  );

  async function handleChangeEditable(id: number) {
    const element = elements.find((element) => element.componentType.id === id);

    if (element?.editing) {
      const componentType: ComponentType | undefined =
        await ComponentType.getComponentType(id);

      if (componentType !== undefined) {
        setElements((prevState) => {
          const nextState = prevState.map((e) => ({ ...e }));

          const oldOrder = nextState.find(
            (element) => element.componentType.id === id
          )?.componentType.order;
          const newOrder = componentType.order;

          if (oldOrder !== newOrder) {
            nextState.map((element, index) => {
              if (element.componentType.id === componentType.id) {
                nextState[index] = {
                  editing: false,
                  componentType: componentType,
                };
              } else if (
                element.componentType.order > oldOrder! &&
                element.componentType.order <= newOrder
              ) {
                nextState[index].componentType = {
                  ...nextState[index].componentType,
                  order: (nextState[index].componentType.order -= 1),
                };
              } else if (
                element.componentType.order < oldOrder! &&
                element.componentType.order >= newOrder
              ) {
                nextState[index].componentType = {
                  ...nextState[index].componentType,
                  order: (nextState[index].componentType.order += 1),
                };
              }
            });

            nextState.sort(
              (a, b) => a.componentType.order - b.componentType.order
            );
          } else {
            console.log("not order");
            const index = nextState.findIndex((e) => e.componentType.id === id);
            console.log("index", index);
            if (index > -1) {
              nextState[index] = {
                editing: false,
                componentType: componentType,
              };
            }
            console.log(nextState[index]);
          }

          return nextState;
        });
      }
    } else {
      setElements((prevState) => {
        const nextState = prevState.map((e) => ({ ...e }));
        const index = nextState.findIndex((e) => e.componentType.id === id);

        if (index > -1) {
          nextState[index].editing = true;
        }

        return nextState;
      });
    }
  }

  return (
    <>
      {elements.map(({ editing, componentType }) => {
        if (editing) {
          return (
            <ElementComponentTypeEdit
              key={componentType.id}
              componentType={componentType}
              orderOptions={orderOptions}
              onChangeEditable={() => handleChangeEditable(componentType.id)}
            />
          );
        } else {
          return (
            <ElementComponentTypeView
              key={componentType.id}
              componentType={componentType}
              onChangeEditable={() => handleChangeEditable(componentType.id)}
            />
          );
        }
      })}
    </>
  );
}
