"use Client"
import LineCharts from "@/components/shared-components/charts/LineCharts";
import { Flex, Text, Title } from "@mantine/core";
import { useSelector } from "react-redux";


export function Home() {
  const { selectedCoin } = useSelector((state: any) => state.coins)
  const percentageChange = selectedCoin?.item?.data?.price_change_percentage_24h?.usd ?? 0;
  console.log(selectedCoin?.item?.data?.price_change_percentage_24h?.usd)
  const color = percentageChange >= 0 ? 'green' : 'red';

  return (
    <div style={{
      width: "50%"
    }} >
      <Flex align={'flex-end'} >
        <Title style={{
          fontSize: '48px',
          fontWeight: 'lighter',
          marginLeft: '4px'
        }} >  {selectedCoin?.item?.data?.price?.toFixed(6)}</Title>
        <Text
          style={{
            color: color,
            marginBottom: '8px',
            marginLeft: '4px',
            fontSize: '10px'
            // Green if positive, red if negative
          }}
        >
          ({Math.abs(percentageChange).toFixed(2)})% {/* Removes negative sign and formats to 2 decimal places */}
        </Text>
      </Flex>
      
      {/* <CandlestickChart/> */}
    </div>
  );
}

