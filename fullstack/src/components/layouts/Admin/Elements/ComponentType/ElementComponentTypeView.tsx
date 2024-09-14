"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { ComponentType } from "@/api/productType";
import ButtonEditComponentType from "@/components/ui/Admin/ComponentTypes/view/ButtonEditComponentType";
import ButtonDeleteComponentType from "@/components/ui/Admin/ComponentTypes/view/ButtonDeleteComponentType";
import { postDeleteComponentType } from "@/actions/postsComponentType";

export default function ElementComponentTypeView({
  componentType,
  onChangeEditable,
  onDelete,
}: {
  componentType: ComponentType;
  onChangeEditable: Function;
  onDelete: () => Promise<void>;
}) {
  return (
    <TableRow>
      <TableCell>{componentType.name}</TableCell>
      <TableCell>{componentType.description}</TableCell>
      <TableCell>{componentType.order}</TableCell>
      <TableCell>
        <div className="space-x-2">
          <ButtonEditComponentType onClickEditable={onChangeEditable} />
          <ButtonDeleteComponentType
            fnPost={postDeleteComponentType}
            fnOnSuccess={onDelete}
            id={componentType.id}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
