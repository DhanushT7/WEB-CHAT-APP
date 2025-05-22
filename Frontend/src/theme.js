// theme.js
import { extendTheme } from '@chakra-ui/react';
import { theme as chakraTheme } from '@chakra-ui/react';

// Optionally override default theme config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

// Extend the default Chakra theme
const customTheme = extendTheme({
  ...chakraTheme,
  config,
});

export default customTheme;
