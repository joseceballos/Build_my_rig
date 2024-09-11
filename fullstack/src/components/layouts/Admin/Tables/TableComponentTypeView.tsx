"use server";

import tableDataComponentTypes from "@/data/tableDataComponentTypes";
import TableEditable from "./TableEditable";
import { toPlainObjectArray } from "@/lib/utils";
import { ComponentTypeProp } from "@/types/api";
import ElementsComponentTypeEditable from "../Elements/ComponentType/ElementsComponentTypeEditable";

export default async function TableComponentTypeView() {
  const { headers, elements } = await tableDataComponentTypes();
  const plainElements: ComponentTypeProp[] = toPlainObjectArray(elements);

  return (
    <div className="rounded-lg border w-full mx-12">
      <TableEditable headers={headers}>
        <ElementsComponentTypeEditable plainElements={plainElements} />
      </TableEditable>
    </div>
  );
}
