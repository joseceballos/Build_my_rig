"use server";

import tableDataComponentTypes from "@/tables/tableDataComponentTypes";
import TableEditable from "./TableEditable";
import ElementsComponentTypeEditable from "../Elements/ElementsComponentTypeEditable";
import { toPlainObjectArray } from "@/lib/utils";
import { ComponentTypeProp } from "@/types/api";

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
