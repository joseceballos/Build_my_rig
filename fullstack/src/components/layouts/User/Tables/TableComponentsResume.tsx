"use server";

import TableSelectable from "./TableSelectable";
import ElementComponentItem from "../Elements/ElementComponentResume";
import tableDataComponentsResume from "@/tables/tableDataComponentsResume";

export default async function TableComponentsResume() {
  const { headers, elements } = await tableDataComponentsResume();

  return (
    <div className="rounded-lg border w-full mx-12">
      <TableSelectable headers={headers}>
        {elements.map(({ type, component }) => (
          <ElementComponentItem
            key={
              component !== undefined
                ? `t${type.id}-c${component.id}`
                : `t${type.id}-c0`
            }
            type={type}
            component={component}
          />
        ))}
      </TableSelectable>
    </div>
  );
}
