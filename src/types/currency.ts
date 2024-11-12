export interface Currency {
    currency: string;
    weBuy: string;
    exchangeRate: string;
    weSell: string;
  }
  
  export interface CurrencyAPIResponse {
    rates: Record<string, string>;
  }