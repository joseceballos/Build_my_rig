"use server";

import { Component } from "@/api/product";
import TableComponentView from "@/components/layouts/Admin/Tables/TableComponentView";

export default async function viewComponentsPage() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <TableComponentView />
    </main>
  );
}
