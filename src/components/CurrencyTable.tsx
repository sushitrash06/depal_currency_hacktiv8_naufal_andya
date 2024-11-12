import React, { useEffect, useState } from 'react';
import { fetchCurrencyRates } from '../utils/api';
import SearchInput from '../atoms/SearchInput';
import TableHeader from '../atoms/TableHeader';
import TableRow from '../molecules/TableRow';

interface CurrencyData {
  currency: string;
  weBuy: string;
  exchangeRate: string;
  weSell: string;
}

const ITEMS_PER_PAGE = 10;
const PRIORITIZED_CURRENCIES = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

const CurrencyTable: React.FC = () => {
  const [currencies, setCurrencies] = useState<CurrencyData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchRates = async () => {
      const data = await fetchCurrencyRates();
      if (data) {
        const rates = data.rates;

        const prioritizedData = PRIORITIZED_CURRENCIES.map((currency) => {
          const exchangeRate = parseFloat(rates[currency]);
          return {
            currency,
            weBuy: (exchangeRate * 1.05).toFixed(4),
            exchangeRate: exchangeRate.toFixed(4),
            weSell: (exchangeRate * 0.95).toFixed(4),
          };
        });

        const otherData = Object.keys(rates)
          .filter((currency) => !PRIORITIZED_CURRENCIES.includes(currency))
          .map((currency) => {
            const exchangeRate = parseFloat(rates[currency]);
            return {
              currency,
              weBuy: (exchangeRate * 1.05).toFixed(4),
              exchangeRate: exchangeRate.toFixed(4),
              weSell: (exchangeRate * 0.95).toFixed(4),
            };
          });

        setCurrencies([...prioritizedData, ...otherData]);
      }
    };

    fetchRates();
  }, []);

  const filteredCurrencies = currencies.filter(currency =>
    currency.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCurrencies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCurrencies = filteredCurrencies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="currency-table-container max-w-4xl mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Currency Exchange Rates (1 USD)</h2>

      <SearchInput value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

      <table className="w-full border-collapse border border-gray-200">
        <TableHeader />
        <tbody>
          {currentCurrencies.map((currency) => (
            <TableRow
              key={currency.currency}
              currency={currency.currency}
              weBuy={currency.weBuy}
              exchangeRate={currency.exchangeRate}
              weSell={currency.weSell}
            />
          ))}
        </tbody>
      </table>

      <div className="pagination-controls flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-[#f1f1f1dd]"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50 hover:bg-[#f1f1f1dd]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CurrencyTable;
