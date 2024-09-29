import { Flex, Group, Image, Paper, Text } from '@mantine/core'

import React from 'react'

interface IProps {
    image:string;
    name:string;
    price:number;
}
function BasicCryptoCards({image,name,price}:IProps) {
  return (
    <Paper radius="10px" bg="#1d2129" w={"300px"} p={20} >
        <Flex gap={8} align={'center'}>
     <Image src={image} width={64} height={64} style={{ borderRadius: '8px' }} />
     <Flex direction={'column'} gap={2}>
        <Text fw={100}  opacity={.5} fs={'12px'}  style={{fontSize:'12px'}} >{name}</Text>
        <Text style={{fontSize:'32px', color:'white', fontWeight:'lighter'}}>${price.toFixed(2)}</Text>

     </Flex>
     </Flex>
    </Paper>
  )
}

export default BasicCryptoCards