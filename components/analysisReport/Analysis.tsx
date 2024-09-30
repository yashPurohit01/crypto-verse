"use client";
import { RootState } from '@/Redux/store';
import { formatNumberWithCommas, formatTimestamp } from '@/utils/conversions';
import { Card, Flex, Text } from '@mantine/core';
import React from 'react';
import { useSelector } from 'react-redux';

function Analysis() {
    const { coinDetails } = useSelector((state: RootState) => state.coins);

    const { globalCurrency} = useSelector((state: RootState) => state.currency);

    function formatValueWithColor(value: string): JSX.Element {
        const numericValue = parseFloat(value); // Convert string to number
        if (isNaN(numericValue)) {
            return <span>{value}</span>; // Return original value if it's not a valid number
        }

        const absoluteValue = Math.abs(numericValue); // Get the absolute value
        const color = numericValue < 0 ? 'red' : 'green'; // Set the color based on positivity/negativity

        return (
            <span style={{ color }}>
                {absoluteValue.toFixed(2)} {/* Display value with two decimal places */}
            </span>
        );
    }

    return (
        <Flex gap={8} direction={'column'}>
            <Text style={{
                fontSize: "32px",
                fontWeight: 'lighter'
            }}> </Text>
            <Card radius="20px" padding="20px" bg="#1d2129">
                <Text style={{
                    fontSize: "36px",
                    fontWeight: 'lighter',
                    color: 'white'
                }}>
                    {coinDetails?.market_cap_rank}
                </Text>
                <Text style={{
                    fontSize: "12px",
                    fontWeight: 'lighter',
                    color: 'white'
                }}>
                    MARKET RANK
                </Text>
            </Card>

            <Flex gap={4}>
                <Card radius="20px" padding="20px" bg="#1d2129">
                    <Flex align={'flex-end'}>
                        <Text style={{
                            fontSize: "36px",
                            fontWeight: 'lighter',
                            color: 'green'
                        }}>
                            {coinDetails?.sentiment_votes_up_percentage}
                        </Text>
                        <Text style={{
                            fontSize: "12px",
                            color: 'white',
                            marginBottom: '10px'
                        }}>
                            %
                        </Text>
                    </Flex>
                    <Text style={{
                        fontSize: "14px",
                        fontWeight: 'lighter',
                        color: 'white'
                    }}>
                        SENTIMENT VOTES UP
                    </Text>
                </Card>

                <Card radius="20px" padding="20px" bg="#1d2129">
                    <Flex align={'flex-end'}>
                        <Text style={{
                            fontSize: "36px",
                            fontWeight: 'lighter',
                            color: 'red'
                        }}>
                            {coinDetails?.sentiment_votes_down_percentage}
                        </Text>
                        <Text style={{
                            fontSize: "12px",
                            color: 'white',
                            marginBottom: '10px'
                        }}>
                            %
                        </Text>
                    </Flex>
                    <Text style={{
                        fontSize: "14px",
                        fontWeight: 'lighter',
                        color: 'white'
                    }}>
                        SENTIMENT VOTES DOWN
                    </Text>
                </Card>
            </Flex>

            <Flex>
                <Card radius="20px" padding="20px" bg="#1d2129" w={'300px'}>
                    <Text style={{
                        fontSize: "36px",
                        fontWeight: 'lighter',
                        color: 'white'
                    }}>
                        {formatValueWithColor(coinDetails?.market_data.ath_change_percentage[globalCurrency])}
                    </Text>
                    <Flex gap={'lg'} justify={'space-between'} align={'flex-end'}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            ATH Change %
                        </Text>
                        <Text style={{
                            fontSize: "10px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            {formatTimestamp(coinDetails?.market_data?.last_updated)}
                        </Text>
                    </Flex>
                </Card>

                <Card radius="20px" padding="20px" bg="#1d2129" w={'300px'}>
                    <Text style={{
                        fontSize: "36px",
                        fontWeight: 'lighter',
                        color: 'white'
                    }}>
                        ${formatNumberWithCommas(coinDetails?.market_data.current_price[globalCurrency])}
                    </Text>
                    <Flex gap={'lg'} justify={'space-between'} align={'flex-end'}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            Current Price
                        </Text>
                        <Text style={{
                            fontSize: "10px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            {formatTimestamp(coinDetails?.market_data?.last_updated)}
                        </Text>
                    </Flex>
                </Card>
            </Flex>

            <Flex gap={4}>
                <Card radius="20px" padding="20px" bg="#1d2129" w={'300px'}>
                    <Text style={{
                        fontSize: "36px",
                        fontWeight: 'lighter',
                        color: 'white'
                    }}>
                        {formatNumberWithCommas(coinDetails?.market_data.total_volume[globalCurrency])}
                    </Text>
                    <Flex gap={'lg'} justify={'space-between'} align={'flex-end'}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            Total Volume
                        </Text>
                        <Text style={{
                            fontSize: "10px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            {formatTimestamp(coinDetails?.market_data?.last_updated)}
                        </Text>
                    </Flex>
                </Card>

                <Card radius="20px" padding="20px" bg="#1d2129" w={'300px'}>
                    <Text style={{
                        fontSize: "36px",
                        fontWeight: 'lighter',
                        color: 'white'
                    }}>
                        {formatValueWithColor(coinDetails?.market_data.price_change_percentage_24h)}
                    </Text>
                    <Flex gap={'lg'} justify={'space-between'} align={'flex-end'}>
                        <Text style={{
                            fontSize: "12px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            Price Change (24h)
                        </Text>
                        <Text style={{
                            fontSize: "10px",
                            fontWeight: 'lighter',
                            color: 'white'
                        }}>
                            {formatTimestamp(coinDetails?.market_data?.last_updated)}
                        </Text>
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    );
}

export default Analysis;
