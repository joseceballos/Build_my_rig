"use server";

import { SpecificationType } from "@/api/specificationType";
import TableSpecificationTypeView from "@/components/layouts/Admin/Tables/TableSpecificationTypeView";

export default async function viewSpecificationTypesPage() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <TableSpecificationTypeView />
    </main>
  );
}
