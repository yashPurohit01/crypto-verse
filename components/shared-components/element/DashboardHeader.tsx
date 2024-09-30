"use Client";
import { useEffect, useState, useMemo } from 'react';
import { UnstyledButton, Menu, Image, Group, Title, Text, Flex, Box, Button, Skeleton } from '@mantine/core';
import { IconChartBar, IconChartLine, IconChevronDown } from '@tabler/icons-react';
import classes from '../crypto-options/CryptoOptions.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { CoinDetail } from '@/Redux/interface';
import { useParams } from 'next/navigation';
import { fetchMarketChartGraphData, fetchOHLCGraphData } from '@/Redux/thunks/GraphThunks';
import { fetchCoins } from '@/Redux/thunks/CryptoThunks';

interface IProps {
    setGraphSelection: any;
    selectedGraph: string; // Correctly defines a function that takes no arguments and returns void
}

export function DashboardHeaderElements({ setGraphSelection, selectedGraph }: IProps) {
    const [opened, setOpened] = useState(false);
    const [dateOpened, setDateOpened] = useState(false);
    const [selectedDate, setSelectedDate] = useState("1 Year"); // Default selection for date
    const [selected, setSelected] = useState<CoinDetail | null>(null);

    const dispatch: AppDispatch = useDispatch();
    const params = useParams<{ coinID: string }>();

    const { coinID } = params;
    const { coinDetails, loading } = useSelector((state: RootState) => state.coins);
    const globalCurrency = useSelector((state: RootState) => state.currency.globalCurrency);

    // Fetch coins when the component mounts
    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);

    // Fetch graph data when the selected coin, graph type, or global currency changes
    useEffect(() => {
        if (coinID) {
            // Map the selected date to the corresponding number of days
            const daysMap: Record<string, string> = {
                "1 Day": "1",
                "3 Day": "3",
                "1 Week": "7",
                "1 Month": "30",
                "6 Month": "180",
                "1 Year": "365",
            };
            const days = daysMap[selectedDate] || "365"; // Default to 365 if the selectedDate is not found

            // Conditionally fetch the appropriate graph data based on selectedGraph
            if (selectedGraph === "bar") {
                dispatch(fetchOHLCGraphData({ coinId: coinID, currency: globalCurrency, days }));
            } else {
                dispatch(fetchMarketChartGraphData({ coinId: coinID, currency: globalCurrency, days }));
            }
        }
    }, [dispatch, selected, globalCurrency, selectedDate, selectedGraph, coinID]);

    // Memoize the date options
    const dateItems = useMemo(() => ["1 Day", "3 Day", "1 Week", "1 Month", "6 Month", "1 Year"].map((label) => (
        <Menu.Item
            style={{
                fontSize:'12px'
            }}
            onClick={() => {
                setSelectedDate(label);
                setDateOpened(false);
            }}
            key={label}
        >
          <Text fs={'xs'}> {label}</Text> 
        </Menu.Item>
    )), []);

    const percentageChange = parseFloat(coinDetails?.market_data?.price_change_percentage_24h_in_currency?.usd) ?? 0;
    const color = percentageChange >= 0 ? 'green' : 'red';

    return (
        <Box style={{ width: "100%" }}>
            {!loading ?
                <Flex align="flex-end" justify="space-between">
                    <Group gap="xs">
                        <Image src={coinDetails?.image.small} width={32} height={32} style={{ borderRadius: '8px' }} />
                        <span style={{ color: 'var(--mantine-color-secondary-1)' }} className={classes.label}>
                            {coinDetails?.name}
                        </span>
                    </Group>

                    <Flex gap="md">
                        <Button
                            variant="outline"
                            style={{
                                padding: 6,
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                            onClick={() => setGraphSelection("bar")}
                        >
                            <IconChartBar stroke={0.8} opacity={.8} />
                        </Button>

                        <Button
                            variant="outline"
                            style={{
                                padding: 6,
                                backgroundColor: 'transparent',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                            onClick={() => setGraphSelection("line")}
                        >
                            <IconChartLine stroke={0.8} opacity={.8} />
                        </Button>
                    </Flex>
                </Flex> :
                <Flex align="flex-end" justify="space-between">
                    <Group>
                        <Skeleton height={50} width="100px" radius="md" />
                        
                    </Group>
                    <Group>
                        <Skeleton height={60} width="200px" radius="md" />
                        
                    </Group>


                </Flex>

            }
            {!loading ?
                <Flex align="flex-end" justify="space-between">
                    <Box>
                        <Flex align="flex-end">
                            <Title style={{ fontSize: '48px', fontWeight: 'lighter', marginLeft: '4px' }} className={classes.price}>
                                {parseFloat(coinDetails?.market_data?.current_price?.usd).toFixed(6)}
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
                </Flex> :
                 <Skeleton height={100} width="300px" radius="md" mt={10} />
            }
        </Box>
    );
}
