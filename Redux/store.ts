// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import CryptoCoinsSlice from './slice/CryptoCoinsSlice';
import currencySlice from './slice/currencySlice';
import GraphSlice from './slice/GraphSlice';
import cryptoNewsSlice from './slice/cryptoNewsSlice';

const store = configureStore({
    reducer: {
        coins: CryptoCoinsSlice, 
        currency: currencySlice,
        graph:GraphSlice,
        news:cryptoNewsSlice,
    },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the store
export default store;
