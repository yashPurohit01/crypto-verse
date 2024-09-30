import Link from 'next/link';
import { Box, Text } from '@mantine/core';
import Image from 'next/image';

function Logo() {
  return (
    <Link href="/" legacyBehavior>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          alignItems: 'flex-end',
          padding: '20px',
          cursor: 'pointer',
          userSelect:'none' // Ensure the pointer shows
        }}
      >
        <Image alt='' src={'/cryptocurrency.png'} width={32} height={32} />
        <Text style={{ color: 'var(--mantine-color-primary)' }}>
          CRYPTO
        </Text>
        <Text
          style={{
            fontSize: '10px',
            color: 'white',
            marginLeft: '-10px',
          }}
        >
          verse
        </Text>
      </Box>
    </Link>
  );
}

export default Logo;
