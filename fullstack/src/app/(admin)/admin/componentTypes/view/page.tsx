"use server";

import TableComponentTypeView from "@/components/layouts/Admin/Tables/TableComponentTypeView";

export default async function viewComponentTypesPage() {

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <TableComponentTypeView />
    </main>
  );
}
