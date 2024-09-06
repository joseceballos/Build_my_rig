"use server";

import { ComponentType } from "@/api/componentType";
import TableComponentTypeView from "@/components/layouts/Admin/Tables/TableComponentTypeView";

export default async function viewComponentTypesPage() {
  const componentTypes = await ComponentType.getComponentTypes();

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <TableComponentTypeView />
    </main>
  );
}
