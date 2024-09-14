"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Component } from "@/api/component";
import ButtonEditComponent from "@/components/ui/Admin/Components/view/ButtonEditComponent";
import ButtonDeleteComponent from "@/components/ui/Admin/Components/view/ButtonDeleteComponent";
import { postDeleteComponent } from "@/actions/postsComponent";

export default function ElementComponentView({
  component,
  onChangeEditable,
  onDelete,
}: {
  component: Component;
  onChangeEditable: Function;
  onDelete: () => Promise<void>;
}) {
  return (
    <TableRow>
      <TableCell>{component.productId}</TableCell>
      <TableCell>{component?.componentType?.name}</TableCell>
      <TableCell>{component.model}</TableCell>
      <TableCell>
        <div className="space-x-2">
          <ButtonEditComponent onClickEditable={onChangeEditable} />
          <ButtonDeleteComponent
            fnPost={postDeleteComponent}
            fnOnSuccess={onDelete}
            id={component.id}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
