import React from 'react';
import TableCell from '../atoms/TableCell';

interface TableRowProps {
  currency: string;
  weBuy: string;
  exchangeRate: string;
  weSell: string;
}

const TableRow: React.FC<TableRowProps> = ({ currency, weBuy, exchangeRate, weSell }) => (
  <tr className="even:bg-gray-50">
    <TableCell>{currency}</TableCell>
    <TableCell>{weBuy}</TableCell>
    <TableCell>{exchangeRate}</TableCell>
    <TableCell>{weSell}</TableCell>
  </tr>
);

export default TableRow;
