// components/EChartComponent.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartComponentProps {
  option: echarts.EChartsOption;
}

const EChartComponent: React.FC<EChartComponentProps> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // Resize the chart on window resize
  const handleResize = () => {
    if (chartInstance.current) {
      chartInstance.current.resize();
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current);
      chartInstance.current.setOption(option);

      // Listen for window resize to make the chart responsive
      window.addEventListener('resize', handleResize);

      // Dispose chart and remove event listener on component unmount
      return () => {
        chartInstance.current?.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [option]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%', // Make it responsive to width
        height: '60vh', // Set height as a percentage of the viewport height
        minHeight: '400px', // Ensure a minimum height
      }}
    />
  );
};

export default EChartComponent;
