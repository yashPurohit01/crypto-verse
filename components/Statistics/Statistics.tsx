"use client";

import { useEffect, useState } from "react";
import { Flex, Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import CustomCard from "../shared-components/crypto-cards/CustomCards";
 // Import the CustomCard component

interface MarketData {
  current_price: { usd: number };
  market_cap: { usd: number };
  total_volume: { usd: number };
  price_change_percentage_24h: { usd: number };
  ath: { usd: number };
  atl: { usd: number };
  market_cap_rank: number;
}

interface CoinWebStats {
  name: string;
  symbol: string;
  market_data: MarketData;
}

const Statistics = () => {
  const { coinDetails, loading } = useSelector((state: RootState) => state.coins);
  const {globalCurrency,} = useSelector((state: RootState) => state.currency);
  if (loading) {
    return <Loader/>; // Show a loader while loading
  }

  const { name, symbol, market_data } = coinDetails;

  return (
    <Flex  wrap="wrap" mt="md" gap="lg">
      <CustomCard title="Current Price (USD)" value={`$${parseFloat(market_data.current_price[globalCurrency]).toLocaleString()}`} />
      <CustomCard title="Market Cap (USD)" value={`$${parseFloat(market_data.market_cap[globalCurrency]).toLocaleString()}`} />
      <CustomCard title="Total Volume (USD)" value={`$${parseFloat(market_data.total_volume[globalCurrency]).toLocaleString()}`} />
      <CustomCard
        title="24h Price Change"
        value={`${parseFloat(market_data.price_change_percentage_24h[globalCurrency]).toFixed(2)}%`}
       // style={{ color: market_data.price_change_percentage_24h[globalCurrency] < 0 ? 'red' : 'green' }} // Handle color
      />
      <CustomCard title="All-Time High (USD)" value={`$${parseFloat(market_data.ath[globalCurrency]).toLocaleString()}`} />
      <CustomCard title="All-Time Low (USD)" value={`$${parseFloat(market_data.atl[globalCurrency]).toLocaleString()}`} />
      <CustomCard title="Market Cap Rank" value={market_data.market_cap_rank} />
    </Flex>
  );
};

export default Statistics;
