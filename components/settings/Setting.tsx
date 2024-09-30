"use client";

import { setDefaultDateRange, setGraphType } from '@/Redux/slice/GraphSlice';
import { setGlobalCurrency } from '@/Redux/slice/currencySlice';
import { AppDispatch } from '@/Redux/store';
import { Box, Select, SegmentedControl, Button, Text } from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
 // Make sure this path is correct

function Settings() {
  const [currency, setCurrency] = useState<string>('USD'); // Default currency
  const [defaultGraphType, setDefaultGraphType] = useState<string>('line'); // Default graph type
  const [defaultDateRange, setDefaultDateRangeValue] = useState<string>('7d'); // Default date range

  const dispatch: AppDispatch = useDispatch();

  const saveSettings = () => {
    // Dispatch the setGlobalCurrency action
    dispatch(setGlobalCurrency({
      currency: currency,
      symbol: getCurrencySymbol(currency) // Function to map currency to symbol
    }));

    // Dispatch graph type and date range updates
    dispatch(setGraphType(defaultGraphType));
    dispatch(setDefaultDateRange(defaultDateRange));

    console.log({
      currency,
      defaultGraphType,
      defaultDateRange,
    });
  };

  // Function to return the symbol based on selected currency
  const getCurrencySymbol = (currency: string): string => {
    switch (currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'BTC':
        return '₿';
      default:
        return '$'; // Fallback to USD symbol
    }
  };

  return (
    <Box mr={'lg'} ml={'lg'} style={{ borderRadius: '8px', padding: '60px', margin: 'xl' }}>
      <Text size="xl" fw={500} style={{ marginBottom: '20px' }}>
        Settings
      </Text>
      {/* Currency Setting */}
      <Select
        label="Display Currency"
        size='lg'
        placeholder="Select a currency"
        value={currency}
        c={'white'}
        onChange={(value) => setCurrency(value || 'USD')} // Ensure it's always a string
        data={[
          { value: 'USD', label: 'USD' },
          { value: 'EUR', label: 'EUR' },
          { value: 'BTC', label: 'BTC' },
        ]}
        style={{ marginBottom: '20px' }}
      />

      {/* Default Graph Type */}
      <SegmentedControl
     
        value={defaultGraphType}
        onChange={setDefaultGraphType}
        c={'white'}
        size='xl'
        data={[
          { label: 'Line', value: 'line' },
          { label: 'Candlestick', value: 'bar' }, // Corrected typo
        ]}
        style={{ marginBottom: '20px' }}
      />

      {/* Default Date Range */}
      <Select
        label="Default Date Range for Graph"
        placeholder="Select date range"
        size='xl'
        value={defaultDateRange}
        c={'white'}
        onChange={(value) => setDefaultDateRangeValue(value || '7d')} // Ensure it's always a string
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
