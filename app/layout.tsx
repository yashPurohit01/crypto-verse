import '@mantine/core/styles.css';
import React, { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import StoreProvider from './StoreProvider';
import './global.css';
import { Poppins } from 'next/font/google';
import MainLayout from '@/components/MainLayout';

// Specify the weights, subsets, and styles you want to use
const poppins = Poppins({
  weight: ['200', '500', '700'], // Add font weights you need
  subsets: ['latin'],  // Specify the character set
  style: ['normal', 'italic'],  // Use normal and italic styles
  display: 'swap',  // Use 'swap' for better loading performance
});

// Define metadata for the page
export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

// Define props for RootLayout
interface MyComponentProps {
  children: ReactNode; // Use ReactNode for children
}

// Fix the component definition
export default function RootLayout({ children }: MyComponentProps) {
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
            <MainLayout>
              {children} {/* Render children here */}
            </MainLayout>
          </StoreProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
