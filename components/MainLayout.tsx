"use client"
import { Flex } from '@mantine/core'
import React, { ReactNode, useEffect } from 'react'
import HeaderNavigation from './shared-components/HeaderNavigation/page'
import FloatingCryptos from './Cryptos/FloatingCryptos'
import Cryptos from './Cryptos/Cryptos'
import { AppDispatch } from '@/Redux/store'
import { fetchCoins } from '@/Redux/thunks/CryptoThunks'
import { useDispatch } from 'react-redux'

interface IProps{
    children:ReactNode
}
function MainLayout({children}:IProps) {
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
      dispatch(fetchCoins());
  }, [dispatch]);
  
  return (
    <Flex justify="center" p={'lg'} align='flex-start' direction="column" gap="xl">
            <HeaderNavigation />
            <FloatingCryptos/>
            {children}
         <Cryptos/>
    </Flex>
  )
}

export default MainLayout