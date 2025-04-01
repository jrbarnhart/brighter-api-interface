import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import JsonView from "@uiw/react-json-view";
import { vscodeTheme } from "@uiw/react-json-view/vscode";
import { ChevronsDown, ChevronsUp } from "lucide-react";

type LogsTableProps = {
  data: (Log | ErrorLog)[];
};

export default function LogsTable({ ...props }: LogsTableProps) {
  const { data } = props;

  const [expandedRows, setExpandedRows] = useState<number[]>([]);

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
        header: () => (
          <div className="flex gap-4 p-1 items-center">
            <button
              type="button"
              className="h-8 w-8 bg-background flex justify-center items-center rounded-full border-2 border-white"
              aria-label="Collapse all"
              onClick={() => {
                setExpandedRows([]);
              }}
            >
              <ChevronsUp />
            </button>
            <span>Context</span>
          </div>
        ),
        cell: ({ row }) => {
          const expanded = expandedRows.includes(row.index);
          return typeof row.original.context !== "string" ? (
            <div className="flex gap-4 p-1">
              <button
                type="button"
                className="h-8 w-8 bg-background flex justify-center items-center rounded-full border-2 border-white"
                aria-label={expanded ? "collapse" : "expand"}
                onClick={() => {
                  setExpandedRows((prev) => {
                    if (prev.includes(row.index)) {
                      return prev.filter((entry) => entry !== row.index);
                    } else return [...prev, row.index];
                  });
                }}
              >
                {expanded ? <ChevronsUp /> : <ChevronsDown />}
              </button>
              <JsonView
                value={row.original.context}
                collapsed={!expanded}
                style={vscodeTheme}
                enableClipboard={false}
                className="grow border border-gray-500"
                onExpand={() => {
                  setExpandedRows((prev) => {
                    return [...prev, row.index];
                  });
                }}
              />
            </div>
          ) : (
            <p>{row.original.context}</p>
          );
        },
      },
    ],
    [expandedRows]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
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
