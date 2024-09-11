"use server";

import { getComponentsResumeFromCookies } from "@/lib/cookies";
import { Component } from "@/api/component";
import { ComponentType } from "@/api/componentType";

type componentResumeElements = {
  type: ComponentType;
  component: Component | undefined;
}[];

type componentResumeHeaders = {
  title: string;
  className: string;
}[];

export default async function tableDataComponentsResume(): Promise<{ 
  headers: componentResumeHeaders
  elements: componentResumeElements;
}> {
  console.log("first stop");
  const headers = [
    { title: "Component",
      className: "w-1/6"
    },
    { title: "Product",
      className: "w-1/3"
    },
    { title: "Features",
      className: "w-1/3"
    },
    { title: "Actions",
      className: "w-1/6"
    },
  ]
  console.log("first stop");
  const elements = await getComponentsResumeFromCookies();

  const tableData = {
    headers,
    elements,
  }

  return (
    tableData
  );
}