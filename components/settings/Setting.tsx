"use client";
import { setDefaultDateRange, setGraphType } from '@/Redux/slice/GraphSlice';
import { setGlobalCurrency } from '@/Redux/slice/currencySlice';
import { AppDispatch } from '@/Redux/store';
import { Box, Select, SegmentedControl, Button, Text } from '@mantine/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

function Settings() {
  const dispatch: AppDispatch = useDispatch();

  // Access currency from Redux state
  const currency = useSelector((state: RootState) => state.currency.globalCurrency) || 'USD'; // Default to 'USD' if undefined
  const defaultGraphType = useSelector((state: RootState) => state.graph.graphType) || 'line'; // Default graph type
  const defaultDateRange = useSelector((state: RootState) => state.graph.defaultDateRange) || '365'; // Default date range

  // Function to return the symbol based on selected currency
  const getCurrencySymbol = (currency: string): { name: string; value: string; symbol: string } => {
    switch (currency) {
      case 'USD':
        return { name: 'USD', value: 'usd', symbol: '$' };
      case 'EUR':
        return { name: 'EUR', value: 'eur', symbol: '€' };
      case 'BTC':
        return { name: 'BTC', value: 'btc', symbol: '₿' };
      case 'GBP':
        return { name: 'GBP', value: 'gbp', symbol: '£' };
      case 'JPY':
        return { name: 'JPY', value: 'jpy', symbol: '¥' };
      case 'AUD':
        return { name: 'AUD', value: 'aud', symbol: 'A$' };
      case 'CAD':
        return { name: 'CAD', value: 'cad', symbol: 'C$' };
      case 'CNY':
        return { name: 'CNY', value: 'cny', symbol: '¥' };
      case 'INR':
        return { name: 'INR', value: 'inr', symbol: '₹' };
      default:
        return { name: 'USD', value: 'usd', symbol: '$' }; // Fallback to USD
    }
  };

  const saveSettings = () => {
    // Dispatch the global currency and its symbol
    dispatch(setGlobalCurrency({
      currency: getCurrencySymbol(currency).value,
      symbol: getCurrencySymbol(currency).symbol,
    }));

    // Dispatch the selected graph type and date range
    dispatch(setGraphType(defaultGraphType));
    dispatch(setDefaultDateRange(defaultDateRange));

    console.log({
      currency,
      defaultGraphType,
      defaultDateRange,
    });
  };

  return (
    <Box mr={'lg'} ml={'lg'} style={{ borderRadius: '8px', padding: '60px', margin: 'xl' }}>
      <Text size="xl" fw={500} style={{ marginBottom: '20px' }}>
        Settings
      </Text>

      {/* Currency Setting */}
      <Select
        label="Display Currency"
        size="lg"
        placeholder="Select a currency"
        value={currency}
        onChange={(value) => {
          if (value) {
            dispatch(setGlobalCurrency({
              currency: getCurrencySymbol(value).value,
              symbol: getCurrencySymbol(value).symbol,
            }));
          }
        }} 
        data={[
          { value: 'USD', label: 'USD' },
          { value: 'EUR', label: 'EUR' },
          { value: 'BTC', label: 'BTC' },
          { value: 'GBP', label: 'GBP' },
          { value: 'JPY', label: 'JPY' },
          { value: 'AUD', label: 'AUD' },
          { value: 'CAD', label: 'CAD' },
          { value: 'CNY', label: 'CNY' },
          { value: 'INR', label: 'INR' },
        ]}
        style={{ marginBottom: '20px' }}
      />

      {/* Default Graph Type */}
      <SegmentedControl
        value={defaultGraphType}
        onChange={(value) => {
          dispatch(setGraphType(value));
        }}
        size="xl"
        data={[
          { label: 'Line', value: 'line' },
          { label: 'Candlestick', value: 'bar' }, // Correct graph type
        ]}
        style={{ marginBottom: '20px' }}
      />

      {/* Default Date Range */}
      <Select
        label="Default Date Range for Graph"
        placeholder="Select date range"
        size="xl"
        value={defaultDateRange}
        onChange={(value) => {
          if (value) {
            dispatch(setDefaultDateRange(value));
          }
        }} 
        data={[
          { value: '1d', label: '1 Day' },
          { value: '7d', label: '7 Days' },
          { value: '1m', label: '1 Month' },
          { value: '1y', label: '1 Year' },
        ]}
        style={{ marginBottom: '20px' }}
      />

      <Button onClick={saveSettings}>Save Settings</Button>
    </Box>
  );
}

export default Settings;
