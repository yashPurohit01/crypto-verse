import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Coin, CoinDetail } from "../interface";
import { clearGraphDetail } from "../slice/CryptoCoinsSlice";
import { RootState } from "../store";

// Thunk for fetching the coin list
export const fetchCoins = createAsyncThunk<Coin[]>(
  'coins/fetchCoins',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/trending-coins');

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


export const fetchCoinsList = createAsyncThunk(
  'coins/fetchCoinsList',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState; 
    const currency = state.currency.globalCurrency // Adjust according to your currency slice

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error fetching coin list:', error.message);
      return rejectWithValue('Failed to fetch coins list');
    }
  }
);

// Thunk for fetching coin details from the API
export const fetchCoinDetails = createAsyncThunk(
  'crypto/fetchCoinDetails',
  async (coinId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState; // Get the current state
    const currency = state.currency.globalCurrency || 'usd'; // Default to 'usd' if not set

    try {
      const response = await fetch(`/api/coins/${coinId}?vs_currency=${currency}`); // Adjust API route if necessary
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the JSON response
      return data; // Return the fetched coin details
    } catch (error: any) {
      // Handle and return error messages
      return rejectWithValue(error.message || 'Failed to fetch coin details');
    }
  }
);
export const fetchCompairatorCoinDetails = createAsyncThunk(
  'crypto/fetchCompairatorCoinDetails',
  async (coinId: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState; // Get the current state
    const currency = state.currency.globalCurrency || 'usd'; // Default to 'usd' if not set

    try {
      const response = await fetch(`/api/coins/${coinId}?vs_currency=${currency}`); // Adjust API route if necessary
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json(); // Parse the JSON response
      return data; // Return the fetched coin details
    } catch (error: any) {
      // Handle and return error messages
      return rejectWithValue(error.message || 'Failed to fetch coin details');
    }
  }
);

