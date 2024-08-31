'use client';

import { TableCell, TableRow } from "@/ui/table";
import { Badge } from "@/ui/badge";
import { Part, Parts, PartTypes } from "@/types/Parts";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/app/actions";

type PartItemProps = {
  type: PartTypes;
  item: Part | undefined;
}

const defaultPartsText:Record<PartTypes,string> = {
  CPU:"Choose a CPU",
  motherboard:"Choose a Motherboard",
}

export default function PartItem({type, item}:PartItemProps) {
  const router = useRouter();

  return(<TableRow>
    <TableCell>{type}</TableCell>
    <TableCell>
      {item !== undefined ? item.productName : <Button onClick={() => router.push(`parts/${type}`)}>{defaultPartsText[type]}</Button>}
    </TableCell>
    <TableCell>
      <Badge>6 core</Badge>
    </TableCell>
    <TableCell>
    {item !== undefined ? <Button onClick={async() => deleteCookie(type)}>Remove</Button> : "" }
    </TableCell>
  </TableRow>)
}