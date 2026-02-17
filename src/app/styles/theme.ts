import { createGlobalStyle } from 'styled-components';
import { createTheme } from '@mui/material/styles';

/**
 * Объединённая тема приложения
 * Используется для Material UI и styled-components
 */

// MUI тема
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Тема для styled-components (синхронизирована с MUI)
export const styledTheme = {
  colors: {
    primary: '#1976d2',
    primaryDark: '#1565c0',
    primaryLight: '#42a5f5',
    secondary: '#dc004e',
    error: '#d32f2f',
    warning: '#ed6c02',
    success: '#2e7d32',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    grey: {
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
    },
  },
  spacing: (factor: number) => `${8 * factor}px`,
  breakpoints: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
};

// Глобальные стили
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
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
  }
`;

// Тип темы для styled-components
export type StyledTheme = typeof styledTheme;
