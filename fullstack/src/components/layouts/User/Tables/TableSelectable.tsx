import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TableHeader = {
  title: string;
  className: string;
}

type TableSelectableProps = {
  headers: TableHeader[];
  children: React.ReactNode;
}

export default function TableSelectable({headers, children}:TableSelectableProps) {
  return(<Table className="">
    <TableHeader>
      <TableRow>
        { headers.map((header) => 
          <TableHead key={header.title} className={header.className}>{header.title}</TableHead>
        )}
      </TableRow>
    </TableHeader>
    <TableBody>
      { children }
    </TableBody>
  </Table>)
}