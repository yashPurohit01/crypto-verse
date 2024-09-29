import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin, CoinDetail } from "../interface";
import { clearGraphDetail } from "../slice/CryptoCoinsSlice";

// Thunk for fetching the coin list
export const fetchCoins = createAsyncThunk<Coin[]>(
  'coins/fetchCoins',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/coins-list');

      // Axios does not have an `ok` property, so we check the status code if needed.
      if (response.status !== 200) {
        throw new Error('Failed to fetch coins');
      }

      // Axios automatically parses JSON responses.
      const data: Coin[] = response.data;
      return data;

    } catch (error: any) {
      // Log error and return a rejected value for Redux Toolkit to handle
      console.error(error.message);

      // Use `rejectWithValue` to pass error message to the rejected state
      return rejectWithValue(error.message);
    }
  }
);


export const fetchCoinsList = createAsyncThunk('coins/fetchCoinsList', async (_, {dispatch, rejectWithValue }) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const data = await response.json();
    return data;
  } catch (error:any) {
       // Log error and return a rejected value for Redux Toolkit to handle
       console.error(error.message);

       // Use `rejectWithValue` to pass error message to the rejected state
       return rejectWithValue(error.message);
     }
  

});

// Thunk for fetching coin details
export const fetchCoinDetails = createAsyncThunk(
  'crypto/fetchCoinDetails',
  async (coinId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<CoinDetail>(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch coin details');
    }
  }
);


export const fetchGraphData = createAsyncThunk(
  'crypto/fetchGraphData',
  async (
    { coinId, days, currency, type }: { coinId: string; days: string; currency: string; type?: string },
    { dispatch, rejectWithValue }
  ) => {
    try {

      console.log(type)
      let response;

      dispatch(clearGraphDetail())

      // If type is 'bar', use the OHLC API
      if (type === 'bar') {
        response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc`, // OHLC endpoint
          {
            params: {
              vs_currency: currency,
              days: days,
            },
          }
        );
      } else {
        // Use the default market_chart endpoint
        response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
          {
            params: {
              vs_currency: currency,
              days: days,
            },
          }
        );
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch graph data');
    }
  }
);
