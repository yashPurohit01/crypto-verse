"use client";

import { ActionIcon, Box, Flex, Group } from '@mantine/core';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconSettings } from '@tabler/icons-react';
import { SearchableDropdown } from '../searchInput/SearchableDropdown';
import Logo from '../logo';

// Define link styles in a centralized location
const linkStyles: React.CSSProperties = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '12px',
};

// Active link style
const activeLinkStyle: React.CSSProperties = {
  color: '#FEC167', // Change this to your desired active color
};

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/trending/nfts', label: 'Trending NFTs' },
  { href: '/news', label: 'News' },
  { href: '/about-us', label: 'About Us' },
];

function HeaderNavigation() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <Flex justify="space-between" align="center" w="100%" p="lg">
      <Logo />
      <Group gap={20}>
        {navigationLinks.map((link) => (
          <Link key={link.href} href={link.href} style={{
            ...linkStyles,
            ...(pathname === link.href ? activeLinkStyle : {}),
          }}>
            {link.label}
          </Link>
        ))}
      </Group>

      <Box w="300px">
        <SearchableDropdown />
      </Box>

      <Link href="/settings">
        <ActionIcon
          radius="lg"
          variant="default"
          size="xl"
          aria-label="Settings"
        >
          <IconSettings stroke={0.6} />
        </ActionIcon>
      </Link>
    </Flex>
  );
}

export default HeaderNavigation;
