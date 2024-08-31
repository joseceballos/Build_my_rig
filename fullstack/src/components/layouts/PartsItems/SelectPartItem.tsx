'use client';

import { TableCell, TableRow } from "@/ui/table";
import { Part, Parts, PartTypes } from "@/types/Parts";
import { createCookie } from "@/app/actions";
import { Button } from "@/ui/button";

type PartItemProps = {
  type: PartTypes;
  item: Part;
};

export default function SelectPartItem({ type, item }: PartItemProps) {
  
  return (
    <TableRow>
      <TableCell>{type}</TableCell>
      <TableCell>{item.productName}</TableCell>
      <TableCell>
        {
          <Button onClick={async() => createCookie(type, item.id)}>Add</Button>
        }
      </TableCell>
    </TableRow>
  );
}
