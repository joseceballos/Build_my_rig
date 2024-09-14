"use server";

import { ComponentType } from "@/api/componentType";
import tableDataComponentsByComponentType from "@/data/tableDataComponentsByComponentType";
import TableSelectable from "./TableSelectable";
import SelectComponentItem from "../Elements/ElementComponentSelect";

export default async function TableComponentSelect({
  type,
}: {
  type: ComponentType;
}) {
  const { headers, elements } = await tableDataComponentsByComponentType(
    type.id,
  );

  return (
    <div className="rounded-lg border w-full mx-12">
      <TableSelectable headers={headers}>
        {elements !== undefined &&
          elements.map((component) => (
            <SelectComponentItem key={component.id} component={component} />
          ))}
      </TableSelectable>
    </div>
  );
}
