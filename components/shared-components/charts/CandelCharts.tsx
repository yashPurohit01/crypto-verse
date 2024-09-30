// components/CandlestickChart.tsx
"use client";

import React from 'react';
import { EChartsOption } from 'echarts';
import EChartComponent from './EChartComponent';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

interface CandlestickChartProps {

}


const CandlestickChart: React.FC<CandlestickChartProps> = () => {
  const {ohlcData} = useSelector((state:RootState) => state?.graph )
  
  let xAxisData: string[] = [];
      let seriesData: number[][] = [];

      console.log("Candel" , ohlcData)

      ohlcData?.forEach((item: [number, number, number, number, number]) => {
        const [timestamp, open, high, low, close] = item;
        const date = new Date(timestamp).toISOString().split('T')[0];
        xAxisData.push(date);
        seriesData.push([open, close, low, high]);
      });


  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis', // 'axis' is important for candlestick charts
      axisPointer: {
        type: 'cross' // This improves readability by showing crosshairs
      },
    },
    toolbox:{
     show:true,
     feature:{
       dataZoom:{
          yAxisIndex:'none',
          
       },
       restore:{

       },
       saveAsImage:{}
     }
    },
    xAxis: {
      data: xAxisData, // Use x-axis data from props
      axisLine: { show: true }
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: { show: true }
    },
    series: [
      {
        type: 'candlestick',
        data:seriesData, // Use series data from props
        itemStyle: {
          color: '#FFD699', // Primary color for bullish candles
          color0: '#FFF5E6', // Secondary color for bearish candles
          borderColor: '#FFD699', // Border color for bullish candles
          borderColor0: '#FFF5E6', // Border color for bearish candles
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowOffsetY: 5,
        },
        barWidth: '60%',
      }
    ]
  };
  
  return (
  
      <EChartComponent option={option} />

  );
};

export default CandlestickChart;
