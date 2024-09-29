"use client";
import { Box, Flex, Skeleton, Button, ActionIcon } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import LineCharts from '../charts/LineCharts';
import CandlestickChart from '../charts/CandelCharts';
import { fetchCoinDetails } from '@/Redux/thunks/CryptoThunks';
import { useParams } from 'next/navigation';
import { DashboardHeaderElements } from './DashboardHeader';
import { IconArrowsMaximize, IconArrowsMinimize } from '@tabler/icons-react';
import { navs } from './options';

function DashboardElements({ children }: { children: React.ReactNode }) {
  const [chartData, setChartData] = useState<any>(null);
  const { marketChartData,ohlcData, loading } = useSelector((state: RootState) => state.graph);
  const [selectedGraph, setGraphSelection] = useState<string>('bar');
  const [activeLink, setActiveLink] = useState<string>('');
  const params = useParams<{ coinID: string }>();
  const dispatch: any = useDispatch();
  const { coinID } = params;
  const [isFullScreen, setIsFullScreen] = useState(false);
  

  useEffect(() => {
    if (coinID) {
      dispatch(fetchCoinDetails(coinID));
    }
  }, [coinID, dispatch]);

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const toggleFullScreen = () => {
    const chartContainer = document.getElementById('chart-container');
    if (!chartContainer) return;

    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      chartContainer.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Flex direction={'column'} w={'100%'} style={{ padding: '20px 80px', paddingTop: '60px', gap: '20px' }}>
      <Box style={{ width: '100%' }}>
        <DashboardHeaderElements setGraphSelection={setGraphSelection} selectedGraph={selectedGraph} />
        {loading ? (
          <Skeleton height={300} width="100%" radius="md" mt={10} />
        ) : marketChartData && selectedGraph === 'line' ? (
          <Box id="chart-container" style={{ position: 'relative' }}>
            <LineCharts  />
            <ActionIcon
              radius={'md'}
              variant="default"
              size="md"
              p={2}
              style={{ position: 'absolute', top: 20, right: 10, background: 'transparent' }}
              onClick={toggleFullScreen}
            >
              {isFullScreen ? <IconArrowsMinimize stroke={0.5} /> : <IconArrowsMaximize stroke={0.5} />}
            </ActionIcon>
          </Box>
        ) : ohlcData && selectedGraph === 'bar' ? (
          <Box id="chart-container" style={{ position: 'relative' }}>
            <CandlestickChart  />
            <ActionIcon
              radius={'md'}
              variant="default"
              size="md"
              style={{ position: 'absolute', top: 20, right: 10 }}
              onClick={toggleFullScreen}
            >
              {isFullScreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
            </ActionIcon>
          </Box>
        ) : (
          ''
        )}
      </Box>

      {!loading ? (
        <Box style={{ width: '100%' }}>
          <Flex gap={20} direction={'column'}>
            <Flex gap={10}>
              {navs?.map((page, i) => (
                <Link
                  key={i}
                  href={`/${coinID}/${page?.href}`}
                  onClick={() => handleLinkClick(page.title)}
                  style={{
                    color: activeLink === page.title ? '#FEC167' : 'rgba(255, 255, 255, 0.7)',
                    fontSize: '24px',
                    textDecoration: 'none',
                    fontWeight: activeLink === page.title ? 'normal' : 'lighter',
                  }}
                >
                  {page?.title}
                </Link>
              ))}
            </Flex>
            {children}
          </Flex>
        </Box>
      ) : (
        <Skeleton height={400} width="100%" radius="md" mt={20} />
      )}
    </Flex>
  );
}

export default DashboardElements;
