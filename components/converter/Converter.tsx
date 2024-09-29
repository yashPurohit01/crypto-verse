import { Box, Card, Flex, Progress, Text } from '@mantine/core'
import React from 'react'
import CryptoList from '../shared-components/crypto-list/page'
import { IconInfoSmall } from '@tabler/icons-react'

function Converter() {
    return (
        <Flex gap={1} direction={'column'} style={{
            marginTop: "2px",

        }}>
            <Card radius="30px" padding="50px" bg="#1d2129">
                <Text style={{
                  color:'white'
                }} fz="xs"  fw={400} >
                   You Sell
                </Text>
                <CryptoList/>
               
            </Card>
            <Card radius="30px" padding="50px" bg="#1d2129">
                <Text style={{
                  color:'white'
                }} fz="xs"  fw={400} >
                   You Buy
                </Text>
                <CryptoList/>

                <Box bg={'gray'} p={8} mt={10} style={{
                    borderRadius:'12px',
                    

                }}>
                    <Flex align={'center'}>
                      <IconInfoSmall/>
                    <Text size='12px'>
                      
                        1 Etherum = 300 CWEB
                    </Text>
                    </Flex>


                </Box>
               
            </Card>
        </Flex>
    )
}

export default Converter