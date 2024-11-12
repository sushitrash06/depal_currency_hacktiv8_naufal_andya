import axios from 'axios';
import { CurrencyAPIResponse } from '../types/currency';

export const fetchCurrencyRates = async (): Promise<CurrencyAPIResponse | null> => {
  try {
    const response = await axios.get<CurrencyAPIResponse>(
      `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${import.meta.env.VITE_REACT_APP_CURRENCY_FREAKS_API_KEY}&base=USD`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};