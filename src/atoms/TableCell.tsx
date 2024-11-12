import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
}

const TableCell: React.FC<TableCellProps> = ({ children }) => (
  <td className="px-4 py-2 border text-center">{children}</td>
);

export default TableCell;
