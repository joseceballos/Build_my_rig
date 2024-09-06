"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { ComponentType } from "@/api/componentType";
import ButtonEditComponentType from "@/components/ui/Admin/ComponentTypes/View/ButtonEditComponentType";

export default function ElementComponentTypeView({
  componentType, onChangeEditable
}: {componentType: ComponentType, onChangeEditable: Function}) {

  return (
    <TableRow>
      <TableCell>{componentType.name}</TableCell>
      <TableCell>{componentType.description}</TableCell>
      <TableCell>{componentType.order}</TableCell>
      <TableCell>
        <ButtonEditComponentType onClickEditable={onChangeEditable} />
      </TableCell>
    </TableRow>
  );
}
