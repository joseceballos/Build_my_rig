"use server";

import { ComponentType } from "@/api/productType";

type tableDataComponentTypesHeaders = {
  title: string;
  className: string;
}[];

type tableDataComponentTypesElements = ComponentType[];

export default async function tableDataComponentTypes(): Promise<{
  headers: tableDataComponentTypesHeaders;
  elements: tableDataComponentTypesElements;
}> {
  const headers = [
    { title: "Component Type", className: "w-1/8" },
    { title: "Description", className: "w-1/2" },
    { title: "Order", className: "w-1/8" },
    { title: "Actions", className: "w-1/4" },
  ];
  const elements = await ComponentType.getComponentTypes();

  const tableData = {
    headers,
    elements,
  };

  return tableData;
}
