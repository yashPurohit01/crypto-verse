"use client";
import { useEffect, useMemo } from 'react';
import { UnstyledButton, Menu, Image, Group, Title, Text, Flex, Box, Button, Skeleton } from '@mantine/core';
import { IconArrowsExchange2, IconChartBar, IconChartLine, IconChevronDown } from '@tabler/icons-react';
import classes from '../crypto-options/CryptoOptions.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { formatNumberWithCommas } from '@/utils/conversions';
import { setCompare } from '@/Redux/slice/GraphSlice';
import { fetchMarketChartGraphData, fetchOHLCGraphData } from '@/Redux/thunks/GraphThunks';

interface IProps {
    coinID: string;
    setGraphSelection: (graph: string) => void;
    selectedGraph: string;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    loading: boolean;
    coinDetails: any; // Adjust the type according to your data structure
    globalCurrency: string;
    currencySymbol: string;
    hideCompare?:boolean
}

export function DashboardHeaderElements({
    coinID,
    setGraphSelection,
    selectedGraph,
    selectedDate,
    setSelectedDate,
    loading,
    coinDetails,
    globalCurrency,
    currencySymbol,
    hideCompare=false
}: IProps) {
    const dispatch: AppDispatch = useDispatch();
    const { compare } = useSelector((state: RootState) => state.graph);

    useEffect(() => {
        if (coinID) {
            const daysMap: Record<string, string> = {
                "1 Day": "1",
                "3 Day": "3",
                "1 Week": "7",
                "1 Month": "30",
                "6 Month": "180",
                "1 Year": "365",
            };

            // Get the number of days based on the selected date range
            const days = daysMap[selectedDate] || "365"; // Default to 365 days if not found

            // Determine which graph data to fetch based on the selected graph type
            const fetchGraphData = selectedGraph === "bar" ? fetchOHLCGraphData : fetchMarketChartGraphData;

            // Dispatch the action to fetch the graph data
            dispatch(fetchGraphData({ coinId: coinID, currency: globalCurrency, days }));
        }
    }, [dispatch, globalCurrency, selectedDate, selectedGraph, coinID]);


    const dateItems = useMemo(() => {
        const dates = ["1 Day", "3 Day", "1 Week", "1 Month", "6 Month", "1 Year"];
        return dates.map(label => (
            <Menu.Item
                style={{ fontSize: '12px' }}
                onClick={() => setSelectedDate(label)}
                key={label}
            >
                <Text fs={'xs'}>{label}</Text>
            </Menu.Item>
        ));
    }, [setSelectedDate]);

    const percentageChange = parseFloat(coinDetails?.market_data?.price_change_percentage_24h_in_currency[globalCurrency]) ?? 0;
    const priceChange = parseFloat(coinDetails?.market_data?.price_change_24h_in_currency[globalCurrency]) ?? 0;
    const color = (percentageChange >= 0 && priceChange >= 0) ? 'green' : 'red';

    const buttonStyles = useMemo(() => ({
        padding: 6,
        backgroundColor: 'transparent',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
    }), []);

    return (
        <Box style={{ width: "100%" }}>
            {!loading ? (
                <Flex align="flex-end" justify="space-between">
                    <Group gap="xs">
                        <Image src={coinDetails?.image.small} width={32} height={32} style={{ borderRadius: '8px' }} />
                        <span style={{ color: 'var(--mantine-color-secondary-1)' }} className={classes.label}>
                            {coinDetails?.name}
                        </span>
                    </Group>

                    <Flex gap="md">
                        <Button variant="outline" style={buttonStyles} onClick={() => setGraphSelection("bar")}>
                            <IconChartBar stroke={0.8} opacity={0.8} />
                        </Button>

                        <Button variant="outline" style={buttonStyles} onClick={() => setGraphSelection("line")}>
                            <IconChartLine stroke={0.8} opacity={0.8} />
                        </Button>

                        {
                            !hideCompare &&
                            <Button variant="outline" style={buttonStyles} onClick={() => dispatch(setCompare(!compare))}>
                                <Text size='xs' opacity={'.6'} mr={4}>compare</Text>
                                <IconArrowsExchange2 stroke={0.8} opacity={0.8} />
                            </Button>
                        }


                    </Flex>
                </Flex>
            ) : (
                <Flex align="flex-end" justify="space-between">
                    <Group>
                        <Skeleton height={50} width="100px" radius="md" />
                    </Group>
                    <Group>
                        <Skeleton height={60} width="200px" radius="md" />
                    </Group>
                </Flex>
            )}
            {!loading ? (
                <Flex align="flex-end" justify="space-between">
                    <Box>
                        <Flex align="flex-end">
                            <Title style={{ fontSize: '48px', fontWeight: 'lighter', marginLeft: '4px' }} className={classes.price}>
                                {currencySymbol} {formatNumberWithCommas(parseFloat(coinDetails?.market_data?.current_price[globalCurrency]).toFixed(3))}
                            </Title>
                            <Text style={{ color, marginBottom: '8px', marginLeft: '4px', fontSize: '10px' }}>
                                {Math.abs(priceChange).toFixed(2)} ({Math.abs(percentageChange).toFixed(2)})%
                            </Text>
                        </Flex>
                    </Box>

                    <Box>
                        <Menu radius="md" width="target" withinPortal>
                            <Menu.Target>
                                <UnstyledButton>
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
            ) : (
                <Skeleton height={100} width="300px" radius="md" mt={10} />
            )}
        </Box>
    );
}
