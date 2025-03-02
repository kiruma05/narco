import React from "react";

interface Column {
  header: string;
  accessor: string;
  className?: string;
}

interface TableProps<T> {
  columns: Column[];
  renderRow: (item: T) => React.ReactNode;
  data?: T[]; // Make data optional and provide a default value
}

const Table = <T extends {}>({ columns, renderRow, data = [] }: TableProps<T>) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;