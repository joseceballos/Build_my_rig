"use server";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/ui/table";
import PartItem from "../PartsItems/ResumePartItem";
import { Part, Parts, PartTypes } from "@/types/Parts";
import { getResumePartsFromCookies } from "@/lib/cookies";


type ResumePartsTableProps = {
  partsCollection: Record<PartTypes, Part[]>;
}

export default async function ResumePartsTable({partsCollection}:ResumePartsTableProps) {
  const parts = getResumePartsFromCookies();
  console.log('parts', parts);

  return (
    <div className="rounded-lg border w-full mx-12">
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">Component</TableHead>
            <TableHead className="w-1/3">Product</TableHead>
            <TableHead className="w-1/2">Features</TableHead>
            <TableHead className="w-1/6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.map(({type, value}) => {
            return(<PartItem
              key={value !== undefined ? `${type}-${value}` : `${type}-0`}
              type={type}
              item={
                value !== undefined
                  ? partsCollection[type].find((item) => item.id === value)
                  : undefined
              }
            />)
          })}
          
        </TableBody>
      </Table>
    </div>
  );
}
