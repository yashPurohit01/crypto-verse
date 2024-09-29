import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  globalCurrency: string;  // The currently selected global currency (e.g., 'usd', 'eur')
  currencySymbol: string;  // The symbol for the selected currency (e.g., '$', '€')
}

const initialState: CurrencyState = {
  globalCurrency: 'usd',  // Default currency is USD
  currencySymbol: '$',     // Default symbol is for USD
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setGlobalCurrency: (state, action: PayloadAction<{ currency: string, symbol: string }>) => {
      state.globalCurrency = action.payload.currency;   // Update the selected currency
      state.currencySymbol = action.payload.symbol;     // Update the selected currency's symbol
    },
  },
});

export const { setGlobalCurrency } = currencySlice.actions;

export default currencySlice.reducer;
