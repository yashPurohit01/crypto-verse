import {
    Card,
    Group,
    Image,
    Text,
    ThemeIcon,
    Progress,
    Badge,
    Flex,
    Paper,
  } from '@mantine/core';
  import classes from './CryptoCard.module.css';
  
  const NftCard = ({ nft }:any) => {
    return (
      <Paper  key={nft.id} radius="30px" bg="#1d2129" className={classes.card} mt={20}style={{ backgroundColor: '#1d2129', padding: '20px' }}>
        <ThemeIcon size={60} radius={60} style={{ marginBottom: '-30px', marginLeft: 'auto', marginRight: 'auto' }}>
          <Image src={nft.thumb} alt={nft.name} radius="md" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
        </ThemeIcon>
  
        <Text w={500} style={{ color: 'white', fontSize: '20px' }}>
          {nft.name}
        </Text>
  
        <Badge color="blue" variant="light" style={{  margin: '10px auto' }}>
          {nft.symbol}
        </Badge>
  
        <Text  w={500} size="xl" style={{ color: 'white', }}>
          Floor Price: {nft.data.floor_price}
        </Text>
  
        <Group w={'100%'}   style={{ padding: '10px', gap:'20px' }}>
          <Flex justify="space-between">
            <Text size="xs" style={{ color: 'white' }}>
              24h Volume
            </Text>
            <Text size="sm" c="dimmed">
              {nft.data.h24_volume}
            </Text>
          </Flex>
  
          <Flex justify="space-between">
            <Text size="xs" style={{ color: 'white' }}>
              24h Avg Sale Price
            </Text>
            <Text size="sm" c="dimmed">
              {nft.data.h24_average_sale_price}
            </Text>
          </Flex>
  
          <Flex justify="space-between">
            <Text size="xs" style={{ color: 'white' }}>
              Floor Price in {nft.native_currency_symbol}
            </Text>
            <Text size="sm" c="dimmed">
              {nft.floor_price_in_native_currency} {nft.native_currency_symbol}
            </Text>
          </Flex>
  
          <Flex justify="space-between" mt="sm">
            <Text size="lg" w={500} style={{ color: 'white' }}>
              {nft.floor_price_in_native_currency} {nft.native_currency_symbol}
            </Text>
           
          </Flex>
  
         
        </Group>
  
      </Paper>
    );
  };
  
  export default NftCard;
  