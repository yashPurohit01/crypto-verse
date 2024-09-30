// src/Redux/slice/CryptoGraphSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchMarketChartGraphData, fetchOHLCGraphData } from '../thunks/GraphThunks';

interface GraphState {
  ohlcData: any;
  marketChartData: any;
  graphType:string;
  loading: boolean;
  defaultDateRange:string;
  error: string | null;
}

const initialState: GraphState = {
  ohlcData: null,
  marketChartData: null,
  graphType:'line',
  defaultDateRange:'7 Days',
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
    setGraphType:(state,action) => {
        state.graphType = action.payload
    },
    setDefaultDateRange:(state,action) => {
      state.defaultDateRange = action.payload
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

export const { clearGraphData,setDefaultDateRange,setGraphType } = graphSlice.actions;

export default graphSlice.reducer;
