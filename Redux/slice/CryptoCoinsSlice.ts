import { createSlice } from "@reduxjs/toolkit";
import { CoinState } from "../interface";
import { fetchCoins, fetchCoinDetails, fetchCoinsList, fetchCompairatorCoinDetails } from "../thunks/CryptoThunks";

// Initial state
const initialState: CoinState = {
  coins: [],
  nfts: [],
  categories: [],
  coinList: [],
  selectedCoin: null,
  coinDetails: null,
  graphData: null,
  loading: false,
  comparisionSelection:"",
  compairedCoinDetail: null,  // For storing the compared coin details
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
    },
    setCompareCoin(state, action) {
      state.comparisionSelection = action?.payload;
    },
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

    // Fetching list of coins for search input
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

    // Fetching compared coin details
    builder
      .addCase(fetchCompairatorCoinDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompairatorCoinDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.compairedCoinDetail = action.payload; // Set compared coin details
      })
      .addCase(fetchCompairatorCoinDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { selectCoin, clearCoinDetails, clearGraphDetail, setCompareCoin } = CryptoCoinsSlice.actions;
export default CryptoCoinsSlice.reducer;
