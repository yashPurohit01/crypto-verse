import { createSlice } from "@reduxjs/toolkit";
import { CoinState } from "../interface";
import { fetchCoins, fetchCoinDetails, fetchGraphData, fetchCoinsList } from "../thunks/CryptoThunks";

// Initial state
const initialState: CoinState = {
  coins: [],
  nfts: [],
  categories: [],
  coinList:[],
  selectedCoin: null,
  coinDetails: null,
  graphData: null,
  loading: false,
  error: null,
};

// Create the slice
const CryptoCoinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    selectCoin(state, action) {
      state.selectedCoin = action.payload;
    },
    // Action to clear coin details if needed
    clearCoinDetails(state) {
      state.coinDetails = null;
      state.graphData = null;
    },
    clearGraphDetail(state) {
      state.graphData = null;
    }
  },
  extraReducers: (builder) => {
    // Fetching list of coins, NFTs, and categories
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoins.fulfilled, (state, action: any) => {
        state.loading = false;
        state.coins = action.payload?.coins;
        state.nfts = action.payload?.nfts;
        state.categories = action.payload?.categories;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch coins';
      });

    // Fetching coin details
    builder
      .addCase(fetchCoinDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.coinDetails = action.payload;
      })
      .addCase(fetchCoinDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch coin details';
      });

    // Fetching graph data
    builder
      .addCase(fetchGraphData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.loading = false;
        state.graphData = action.payload;
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch graph data';
      });
      
      builder
      .addCase(fetchCoinsList.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error
      })
      .addCase(fetchCoinsList.fulfilled, (state, action) => {
        state.loading = false;
        state.coinList = action.payload; // Set fetched data
      })
      .addCase(fetchCoinsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      });
  },
});

// Export actions and reducer
export const { selectCoin, clearCoinDetails , clearGraphDetail } = CryptoCoinsSlice.actions;
export default CryptoCoinsSlice.reducer;
