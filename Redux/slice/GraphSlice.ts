import { createSlice } from '@reduxjs/toolkit';
import { fetchCompairatorMarketChartGraphData, fetchCompairatorOHLCGraphData, fetchMarketChartGraphData, fetchOHLCGraphData } from '../thunks/GraphThunks';

interface GraphState {
  ohlcData: any;
  marketChartData: any;
  graphType: string;
  compare: boolean;
  loading: boolean;
  comparisionMarketChatData: any;
  comparisionMarketGraphType: string;
  comparisionOhlcData: any;
  defaultDateRange: string;
  error: string | null;
}

const initialState: GraphState = {
  ohlcData: null,
  marketChartData: null,
  graphType: 'line', // Default graph type for individual charts
  defaultDateRange: '7 Days', // Default date range
  loading: false,
  comparisionMarketChatData: null, // Data for comparator market chart
  comparisionMarketGraphType: 'line', // Default graph type for comparison charts
  comparisionOhlcData: null, // Data for comparator OHLC chart
  error: null,
  compare: false, // Boolean to manage comparison mode
};

const graphSlice = createSlice({
  name: 'cryptoGraph',
  initialState,
  reducers: {
    // Clear individual chart data
    clearGraphData: (state) => {
      state.ohlcData = null;
      state.marketChartData = null;
      state.error = null;
    },
    // Clear comparison chart data
    clearComparisionGraphData: (state) => {
      state.comparisionOhlcData = null;
      state.comparisionMarketChatData = null;
      state.error = null;
    },
    // Set graph type for individual charts
    setGraphType: (state, action) => {
      state.graphType = action.payload;
    },
    // Set default date range for charts
    setDefaultDateRange: (state, action) => {
      state.defaultDateRange = action.payload;
    },
    // Toggle comparison mode
    setCompare: (state, action) => {
      state.compare = action.payload;
    },
    // Set graph type for comparison charts
    setComparisionGraphType: (state, action) => {
      state.comparisionMarketGraphType = action.payload;
    },
  },
  extraReducers: (builder) => {
    // OHLC Graph Data for individual charts
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

    // Market Chart Graph Data for individual charts
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

    // OHLC Graph Data for comparison charts
    builder.addCase(fetchCompairatorOHLCGraphData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCompairatorOHLCGraphData.fulfilled, (state, action) => {
      state.comparisionOhlcData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCompairatorOHLCGraphData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Market Chart Graph Data for comparison charts
    builder.addCase(fetchCompairatorMarketChartGraphData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCompairatorMarketChartGraphData.fulfilled, (state, action) => {
      state.comparisionMarketChatData = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCompairatorMarketChartGraphData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions and reducer
export const {
  clearGraphData,
  clearComparisionGraphData,
  setGraphType,
  setDefaultDateRange,
  setCompare,
  setComparisionGraphType,
} = graphSlice.actions;

export default graphSlice.reducer;
