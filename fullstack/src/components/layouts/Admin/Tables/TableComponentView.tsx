"use server";

import tableDataComponents from "@/data/tableDataComponents";
import TableEditable from "./TableEditable";
import { toPlainObjectArray } from "@/lib/utils";
import { ComponentTypeProp, ComponentProp } from "@/types/api";
import { ComponentType } from "@/api/productType";
import ElementsComponentEditable from "../Elements/Component/ElementsComponentEditable";

export default async function TableComponentView() {
  const { headers, elements } = await tableDataComponents();
  const componentTypes = await ComponentType.getComponentTypes();
  const plainElements: ComponentProp[] = toPlainObjectArray(elements);
  const plainComponentTypes: ComponentTypeProp[] =
    toPlainObjectArray(componentTypes);

  return (
    <div className="rounded-lg border w-full mx-12">
      <TableEditable headers={headers}>
        <ElementsComponentEditable
          plainElements={plainElements}
          plainComponentTypes={plainComponentTypes}
        />
      </TableEditable>
    </div>
  );
}
