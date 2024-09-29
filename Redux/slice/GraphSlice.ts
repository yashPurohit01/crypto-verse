// src/Redux/slice/CryptoGraphSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchMarketChartGraphData, fetchOHLCGraphData } from '../thunks/GraphThunks';

interface GraphState {
  ohlcData: any;
  marketChartData: any;
  loading: boolean;
  error: string | null;
}

const initialState: GraphState = {
  ohlcData: null,
  marketChartData: null,
  loading: false,
  error: null,
};

const graphSlice = createSlice({
  name: 'cryptoGraph',
  initialState,
  reducers: {
    clearGraphData: (state) => {
      state.ohlcData = null;
      state.marketChartData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // OHLC Graph Data
    builder.addCase(fetchOHLCGraphData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOHLCGraphData.fulfilled, (state, action) => {
      state.ohlcData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOHLCGraphData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Market Chart Graph Data
    builder.addCase(fetchMarketChartGraphData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMarketChartGraphData.fulfilled, (state, action) => {
      state.marketChartData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMarketChartGraphData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearGraphData } = graphSlice.actions;

export default graphSlice.reducer;
