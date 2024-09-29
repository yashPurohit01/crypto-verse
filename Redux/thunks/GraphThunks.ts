// src/Redux/thunks/CryptoGraphThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch OHLC data thunk
export const fetchOHLCGraphData = createAsyncThunk(
  'crypto/fetchOHLCGraphData',
  async (
    { coinId, currency, days }: { coinId: string; currency: string; days: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`/api/ohlc`, {
        params: {
          coinId: coinId,
          currency: currency,
          days: days,
        },
      });
      return response.data; // Return the OHLC data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch OHLC data');
    }
  }
);

// Fetch Market Chart data thunk
export const fetchMarketChartGraphData = createAsyncThunk(
  'crypto/fetchMarketChartGraphData',
  async (
    { coinId, currency, days }: { coinId: string; currency: string; days: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`/api/market-chart`, {
        params: {
          coinId: coinId,
          currency: currency,
          days: days,
        },
      });
      return response.data; // Return the Market Chart data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch market chart data');
    }
  }
);
