"use client"
import { useEffect, useState } from 'react';
import { Card, Text, Box, Image, Button, Skeleton } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { fetchNews } from '@/Redux/slice/cryptoNewsSlice';

export interface NewsItem {
  title: string;
  description: string;
  url: string;
  image_url: string; // Adjust this based on the actual response structure
  published_at: string;
  thumb_2x:string
}

function News() {
   const {news , loading} = useSelector((state:RootState) => state?.news)
   const dispatch:AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchNews())
  }, []);

  return (
    <Box style={{ padding: '4rem', width: '100%' }}>
      <Text size="xl" fw={500} style={{ marginBottom: '20px' }}>
        Latest News
      </Text>
      {loading ? (
        <Skeleton height={200}  />
      ) : (
        news?.map((item, index) => (
          <Card key={index} shadow="sm" p="lg" style={{ marginBottom: '20px' }}>
            <Box style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <Image src={item.thumb_2x} alt={item.title} width={150} height={100} radius="sm" />
              <Box>
                <Text fw={300} size="lg">
                  {item.title}
                </Text>
                <Text size="sm" c="#ffffff40" style={{ marginBottom: '10px' }}>
                  {new Date(item.published_at).toLocaleDateString()}
                </Text>
                <Text size="sm" c="#ffffff60" style={{ marginBottom: '10px' }}>
                  {item.description}
                </Text>
                <Button
                  component="a"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="blue"
                  variant="light"
                >
                  Read more
                </Button>
              </Box>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
}

export default News;
