// pages/index.tsx
"use client";
import dynamic from 'next/dynamic';
import { EChartsOption } from 'echarts';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';

// Dynamically import EChartComponent to ensure it's only rendered on the client-side
const EChartComponent = dynamic(() => import('./EChartComponent'), {
  ssr: false, // Disable SSR for this component
});


export default function LineCharts() {
  // Define primary and secondary colors
  const {marketChartData} = useSelector((state:RootState) => state?.graph )
  const PRIMARY_COLOR = '#FEC167';
  const SECONDARY_COLOR = '#FFEACC';
 

  // Chart options using the passed data
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
          magicType:{type:['bar','line']},
          restore:{},
          saveAsImage:{},
        }
       },
    xAxis: {
      type: 'category',
      data:  marketChartData?.prices.map((item: [number, number]) => {
        const date = new Date(item[0]);
        return date.toLocaleDateString();
      }), // Use x-axis data from props
      axisLine: { show: false },
    },
    yAxis: {
      splitLine: { show: false },
      axisLine: { show: false },
    },
    series: [
      {
        type: 'line',
        data:marketChartData.prices.map((item: [number, number]) => item[1]), // Use series data from props
        itemStyle: {
          color: PRIMARY_COLOR, // Set primary color for the line
          borderColor: PRIMARY_COLOR, // Set border color
          borderWidth: 2, // Border width
        },
        lineStyle: {
          width: 2, // Line width
          type: 'solid', // Line type
        },
        areaStyle: {
          color: 'rgba(254, 193, 103, 0.2)', // Color for the area under the line
        },
      },
    ],
  };

  return (
    <EChartComponent option={option} />
  );
}
