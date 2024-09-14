import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableHeader = {
  title: string;
  className: string;
};

type TableEditableProps = {
  headers: TableHeader[];
  children: React.ReactNode;
};

export default function TableEditable({
  headers,
  children,
}: TableEditableProps) {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header.title} className={header.className}>
              {header.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}
