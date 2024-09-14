"use server";

import { SpecificationType } from "@/api/specificationType";

type tableDataHeaders = {
  title: string;
  className: string;
}[];

type tableDataElements = SpecificationType[];

export default async function tableDataSpecificationTypes(
  componentTypeId?: number | undefined,
): Promise<{
  headers: tableDataHeaders;
  elements: tableDataElements;
}> {
  const headers = [
    { title: "Name", className: "w-1/8" },
    { title: "Type", className: "w-1/8" },
    { title: "Description", className: "w-1/2" },
    { title: "Type of Value", className: "w-1/8" },
    { title: "Type of Filter", className: "w-1/8" },
    { title: "Actions", className: "w-1/4" },
  ];
  let elements: SpecificationType[];

  if (componentTypeId === undefined) {
    elements = await SpecificationType.getSpecificationTypes();
  } else {
    elements =
      await SpecificationType.getSpecificationTypesByComponentType(
        componentTypeId,
      );
  }

  const tableData = {
    headers,
    elements,
  };

  return tableData;
}
