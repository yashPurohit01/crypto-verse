"use client";
import { RootState } from '@/Redux/store';
import { Flex } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CoinDetail } from '@/Redux/interface';
import { CryptoCard } from '../shared-components/crypto-cards/CryptoCard';
import BasicCryptoCards from '../shared-components/crypto-cards/BasicCryptoCards';
 // Adjust path if necessary

function FloatingCryptos() {
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
        <BasicCryptoCards
          name={coin?.item.name}
          price={coin?.item.data?.price}
          image={coin?.item.large}
          currency={currencySymbol}
        />
      ))}
    </Flex>
  );
}

export default FloatingCryptos;
