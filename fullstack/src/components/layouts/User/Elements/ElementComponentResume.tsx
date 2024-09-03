"use server";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ComponentType } from "@/api/componentType";
import { Component } from "@/api/component";
import ButtonSelectComponent from "@/components/ui/User/Component/Resume/ButtonSelectComponentResume";
import ButtonRemoveComponent from "@/components/ui/User/Component/Resume/ButtonRemoveComponentResume";

type ElementComponentResumeProps = {
  type: ComponentType;
  component: Component | undefined;
};

export default async function ElementComponentResume({ type, component }: ElementComponentResumeProps) {
  return (
    <TableRow>
      <TableCell>{type.name}</TableCell>
      <TableCell>
        {component !== undefined ? (
          component.model
        ) : (
          <ButtonSelectComponent typeName={type.name} />
        )}
      </TableCell>
      <TableCell>
        <Badge>6 core</Badge>
      </TableCell>
      <TableCell>
        {component !== undefined ? (
          <ButtonRemoveComponent typeName={type.name} />
        ) : (
          ""
        )}
      </TableCell>
    </TableRow>
  );
}
