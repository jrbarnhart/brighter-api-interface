import React, { SetStateAction, useState } from "react";
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
  expandedRows: number[];
  setExpandedRows: React.Dispatch<SetStateAction<number[]>>;
};

export default function LogsTable({ ...props }: LogsTableProps) {
  const { data, expandedRows, setExpandedRows } = props;

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
          const date = new Date(log.timestamp);
          const formatter = new Intl.DateTimeFormat("en-us", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          return `${date.toLocaleDateString()} ${formatter.format(date)}`;
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
        cell: ({ row }) => {
          const expanded = expandedRows.includes(row.index);
          return typeof row.original.context !== "string" ? (
            <div className="flex gap-4 p-1">
              <button
                type="button"
                className="h-8 w-8 bg-background flex justify-center items-center rounded-full border border-white/40"
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
    [expandedRows, setExpandedRows]
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
            <tr key={headerGroup.id} className="h-20 text-xl bg-secondary">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="text-left pl-2 border-2">
                  {header.column.getCanFilter() ? (
                    <div>
                      <Filter column={header.column} table={table} />
                    </div>
                  ) : null}
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
      <div className="h-2" />
      <div className="flex justify-center items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => {
            table.firstPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => {
            table.lastPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-background"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="bg-background"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center">
        Showing {table.getRowModel().rows.length.toLocaleString()} of{" "}
        {table.getRowCount().toLocaleString()} Rows
      </div>
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
      className="w-full border shadow rounded bg-background"
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
