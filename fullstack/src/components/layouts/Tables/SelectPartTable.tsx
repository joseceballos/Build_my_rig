'use server';
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import { Part, Parts, PartTypes } from "@/types/Parts";
import SelectPartItem from "../PartsItems/SelectPartItem";

type SelectPartTableProps = {
  type: PartTypes;
  parts: Part[];
};

export default async function SelectPartTable({ type, parts }: SelectPartTableProps) {
  return (
    <div className="rounded-lg border w-full mx-12">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Component</TableHead>
            <TableHead className="w-1/3">Product</TableHead>
            <TableHead className="w-1/6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.map((item) => (
            <SelectPartItem key={item.id} type={type} item={item} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
