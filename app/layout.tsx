import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, Container, Flex, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import HeaderNavigation from '@/components/shared-components/HeaderNavigation/page';
import StoreProvider from './StoreProvider';
import './global.css';

import { Poppins } from 'next/font/google';
import DashboardElements from '@/components/shared-components/element/DashboardElements';
import Cryptos from '@/components/Cryptos/Cryptos';
import FloatingCryptos from '@/components/Cryptos/FloatingCryptos';


// Specify the weights, subsets, and styles you want to use
const poppins = Poppins({
  weight: ['200', '500', '700'], // Add font weights you need
  subsets: ['latin'],  // Specify the character set
  style: ['normal', 'italic'],  // Use normal and italic styles
  display: 'swap',  // Use 'swap' for better loading performance
});

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className={poppins.className}>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <StoreProvider>
          <Flex justify="center" p={'lg'} align='flex-start' direction="column" gap="xl">
            <HeaderNavigation />
            <FloatingCryptos/>
            {
              children
            }
            {/* <DashboardElements>
            {children}
            </DashboardElements> */}
            <Cryptos/>
           
           </Flex>
          </StoreProvider>
        </MantineProvider>

      </body>
    </html>
  );
}
