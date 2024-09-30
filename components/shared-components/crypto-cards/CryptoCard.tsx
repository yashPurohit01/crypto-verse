// CryptoCard.tsx
import { ThemeIcon, Progress, Text, Group, Badge, Paper, rem } from '@mantine/core';
import classes from './CryptoCard.module.css';

interface CryptoCardProps {
  id: string; // Coin ID
  name: string;
  symbol: string;
  currenySymbol:string;
  price: number;
  marketCapBtc: string;
  totalVolume: string;
  totalVolumeBtc: string;
  priceChangePercentage: number; // This should be a percentage value
  marketCap: string; // Market cap as a string
  imageUrl: string; // Image URL
}

export function CryptoCard({ name, symbol, price,  currenySymbol,priceChangePercentage, marketCap, imageUrl, totalVolume, totalVolumeBtc, marketCapBtc }: CryptoCardProps) {
  return (
    <Paper radius="30px" bg="#1d2129" className={classes.card} mt={20}>
      <ThemeIcon className={classes.icon} size={60} radius={60}>
        <img src={imageUrl} alt={name} style={{ width: 60, height: 60, borderRadius: '50%' }} /> {/* Image instead of Icon */}
      </ThemeIcon>
      <Text ta="center" fw={300} style={{ color: 'white', fontSize: '20px', marginTop: '-50px' }} >
        {name}
      </Text>
      <Text fw={100} ta="center" fz="xl">
       {currenySymbol} {price?.toFixed(2)}
      </Text>

      <Group gap={2} style={{ padding: '10px', width: '100%' }} >

        <Group justify="space-between" mt="xs" w={'100%'}>
          <Text fz="xs" style={{ color: 'white', fontSize: '10px' }}>
            24h Change
          </Text>

          <Text fz="sm" c={priceChangePercentage > 0 ? 'green' : 'red'}>
            {priceChangePercentage?.toFixed(2)}%
          </Text>
        </Group>

         <Group>
        <Progress value={Math?.abs(priceChangePercentage)} mt={5} />
        </Group>
        <Group justify="space-between" mt="md" w={'100%'}>
          <Text fz="xs">Market Cap: </Text>
          <Text fz="xs" style={{ color: 'white' }}>{marketCap}</Text>
        </Group>

        <Group justify="space-between" mt="md" w={'100%'}>
          <Text fz="xs">Volume: </Text>
          <Text fz="xs" style={{ color: 'white' }}>{totalVolume}</Text>
        </Group>
      </Group>
      <Group bg={'gray'} style={{padding:"10px" , paddingLeft: '20px', paddingRight:'20px', marginTop: '10px', borderRadius: '20px' }} >
        
        <Group justify="space-between" mt="md" w={'100%'}>
          <Text fz="xs">Market Cap BTC: </Text>
          <Text fz="xs" style={{ color: 'white' }}>{parseFloat(marketCapBtc).toFixed(2)}</Text>
        </Group>

        <Group justify="space-between" mt="md" w={'100%'}>
          <Text fz="xs">Volume BTC: </Text>
          <Text fz="xs" style={{ color: 'white' }}>{parseFloat(totalVolumeBtc).toFixed(2)}</Text>
        </Group>
      </Group>
    </Paper>
  );
}
