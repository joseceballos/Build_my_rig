"use client";

import { ComponentType } from "@/api/productType";
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

  const orderOptions: { value: number; name: string }[] = elements.map(
    (element) => ({
      value: element.componentType.order,
      name: element.componentType.order.toString(),
    }),
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
            (element) => element.componentType.id === id,
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
              (a, b) => a.componentType.order - b.componentType.order,
            );
          } else {
            const index = nextState.findIndex((e) => e.componentType.id === id);
            if (index > -1) {
              nextState[index] = {
                editing: false,
                componentType: componentType,
              };
            }
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

  async function handleDelete(id: number) {
    const deletedElement = elements.find(
      (element) => element.componentType.id === id,
    );
    const deletedIndex = elements.findIndex(
      (element) => element.componentType.id === id,
    );
    if (deletedElement !== undefined) {
      setElements((prevState) => {
        const nextState = prevState.map((e) => ({ ...e }));

        nextState.splice(deletedIndex, 1);
        nextState.map((element, index) => {
          if (
            deletedElement.componentType.order < element.componentType.order
          ) {
            nextState[index].componentType = {
              ...nextState[index].componentType,
              order: (nextState[index].componentType.order -= 1),
            };
          }
        });
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
              onDelete={() => handleDelete(componentType.id)}
            />
          );
        }
      })}
    </>
  );
}
