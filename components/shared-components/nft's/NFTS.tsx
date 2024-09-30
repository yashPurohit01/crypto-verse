"use client"
import { NFT } from '@/Redux/interface';
import { RootState } from '@/Redux/store';
import { Card, Image, Text, Badge, Group, Flex, Title } from '@mantine/core';
import { useSelector } from 'react-redux';
import NftCard from '../crypto-cards/NFTCard';



export function NFTList() {
    const {nfts} = useSelector((state:RootState) => state.coins)
  return (
    <Flex
      direction="row"
      p={'3.5rem'}
      gap="xl"
      wrap="wrap"
      style={{ marginTop: '20px' }}
    >
      {nfts.map((nft:any) => {
        const color = nft.floor_price_24h_percentage_change >= 0 ? 'green' : 'red';
        return (
          <NftCard nft={nft}/>
        );
      })}
    </Flex>
  );
}
