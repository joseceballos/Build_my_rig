"use server";

import tableDataSpecificationTypes from "@/data/tableDataSpecificationTypes";
import TableEditable from "./TableEditable";
import { toPlainObjectArray } from "@/lib/utils";
import { ComponentTypeProp, SpecificationTypeProp } from "@/types/api";
import { ComponentType } from "@/api/productType";
import ElementsSpecificationTypeEditable from "../Elements/SpecificationType/ElementsSpecificationTypeEditable";

export default async function TableSpecificationTypeView() {
  const { headers, elements } = await tableDataSpecificationTypes();
  const componentTypes = await ComponentType.getComponentTypes();
  const plainElements: SpecificationTypeProp[] = toPlainObjectArray(elements);
  const plainComponentTypes: ComponentTypeProp[] =
    toPlainObjectArray(componentTypes);

  return (
    <div className="rounded-lg border w-full mx-12">
      <TableEditable headers={headers}>
        <ElementsSpecificationTypeEditable
          plainElements={plainElements}
          plainComponentTypes={plainComponentTypes}
        />
      </TableEditable>
    </div>
  );
}
