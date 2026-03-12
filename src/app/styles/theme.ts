import { createGlobalStyle } from 'styled-components';
import { createTheme } from '@mui/material/styles';

/**
 * Emerald & Teal Theme
 * Premium, modern style with emerald-to-teal color progression
 */

// Emerald & Teal Palette
const emerald = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  900: '#064E3B',
};

const teal = {
  50: '#F0FDFA',
  100: '#CCFBF1',
  200: '#99F6E4',
  300: '#5EEAD4',
  400: '#2DD4BF',
  500: '#14B8A6',
  600: '#0D9488',
  700: '#0F766E',
  800: '#115E59',
  900: '#134E4A',
};

// MUI Theme
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: emerald[500],
      light: emerald[400],
      dark: emerald[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: teal[500],
      light: teal[400],
      dark: teal[700],
      contrastText: '#ffffff',
    },
    background: {
      default: '#FAFFFE',
      paper: '#ffffff',
    },
    text: {
      primary: '#134E4A',
      secondary: '#0F766E',
      disabled: '#5EEAD4',
    },
    error: {
      main: '#F87171',
      light: '#FECACA',
      dark: '#DC2626',
    },
    success: {
      main: emerald[500],
      light: emerald[300],
      dark: emerald[700],
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '12px 24px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

// Styled-components Theme
export const styledTheme = {
  colors: {
    // Primary (Emerald)
    primary: emerald[500],
    primaryDark: emerald[700],
    primaryLight: emerald[300],
    primaryBg: emerald[50],
    
    // Secondary (Teal)
    secondary: teal[500],
    secondaryLight: teal[300],
    secondaryDark: teal[700],
    secondaryBg: teal[50],
    
    // Accent colors
    accent: teal[400],
    accentLight: teal[200],
    
    // Status colors
    error: '#F87171',
    errorLight: '#FEF2F2',
    errorDark: '#DC2626',
    warning: '#FBBF24',
    warningLight: '#FFFBEB',
    success: emerald[500],
    successLight: emerald[100],
    
    // Backgrounds
    background: {
      default: '#FAFFFE',
      paper: '#ffffff',
      subtle: emerald[50],
      // Mesh gradient
      gradient: `
        radial-gradient(at 40% 20%, ${emerald[200]}40 0px, transparent 50%),
        radial-gradient(at 80% 0%, ${teal[200]}30 0px, transparent 50%),
        radial-gradient(at 0% 50%, ${emerald[100]}30 0px, transparent 50%),
        radial-gradient(at 80% 100%, ${teal[100]}40 0px, transparent 50%),
        radial-gradient(at 20% 80%, ${emerald[200]}20 0px, transparent 50%),
        linear-gradient(180deg, #FAFFFE 0%, #F0FDF4 50%, #ECFDF5 100%)
      `,
    },
    
    // Text colors
    text: {
      primary: '#134E4A',
      secondary: '#0F766E',
      tertiary: '#14B8A6',
      disabled: '#5EEAD4',
      inverse: '#ffffff',
    },
    
    // Border colors
    border: {
      light: emerald[100],
      main: emerald[200],
      dark: emerald[300],
      focus: emerald[500],
    },
    
    // Grey scale
    grey: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
    },
    
    // Overlay colors
    overlay: {
      light: `${emerald[500]}08`,
      medium: `${emerald[500]}12`,
      dark: `${emerald[500]}20`,
    },
  },
  
  spacing: (factor: number) => `${8 * factor}px`,
  
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
    down: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => 
      `@media (max-width: ${breakpoint === 'xs' ? '599px' : breakpoint === 'sm' ? '959px' : breakpoint === 'md' ? '1279px' : breakpoint === 'lg' ? '1919px' : '1920px'})`,
    up: (breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => 
      `@media (min-width: ${breakpoint === 'xs' ? '0px' : breakpoint === 'sm' ? '600px' : breakpoint === 'md' ? '960px' : breakpoint === 'lg' ? '1280px' : '1920px'})`,
  },
  
  shadows: {
    none: 'none',
    sm: `0 2px 8px ${emerald[500]}12, 0 1px 2px rgba(0, 0, 0, 0.04)`,
    md: `0 4px 16px ${emerald[500]}16, 0 2px 4px rgba(0, 0, 0, 0.04)`,
    lg: `0 8px 32px ${emerald[500]}20, 0 4px 8px rgba(0, 0, 0, 0.04)`,
    xl: `0 16px 48px ${emerald[500]}24, 0 8px 16px rgba(0, 0, 0, 0.04)`,
    glow: `0 0 24px ${emerald[400]}40`,
    card: '0 2px 12px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
    cardHover: `0 8px 24px ${emerald[500]}18, 0 4px 8px rgba(0, 0, 0, 0.04)`,
    button: `0 4px 12px ${emerald[500]}24`,
  },
  
  borderRadius: {
    none: '0',
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
    bounce: '250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
  },
};

// Global Styles
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.background.default};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background.subtle};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.main};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.colors.border.dark};
    }
  }

  /* Focus Outline */
  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primaryBg};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

// Theme Type
export type StyledTheme = typeof styledTheme;
