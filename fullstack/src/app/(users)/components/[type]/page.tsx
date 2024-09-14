"use server";

import { ComponentType } from "@/api/componentType";
import TableComponentsSelect from "@/components/layouts/User/Tables/TableComponentsSelect";
import { redirect } from "next/navigation";

async function validateType(
  typeName: string,
): Promise<ComponentType | undefined> {
  const types = await ComponentType.getComponentTypes();
  const type = types.find((item) => item.name === typeName);
  return type;
}

export default async function SelectComponentPage({
  params,
}: {
  params: { type: string };
}) {
  const type = await validateType(params.type);
  if (type === undefined) {
    redirect("/");
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <TableComponentsSelect type={type} />
    </main>
  );
}
