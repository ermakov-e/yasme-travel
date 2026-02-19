import styled, { css } from 'styled-components';

type CardVariant = 'elevated' | 'outlined' | 'filled' | 'glass';

export interface CardProps {
  variant?: CardVariant;
  padding?: number | string;
  maxWidth?: string;
  children: React.ReactNode;
  className?: string;
}

const variantStyles = {
  elevated: css`
    background-color: ${({ theme }) => theme.colors.background.paper};
    box-shadow: ${({ theme }) => theme.shadows.card};
    border: none;

    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.cardHover};
    }
  `,
  outlined: css`
    background-color: ${({ theme }) => theme.colors.background.paper};
    border: 1px solid ${({ theme }) => theme.colors.border.light};
    box-shadow: none;

    &:hover {
      border-color: ${({ theme }) => theme.colors.border.main};
    }
  `,
  filled: css`
    background-color: ${({ theme }) => theme.colors.background.subtle};
    border: none;
    box-shadow: none;
  `,
  glass: css`
    background-color: ${({ theme }) => theme.colors.background.paper}CC;
    backdrop-filter: blur(12px);
    border: 1px solid ${({ theme }) => theme.colors.border.light};
    box-shadow: ${({ theme }) => theme.shadows.card};
  `,
};

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme, padding }) => 
    typeof padding === 'number' ? theme.spacing(padding) : padding || theme.spacing(4)};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
  width: 100%;
  transition: ${({ theme }) => theme.transitions.normal};
  ${({ variant = 'elevated' }) => variantStyles[variant]}
`;
