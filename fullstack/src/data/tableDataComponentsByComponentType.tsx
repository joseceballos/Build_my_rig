"use server";

import { Component } from "@/api/product";

type tableDataComponentsByComponentTypeElements = Component[] | undefined;

type tableDataComponentsByComponentTypeHeaders = {
  title: string;
  className: string;
}[];

export default async function tableDataComponentsByComponentType(
  componentTypeId: number,
): Promise<{
  headers: tableDataComponentsByComponentTypeHeaders;
  elements: tableDataComponentsByComponentTypeElements;
}> {
  const headers = [
    { title: "Component", className: "w-1/6" },
    { title: "Product", className: "w-2/3" },
    { title: "Actions", className: "w-1/6" },
  ];
  const elements =
    await Component.getComponentsByComponentType(componentTypeId);

  const tableData = {
    headers,
    elements,
  };

  return tableData;
}
