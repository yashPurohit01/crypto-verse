import { MantineProvider, createTheme } from '@mantine/core';

// Define custom colors and theme overrides
export const theme = createTheme({
  colors: {
    dark: [
      '#FFD699',
      '#acaebf',
      '#FFD699',
      '#666980',
      '#4d4f66',
      '#34354a',
      '#01010a',
      '#01010a',
      '#01010a',
      '#01010a',
    ],
    primary: [
      '#FFF7E0', // lightest
      '#FFEAC2',
      '#FFDDA4',
      '#FFD086',
      '#FEC167', // base
      '#E6AE5B',
      '#CC9A4F',
      '#B38644',
      '#997339',
      '#7F602E', // darkest
    ],
    secondary: [
      '#FFFDF7', // lightest
      '#FFF9EF',
      '#FFF5E7',
      '#FFF2DF',
      '#FFEACC', // base
      '#E6D4B7',
      '#CCBFA3',
      '#B3A98E',
      '#99847A',
      '#7F6F66', // darkest
    ],
  },
  primaryColor: 'primary', // Set primaryColor as 'primary'
});


