"use Client"
import { NFT } from '@/Redux/interface';
import { Card, Image, Text, Badge, Group, Flex, Title } from '@mantine/core';
import { useSelector } from 'react-redux';



export function NFTList() {
    const {nfts} = useSelector((state:any) => state.coins)
  return (
    <Flex
      direction="row"
      gap="md"
      wrap="wrap"
      style={{ marginTop: '20px' }}
    >
      {nfts.map((nft:any) => {
        const color = nft.floor_price_24h_percentage_change >= 0 ? 'green' : 'red';
        return (
          <Card key={nft.id} shadow="sm" padding="lg" radius="md" withBorder style={{ width: '300px' }}>
            <Card.Section>
              <Image src={nft.thumb} alt={nft.name} height={160} />
            </Card.Section>

            <Group  mt="md" mb="xs">
              <Title order={4}>{nft.name}</Title>
              <Badge color="blue" variant="light">
                {nft.symbol}
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              Floor Price: {nft.data.floor_price}
            </Text>

            <Text size="sm" color="dimmed">
              24h Volume: {nft.data.h24_volume}
            </Text>

            <Text size="sm" color="dimmed">
              24h Avg Sale Price: {nft.data.h24_average_sale_price}
            </Text>

            <Flex align="center" justify="space-between" mt="sm">
              <Text size="lg" >
                {nft.floor_price_in_native_currency} {nft.native_currency_symbol}
              </Text>
              <Text size="sm" style={{ color: color }}>
                {nft.floor_price_24h_percentage_change.toFixed(2)}%
              </Text>
            </Flex>
          </Card>
        );
      })}
    </Flex>
  );
}
