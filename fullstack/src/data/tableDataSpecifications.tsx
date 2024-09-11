"use server";

import { Specification } from "@/api/specification";

type tableDataHeaders = {
  title: string;
  className: string;
}[];

type tableDataElements = Specification[];

export default async function tableDataSpecifications(specificationTypeId?: number | undefined, componentId?: number | undefined): Promise<{
  headers: tableDataHeaders;
  elements: tableDataElements;
}> {
  const headers = [
    { title: "Value", className: "w-1/8" },
    { title: "Type", className: "w-1/8" },
    { title: "Description", className: "w-1/4" },
    { title: "Actions", className: "w-1/4" },
  ];
  let elements: Specification[] = [];

  if(specificationTypeId !== undefined) {
    elements = await Specification.getSpecificationsBySpecificationType(specificationTypeId);
  } else if(componentId !== undefined) {
    elements = await Specification.getSpecificationsByComponent(componentId);
  }
  
  

  const tableData = {
    headers,
    elements,
  };

  return tableData;
}
