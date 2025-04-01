import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import JsonView from "@uiw/react-json-view";

type LogsTableProps = {
  combinedLogs: Log[];
  combinedErrors: ErrorLog[];
};

export default function LogsTable({ ...props }: LogsTableProps) {
  const { combinedLogs, combinedErrors } = props;

  const columns = React.useMemo<ColumnDef<Log | ErrorLog>[]>(
    () => [
      {
        accessorKey: "timestamp",
        header: "Time",
      },
      {
        accessorKey: "level",
        header: "Level",
      },
      {
        accessorKey: "message",
        header: "Message",
      },
      {
        accessorKey: "context",
        header: "Context",
        cell: ({ row }) =>
          typeof row.original.context !== "string" ? (
            <JsonView value={row.original.context} collapsed={true} />
          ) : (
            <p>{row.original.context}</p>
          ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: [...combinedLogs, ...combinedErrors],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
