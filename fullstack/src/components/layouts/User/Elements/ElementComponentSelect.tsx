"use server";

import { TableCell, TableRow } from "@/components/ui/table";
import { Component } from "@/api/component";
import ButtonAddComponentSelect from "@/components/ui/User/Component/Select/ButtonAddComponentSelect";

type ElementComponentSelectProps = {
  component: Component;
};

export default async function ElementComponentSelect({
  component,
}: ElementComponentSelectProps) {
  return (
    <TableRow>
      <TableCell>{component.componentType.name}</TableCell>
      <TableCell>{component.model}</TableCell>
      <TableCell>
        {
          <ButtonAddComponentSelect
            componentType={component.componentType.name}
            componentId={component.id}
          />
        }
      </TableCell>
    </TableRow>
  );
}
