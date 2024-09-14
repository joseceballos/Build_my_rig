"use server";

import { Component } from "@/api/product";

type tableDataHeaders = {
  title: string;
  className: string;
}[];

type tableDataElements = Component[];

export default async function tableDataComponents(
  componentTypeId?: number | undefined,
): Promise<{
  headers: tableDataHeaders;
  elements: tableDataElements;
}> {
  const headers = [
    { title: "ProductId", className: "w-1/8" },
    { title: "Type", className: "w-1/8" },
    { title: "Model", className: "w-1/4" },
    { title: "Actions", className: "w-1/4" },
  ];
  let elements: Component[];

  if (componentTypeId === undefined) {
    elements = await Component.getComponents();
  } else {
    elements = await Component.getComponentsByComponentType(componentTypeId);
  }

  const tableData = {
    headers,
    elements,
  };

  return tableData;
}
