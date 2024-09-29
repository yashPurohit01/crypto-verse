"use client"
import { ActionIcon, Box, Button, Container, Flex, Group, Image, SegmentedControl, Text } from '@mantine/core'
import React, { useEffect } from 'react'
import { SearchInput } from '../searchInput/SearchInput'
import Link from 'next/link'
import { IconSettings } from '@tabler/icons-react'
import { SearchableDropdown } from '../searchInput/SearchableDropdown'

function HeaderNavigation() {

  return (
    <Flex justify={'space-between'} w={'100%'} align={'center'} p={'lg'}>
      <Box style={{ display: "flex", flexDirection: 'row', gap: 4, alignItems: 'flex-end', padding: "20px" }}>
        <Image alt='' src={'/cryptocurrency.png'} width={32} height={32} />
        <Text style={{
          color: 'var(--mantine-color-primary)', // Use primary color
        }}>
          CRYPTO
        </Text>
        <Text style={{
          fontSize: '10px',
          color: 'white',
          marginLeft: '-10px' // Use primary color
        }}>
          verse
        </Text>
      </Box>
      <Group gap={20}>
        <Link style={{
          textDecoration:'none',
          color:'white',
          fontSize:'12px'
        }} href={'/trending/NFT'}>Trending NFTS</Link>
        <Link style={{
          textDecoration:'none',
          color:'white',
          fontSize:'12px'
        }} href={'/trending/Coins'}>Trending Coins</Link>
         <Link style={{
          textDecoration:'none',
          color:'white',
          fontSize:'12px'
        }} href={'/trending/news'}>News</Link>
         <Link style={{
          textDecoration:'none',
          color:'white',
          fontSize:'12px'
        }} href={'/about-us'}>About us</Link>
      </Group>

      <Box w={'300px'}>
      <SearchableDropdown/>
      </Box>

      {/* <SearchInput /> */}
      
       <Link href={'/settings'} 
       >
           <ActionIcon
        radius={'lg'}
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >   <IconSettings stroke={.6}/>
      </ActionIcon>
    
       </Link>


    </Flex>



  )
}

export default HeaderNavigation