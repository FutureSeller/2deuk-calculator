'use client';

import tw from 'twin.macro';
import { Table } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import type { Product } from '../_constants/product';

interface EditableCellProps {
  initialValue: string;
  table: Table<Product>;
  index: number;
  id: string;
}

export default function EditableCell({
  initialValue,
  table,
  index,
  id,
}: EditableCellProps) {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const { original } = table.getRow(`${index}`);

  return id === 'result' ? (
    <span>{parseFloat(getAvgPrice(original).toFixed(4)).toString()}</span>
  ) : (
    <Input
      value={value as string}
      pattern="[0-9]+"
      onChange={(e) => {
        if (Number.isNaN(Number(e.target.value))) {
          return;
        }

        setValue(e.target.value);
        table.options.meta?.updateData(index, id, e.target.value);
      }}
    />
  );
}

const Input = tw.input`w-[80%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`;

const getAvgPrice = ({ price, unit }: Product) => {
  const numberedUnit = Number(unit);
  const numberedPrice = Number(price);

  if (Number.isNaN(numberedUnit) || Number.isNaN(numberedPrice)) {
    return 0;
  }

  if (numberedUnit === 0) {
    return 0;
  }

  return numberedPrice / numberedUnit;
};
