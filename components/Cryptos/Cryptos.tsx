"use client";
import { RootState } from '@/Redux/store';
import { Flex } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CoinDetail } from '@/Redux/interface';
import { CryptoCard } from '../shared-components/crypto-cards/CryptoCard';
 // Adjust path if necessary

function Cryptos() {
  const { coins } = useSelector((state: RootState) => state.coins);
  const [randomCoins, setRandomCoins] = useState<any[]>([]);
  const { globalCurrency , currencySymbol} = useSelector((state: RootState) => state.currency);

  useEffect(() => {
    if (coins.length > 0) {
      // Create a shallow copy of the coins array to avoid direct mutation
      const shuffled = [...coins].sort(() => 0.5 - Math.random()); // Shuffle the coins array
      setRandomCoins(shuffled.slice(0, 4)); // Select the first 5 coins from the shuffled array
    }
  }, [coins]);

  console.log(coins)

  return (
    <Flex gap={20} wrap="wrap"  justify={'center'}  w={'100%'}>
      {randomCoins.map((coin: CoinDetail) => (
        <CryptoCard
          key={coin?.item.id}
          id={coin?.item.id}
          name={coin?.item.name}
          currenySymbol={currencySymbol}
          symbol={coin?.item.symbol}
          price={coin?.item.data?.price}
          priceChangePercentage={coin?.item.data?.price_change_percentage_24h[globalCurrency] || 0}
          marketCap={coin?.item.data?.market_cap}
          marketCapBtc={coin?.item.data?.market_cap_btc}
          totalVolume= {coin?.item.data?.total_volume}
          totalVolumeBtc= {coin?.item.data?.total_volume_btc}
          imageUrl={coin?.item.large}
        />
      ))}
    </Flex>
  );
}

export default Cryptos;
