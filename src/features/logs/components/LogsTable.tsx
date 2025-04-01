import React, { useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  PaginationState,
  Column,
  Table,
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

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

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
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-20 text-2xl bg-secondary">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left pl-2 border-2">
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : "",
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                    {header.column.getCanFilter() ? (
                      <div>
                        <Filter column={header.column} table={table} />
                      </div>
                    ) : null}
                  </div>
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

function Filter({
  column,
  table,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div
      className="flex space-x-2"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        type="number"
        value={(columnFilterValue as [number, number])[0]}
        onChange={(e) => {
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old[1],
          ]);
        }}
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])[1]}
        onChange={(e) => {
          column.setFilterValue((old: [number, number]) => [
            old[0],
            e.target.value,
          ]);
        }}
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      className="w-36 border shadow rounded"
      onChange={(e) => {
        column.setFilterValue(e.target.value);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? "") as string}
    />
  );
}
