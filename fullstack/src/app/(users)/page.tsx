"use server";
import TableComponentsResume from "@/components/layouts/User/Tables/TableComponentsResume";

export default async function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <TableComponentsResume />
    </main>
  );
}
