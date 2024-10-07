import { ActionIcon, Box, Flex, Skeleton } from '@mantine/core'
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { DashboardHeaderElements } from './DashboardHeader'
import Link from 'next/link';
import { fetchCoinDetails, fetchCompairatorCoinDetails } from '@/Redux/thunks/CryptoThunks';
import { AppDispatch, RootState } from '@/Redux/store';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { navs } from './options';
import LineCharts from '../charts/LineCharts';
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-react';
import CandlestickChart from '../charts/CandelCharts';
import { SearchableDropdown } from '../searchInput/SearchableDropdown';
import { setCompareCoin } from '@/Redux/slice/CryptoCoinsSlice';
import { fetchCompairatorMarketChartGraphData, fetchCompairatorOHLCGraphData } from '@/Redux/thunks/GraphThunks';

function CompairatorElement({ children }: { children: React.ReactNode }) {

    const [activeLink, setActiveLink] = useState<string>('');
    const [isFullScreen, setIsFullScreen] = useState(false);
    const dispatch: AppDispatch = useDispatch();

    const { comparisionSelection, compairedCoinDetail, error } = useSelector((state: RootState) => state.coins)
    const { comparisionMarketChatData, comparisionOhlcData, comparisionMarketGraphType, loading, compare } = useSelector((state: RootState) => state.graph);

    console.log("comparision", comparisionSelection, comparisionMarketChatData, comparisionMarketChatData)

    const { globalCurrency, currencySymbol } = useSelector((state: RootState) => state.currency);

    const [selectedGraph, setSelectedGraph] = useState("line");
    const [selectedDate, setSelectedDate] = useState("1 Year");

    useEffect(() => {
        // Fetch the compairator coin details only when comparisionSelection is available
        if (comparisionSelection && !compairedCoinDetail) {  // Add a condition to avoid redundant API calls
            dispatch(fetchCompairatorCoinDetails(comparisionSelection));
            const data = {
                coinId: comparisionSelection,
                currency: globalCurrency,
                days: "365"
            }
            dispatch(fetchCompairatorOHLCGraphData(data));
            dispatch(fetchCompairatorMarketChartGraphData(data));
        }
    }, [comparisionSelection, dispatch]); // Watch comparisionSelection, not compairedCoinDetail

    const handleLinkClick = useCallback((link: string) => {
        setActiveLink(link);
    }, []);

    const toggleFullScreen = useCallback(() => {
        const chartContainer = document.getElementById('chart-container');
        if (!chartContainer) return;

        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            chartContainer.requestFullscreen();
        }
        setIsFullScreen((prev) => !prev);
    }, [isFullScreen]);

    return (
        <div>
            {comparisionSelection ? (
                <Flex direction={'column'} w={'100%'} style={{ padding: '20px 80px', paddingTop: '60px', gap: '20px' }}>
                    <Box style={{ width: '100%' }}>
                        <DashboardHeaderElements
                            coinID={comparisionSelection}
                            setGraphSelection={setSelectedGraph}
                            selectedGraph={selectedGraph}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            loading={loading}
                            coinDetails={compairedCoinDetail}
                            globalCurrency={globalCurrency}
                            currencySymbol={currencySymbol}
                            hideCompare={true}
                        />
                        {loading ? (
                            <Skeleton height={300} width="100%" radius="md" mt={10} />
                        ) : (
                            <Box id="chart-container" style={{ position: 'relative' }}>
                                {comparisionMarketGraphType === 'line' && comparisionMarketChatData ? (
                                    <>
                                        <LineCharts marketChartData={comparisionMarketChatData} />
                                        <ActionIcon
                                            radius={'md'}
                                            variant="default"
                                            size="md"
                                            style={{ position: 'absolute', top: 50, right: 10, padding: 4 }}
                                            onClick={toggleFullScreen}
                                        >
                                            {isFullScreen ? <IconArrowsMinimize stroke={0.5} /> : <IconArrowsMaximize stroke={0.5} />}
                                        </ActionIcon>
                                    </>
                                ) : selectedGraph === 'bar' && comparisionOhlcData ? (
                                    <>
                                        <CandlestickChart ohlcData={comparisionOhlcData} />
                                        <ActionIcon
                                            radius={'md'}
                                            variant="default"
                                            size="sm"
                                            style={{ position: 'absolute', top: 50, right: 10, padding: 2 }}
                                            onClick={toggleFullScreen}
                                        >
                                            {isFullScreen ? <IconArrowsMinimize stroke={0.5} /> : <IconArrowsMaximize stroke={0.5} />}
                                        </ActionIcon>
                                    </>
                                ) : null}
                            </Box>
                        )}
                    </Box>
                </Flex>
            ) : (
                <Box w={"400px"} >
                    <SearchableDropdown SelectionHandler={(value) => dispatch(setCompareCoin(value))} />
                </Box>
            )}
        </div>
    )
}

export default CompairatorElement;
