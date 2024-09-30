"use client"
import { Flex } from '@mantine/core'
import React, { ReactNode, useEffect } from 'react'
import HeaderNavigation from './shared-components/HeaderNavigation/page'
import FloatingCryptos from './Cryptos/FloatingCryptos'
import Cryptos from './Cryptos/Cryptos'
import { AppDispatch, RootState } from '@/Redux/store'
import { fetchCoins } from '@/Redux/thunks/CryptoThunks'
import { useDispatch, useSelector } from 'react-redux'

interface IProps{
    children:ReactNode
}
function MainLayout({children}:IProps) {
    const dispatch:AppDispatch = useDispatch()
    const {globalCurrency,currencySymbol} = useSelector((state: RootState) => state.currency);

    useEffect(() => {
      dispatch(fetchCoins());
  }, [dispatch , globalCurrency]);
  
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