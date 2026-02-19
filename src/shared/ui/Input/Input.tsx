import { forwardRef } from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background-color: ${({ theme }) => theme.colors.background.paper};
    transition: ${({ theme }) => theme.transitions.normal};
    
    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.sm};
      
      .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.border.dark};
      }
    }

    &.Mui-focused {
      box-shadow: ${({ theme }) => theme.shadows.glow};
      background-color: ${({ theme }) => theme.colors.background.paper};
      
      .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.primary};
        border-width: 2px;
      }
    }

    &.Mui-error {
      .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.error};
      }
      
      &.Mui-focused {
        box-shadow: 0 0 16px ${({ theme }) => theme.colors.error}40;
      }
    }

    &.Mui-disabled {
      background-color: ${({ theme }) => theme.colors.grey[100]};
      
      .MuiOutlinedInput-notchedOutline {
        border-color: ${({ theme }) => theme.colors.border.light};
      }
    }
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.colors.border.light};
    transition: ${({ theme }) => theme.transitions.fast};
  }

  & .MuiInputLabel-root {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 500;
    
    &.Mui-focused {
      color: ${({ theme }) => theme.colors.primary};
    }
    
    &.Mui-error {
      color: ${({ theme }) => theme.colors.error};
    }
  }

  & .MuiFormHelperText-root {
    margin-top: ${({ theme }) => theme.spacing(0.5)};
    font-size: 0.8125rem;
    
    &.Mui-error {
      color: ${({ theme }) => theme.colors.error};
    }
  }

  & .MuiInputBase-input {
    padding: ${({ theme }) => theme.spacing(1.75)} ${({ theme }) => theme.spacing(2)};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text.primary};

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.disabled};
      opacity: 1;
    }
    
    &:disabled {
      color: ${({ theme }) => theme.colors.text.disabled};
      -webkit-text-fill-color: ${({ theme }) => theme.colors.text.disabled};
    }
  }
`;

export type InputProps = TextFieldProps;

export const Input = forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  return <StyledTextField ref={ref} {...props} />;
});

Input.displayName = 'Input';
