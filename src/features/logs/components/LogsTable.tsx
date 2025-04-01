import React from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import JsonView from "@uiw/react-json-view";
import { vscodeTheme } from "@uiw/react-json-view/vscode";

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
        accessorFn: (log) => {
          return new Date(log.timestamp).toLocaleDateString();
        },
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
            <div className="bg-white min-w-64">
              <JsonView
                value={row.original.context}
                collapsed={true}
                style={vscodeTheme}
              />
            </div>
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
    <div className="px-4">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-20 text-2xl bg-secondary">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left pl-2 border-2">
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
              <tr
                key={row.id}
                className="even:bg-secondary/60 odd:bg-primary-foreground/50 h-12"
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="border-2 pl-2">
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
