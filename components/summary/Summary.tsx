"use client"
import { RootState } from '@/Redux/store'
import { formatNumberWithCommas, formatTimestamp } from '@/utils/conversions'
import { Card, Flex, Text } from '@mantine/core'
import React from 'react'
import { useSelector } from 'react-redux'
import Media from '../shared-components/media/Media'

function Summary() {
    const {coinDetails} = useSelector((state:RootState) => state.coins)
  return (
    <Flex gap={8} direction={'column'}>
        {/* <Text style={{
            fontSize:"32px",
            fontWeight:'lighter'
        }}> Summary</Text> */}

       
        <Flex gap={15} mt={2}>
        <Card radius="20px" padding="20px" bg="#1d2129">
            <Text
             style={{
                fontSize:"36px",
                fontWeight:'lighter',
                color:'white'
            }} >
                {
                    coinDetails?.market_cap_rank
                }
            </Text>
            <Text
             
             style={{
                fontSize:"14px",
                fontWeight:'lighter',
                
            
            }} >
                MARKET RANK
            </Text>

        </Card>
       
       
        <Card radius="20px" padding="20px" bg="#1d2129" w={'300px'}>
        <Text
             style={{
                fontSize:"36px",
                fontWeight:'lighter',
                color:'white'
            }} >
                {
                    formatNumberWithCommas(coinDetails?.market_data?.total_supply)
                }
            </Text>
            <Flex gap={'lg'} justify={'space-between'} align={'flex-end'}>
            <Text
             
             style={{
                fontSize:"14px",
                fontWeight:'lighter',
            }} >
                Total Supply
            </Text>
            <Text
             
             style={{
                fontSize:"10px",
                fontWeight:'lighter',
                color:'white'
            }} >
                { 
                formatTimestamp(coinDetails?.market_data?.last_updated)}
              
            </Text>

            </Flex>
            
        </Card>
        
        </Flex>
        <Text 
        style={{
            fontSize:"16px",
            fontWeight:'lighter',
            color:'white',
            opacity:'50%'
        }} >
            {coinDetails?.description?.en}
        </Text>

        <Media/>

    </Flex>
  )
}

export default Summary