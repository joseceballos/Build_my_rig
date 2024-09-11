"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { SpecificationType } from "@/api/specificationType";
import ButtonEditSpecificationType from "@/components/ui/Admin/SpecificationTypes/view/ButtonEditSpecificationType";
import ButtonDeleteSpecificationType from "@/components/ui/Admin/SpecificationTypes/view/ButtonDeleteSpecificationType";
import { postDeleteSpecificationType } from "@/actions/postsSpecificationType";

export default function ElementSpecificationTypeView({
  specificationType, onChangeEditable, onDelete
}: {specificationType: SpecificationType, onChangeEditable: Function, onDelete: () => Promise<void>}) {

  return (
    <TableRow>
      <TableCell>{specificationType.name}</TableCell>
      <TableCell>{specificationType?.componentType?.name}</TableCell>
      <TableCell>{specificationType.description}</TableCell>
      <TableCell>{specificationType.valueType}</TableCell>
      <TableCell>{specificationType.filterType}</TableCell>
      <TableCell>
        <div className="space-x-2">
        <ButtonEditSpecificationType onClickEditable={onChangeEditable} />
        <ButtonDeleteSpecificationType fnPost={postDeleteSpecificationType} fnOnSuccess={onDelete} id={specificationType.id} />
        </div>
      </TableCell>
    </TableRow>
  );
}
