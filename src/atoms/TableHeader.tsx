import React from 'react';

const TableHeader: React.FC = () => (
  <thead>
    <tr className="bg-gray-100">
      <th className="px-4 py-2 border text-center">Currency</th>
      <th className="px-4 py-2 border text-center">We Buy</th>
      <th className="px-4 py-2 border text-center">Exchange Rate</th>
      <th className="px-4 py-2 border text-center">We Sell</th>
    </tr>
  </thead>
);

export default TableHeader;
