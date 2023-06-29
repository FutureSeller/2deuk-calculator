'use client';

import tw from 'twin.macro';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import EditableCell from './editable-cell';
import { defaultProductData, type Product } from '../_constants/product';

const AddButton = tw.button`mb-4 mr-2 rounded-lg bg-blue-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`;
const ResetButton = tw.button`mb-4 mr-2 rounded-lg bg-red-700 px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`;

const defaultColumn: Partial<ColumnDef<Product>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue();
    return (
      <EditableCell
        index={index}
        id={id}
        table={table}
        initialValue={`${initialValue}`}
      />
    );
  },
};

export default function BuyOneGetOnFreeTable() {
  const [data, setData] = useState(() => [...defaultProductData]);
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: '단위',
        accessorKey: 'unit',
      },
      {
        header: '가격',
        accessorKey: 'price',
      },
      {
        header: '단위 / 가격',
        accessorKey: 'result',
      },
      {
        header: ' ',
        cell: (info) => (
          <XMarkIcon
            css={[tw`w-5 h-5`]}
            onClick={() => {
              if (info.table.options.data.length <= 1) {
                return;
              }

              setData((prev) =>
                prev.filter((_, idx) => idx !== info.row.index),
              );
            }}
          />
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
  });

  const addRow = () => {
    setData((prev) => prev.concat(defaultProductData));
  };

  const reset = () => {
    setData(defaultProductData);
  };

  return (
    <div>
      <div className="mt-5 flex justify-end">
        <ResetButton type="button" onClick={reset} disabled={data.length <= 1}>
          리셋
        </ResetButton>
        <AddButton type="button" onClick={addRow} disabled={data.length >= 5}>
          추가
        </AddButton>
      </div>
      <table className="min-w-full text-left text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="pb-2 pr-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} css={[tw`border-b dark:border-neutral-500`]}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap py-4 pr-2 font-medium"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
