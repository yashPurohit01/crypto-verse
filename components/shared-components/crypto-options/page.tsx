"use Client";
import { useEffect, useState, useMemo, SetStateAction } from 'react';
import { UnstyledButton, Menu, Image, Group, Title, Text, Flex, Box, Button } from '@mantine/core';
import { IconChartBar, IconChartLine, IconChevronDown } from '@tabler/icons-react';
import classes from './CryptoOptions.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoinDetails, fetchCoins} from '@/Redux/thunks/CryptoThunks';
import { AppDispatch, RootState } from '@/Redux/store';
import { CoinDetail } from '@/Redux/interface';
import { selectCoin } from '@/Redux/slice/CryptoCoinsSlice';
import { Dispatch } from '@reduxjs/toolkit';

interface IProps {
  setGraphSelection: any; // Correctly defines a function that takes no arguments and returns void
}

export function CryptoOptions({setGraphSelection}:IProps) {
  const [opened, setOpened] = useState(false);
  const [dateOpened, setDateOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState("1 Day"); // Default selection for date
  const [selected, setSelected] = useState<CoinDetail | null>(null);
 

  const dispatch: AppDispatch = useDispatch();

  const { coins } = useSelector((state: RootState) => state.coins);
  const globalCurrency = useSelector((state: RootState) => state.currency.globalCurrency);

  // Fetch coins when the component mounts
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  // Fetch details and graph when the selected coin or global currency changes
  useEffect(() => {
    if (selected?.item?.id) {
      dispatch(fetchCoinDetails(selected.item.id));
      // Fetch graph data based on the selected date
      const daysMap: Record<string, string> = {
        "1 Day": "1",
        "3 Day": "3",
        "1 Week": "7",
        "1 Month": "30",
        "6 Month": "180",
        "1 Year": "365",
      };
      const days = daysMap[selectedDate] || "365"; // Default to 365 if the selectedDate is not found
      // dispatch(fetchGraphData({ coinId: selected.item.id, days, currency: globalCurrency }));
    }
  }, [dispatch, selected, globalCurrency, selectedDate]); // Add selectedDate to dependencies

  // Automatically select the first coin after fetching
  useEffect(() => {
    if (coins.length > 0 && !selected) {
      const firstCoin: any = coins[0]; // Ensure this is CoinDetail
      setSelected(firstCoin);
      dispatch(selectCoin(firstCoin));
    }
  }, [coins, dispatch, selected]);

  // Memoize the coin items to avoid recalculating on every render
  const coinItems = useMemo(() => {
    return coins?.map((coin: any) => (
      <Menu.Item
        leftSection={<Image src={coin.item.small} width={18} height={18} />}
        onClick={() => {
          setSelected(coin);
          dispatch(selectCoin(coin));
        }}
        key={coin.item.id}
      >
        {coin.item.symbol}
      </Menu.Item>
    ));
  }, [coins, dispatch]);

  // Memoize the date options
  const dateItems = useMemo(() => ["1 Day", "3 Day", "1 Week", "1 Month", "6 Month", "1 Year"].map((label) => (
    <Menu.Item
      onClick={() => {
        setSelectedDate(label);
        setDateOpened(false);
      }}
      key={label}
    >
      {label}
    </Menu.Item>
  )), []);

  const percentageChange = selected?.item?.data?.price_change_percentage_24h[globalCurrency]?? 0;
  const color = percentageChange >= 0 ? 'green' : 'red';

  return (
    <div style={{ width: "100%" }}>
      <Flex align="flex-end" justify="space-between">
        <Menu
          onOpen={() => setOpened(true)}
          onClose={() => setOpened(false)}
          radius="md"
          width="target"
          withinPortal
        >
          <Menu.Target>
            <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
              <Group gap="xs">
                <Image src={selected?.item?.small} width={32} height={32} style={{ borderRadius: '8px' }} />
                <span style={{ color: 'var(--mantine-color-secondary-1)' }} className={classes.label}>
                  {selected?.item?.symbol}
                </span>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown style={{ border: 'none' }}>{coinItems}</Menu.Dropdown>
        </Menu>

        <Flex gap="md">
          <Button 
            variant="outline" // Use "outline" variant for transparency
            // You can change the color as needed
            style={{
              padding:6,
              backgroundColor: 'transparent', // Make background transparent
              border: '1px solid rgba(255, 255, 255, 0.2)', // Optional: add border
              // Text color
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: add a hover effect
              },
            }} onClick={() => setGraphSelection("bar")} >
            <IconChartBar stroke={0.8} opacity={.8} />
          </Button>
        
        <Button     variant="outline" // Use "outline" variant for transparency
            // You can change the color as needed
            style={{
              padding:6,
              backgroundColor: 'transparent', // Make background transparent
              border: '1px solid rgba(255, 255, 255, 0.2)', // Optional: add border
              // Text color
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Optional: add a hover effect
              },
            }}
            onClick={() => setGraphSelection("line")}>
        <IconChartLine stroke={0.8} opacity={.8} />
        </Button>
         
        </Flex>
      </Flex>

      <Flex align="flex-end" justify="space-between">
        <Box>
          <Flex align="flex-end">
            <Title style={{ fontSize: '48px', fontWeight: 'lighter', marginLeft: '4px' }} className={classes.price}>
              {selected?.item?.data?.price?.toFixed(6)}
            </Title>
            <Text
              style={{
                color,
                marginBottom: '8px',
                marginLeft: '4px',
                fontSize: '10px',
              }}
            >
              ({Math.abs(percentageChange).toFixed(2)})%
            </Text>
          </Flex>
        </Box>

        <Box>
          <Menu
            onOpen={() => setDateOpened(true)}
            onClose={() => setDateOpened(false)}
            radius="md"
            width="target"
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton data-expanded={dateOpened || undefined}>
                <Group style={{ border: '1px solid #ffffff30', borderRadius: '8px', padding: '8px' }} gap="xs">
                  <Text style={{ fontWeight: 'lighter', fontSize: '10px', color: 'var(--mantine-color-secondary-1)' }}>
                    {selectedDate}
                  </Text>
                  <IconChevronDown size="1rem" stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>{dateItems}</Menu.Dropdown>
          </Menu>
        </Box>
      </Flex>
    </div>
  );
}
