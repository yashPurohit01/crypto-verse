// redux/newsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  image_url: string;
  published_at: string;
  thumb_2x:string
}

interface NewsState {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

// Async thunk for fetching news
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await fetch('/api/news');
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  return await response.json();
});

// Create the news slice
const cryptoNewsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload; // Set fetched news
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});


export default cryptoNewsSlice.reducer;
