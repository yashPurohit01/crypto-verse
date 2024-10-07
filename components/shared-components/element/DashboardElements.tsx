"use client";
import { Box, Flex, Skeleton, ActionIcon } from '@mantine/core';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import LineCharts from '../charts/LineCharts';
import CandlestickChart from '../charts/CandelCharts';
import { fetchCoinDetails } from '@/Redux/thunks/CryptoThunks';
import { useParams } from 'next/navigation';
import { DashboardHeaderElements } from './DashboardHeader';
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-react';
import { navs } from './options';
import CompairatorElement from './CompairatorElement';

function DashboardElements({ children }: { children: React.ReactNode }) {

  const [activeLink, setActiveLink] = useState<string>('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const params = useParams<{ coinID: string }>();
  const dispatch:AppDispatch = useDispatch();
  const { coinID } = params;

  const { marketChartData, ohlcData,  compare} = useSelector((state: RootState) => state.graph);

  useEffect(() => {
    if (coinID) {
      dispatch(fetchCoinDetails(coinID));
    }
  }, [coinID, dispatch]);

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

  const navLinks = useMemo(() => {
    return navs.map((page, i) => (
      <Link
        key={i}
        href={`/${coinID}/${page.href}`}
        onClick={() => handleLinkClick(page.title)}
        style={{
          color: activeLink === page.title ? '#FEC167' : 'rgba(255, 255, 255, 0.7)',
          fontSize: '24px',
          textDecoration: 'none',
          fontWeight: activeLink === page.title ? 'normal' : 'lighter',
        }}
      >
        {page.title}
      </Link>
    ));
  }, [activeLink, coinID, handleLinkClick]);

  const { coinDetails, loading } = useSelector((state: RootState) => state.coins);
  const { globalCurrency, currencySymbol } = useSelector((state: RootState) => state.currency);

  const [selectedGraph, setSelectedGraph] = useState("line");
  const [selectedDate, setSelectedDate] = useState("1 Year");

  return (
    <Flex>
    
    <Flex direction={'column'} w={'100%'} style={{ padding: '20px 80px', paddingTop: '60px', gap: '20px' }}>
      
      <Box style={{ width: '100%' }}>
        <DashboardHeaderElements 
        coinID={coinID}
        setGraphSelection={setSelectedGraph}
        selectedGraph={selectedGraph}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        loading={loading}
        coinDetails={coinDetails}
        globalCurrency={globalCurrency}
        currencySymbol={currencySymbol}
     />
        
        {loading ? (
          <Skeleton height={300} width="100%" radius="md" mt={10} />
        ) : (
          <Box id="chart-container" style={{ position: 'relative' }}>
            {selectedGraph === 'line' && marketChartData ? (
              <>
                <LineCharts marketChartData={marketChartData} />
                <ActionIcon
                  radius={'md'}
                  variant="default"
                  size="md"
                  style={{ position: 'absolute', top: 50, right: 10  , padding:4}}
                  onClick={toggleFullScreen}
                >
                  {isFullScreen ? <IconArrowsMinimize stroke={0.5}  /> : <IconArrowsMaximize stroke={0.5} />}
                </ActionIcon>
              </>
            ) : selectedGraph === 'bar' && ohlcData ? (
              <>
                <CandlestickChart ohlcData={ohlcData} />
                <ActionIcon
                  radius={'md'}
                  variant="default"
                  size="sm"
                  style={{ position: 'absolute', top: 50, right: 10, padding:2 }}
                  onClick={toggleFullScreen}
                >
                  {isFullScreen ? <IconArrowsMinimize  stroke={0.5}  /> : <IconArrowsMaximize   stroke={0.5} />}
                </ActionIcon>
              </>
            ) : null}
           
          </Box>
        )}
      </Box>
      
      

      {!loading ? (
        <Box style={{ width: '100%' }}>
          <Flex gap={20} direction={'column'}>
            <Flex gap={10}>{navLinks}</Flex>
            {children}
          </Flex>
        </Box>
      ) : (
        <Skeleton height={400} width="100%" radius="md" mt={20} />
      )}
    </Flex>
    {
       compare &&
       <CompairatorElement children={children}/>
      
      
    }
     
    </Flex>
  );
}

export default DashboardElements;
