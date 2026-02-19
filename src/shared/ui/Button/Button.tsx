import { forwardRef } from "react";
import styled, { css } from "styled-components";
import { Button as MuiButton } from "@mui/material";
import type { ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps extends Omit<
  MuiButtonProps,
  "variant" | "size" | "color"
> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeStyles = {
  small: css`
    padding: ${({ theme }) => theme.spacing(0.75)}
      ${({ theme }) => theme.spacing(2)};
    font-size: 0.875rem;
  `,
  medium: css`
    padding: ${({ theme }) => theme.spacing(1.25)}
      ${({ theme }) => theme.spacing(3)};
    font-size: 1rem;
  `,
  large: css`
    padding: ${({ theme }) => theme.spacing(1.75)}
      ${({ theme }) => theme.spacing(4)};
    font-size: 1.125rem;
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary} !important;
    color: #ffffff !important;
    border: none;
    box-shadow: ${({ theme }) => theme.shadows.button};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark} !important;
      box-shadow: ${({ theme }) => theme.shadows.md};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.secondary} !important;
      box-shadow: ${({ theme }) => theme.shadows.sm};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.grey[300]} !important;
      color: ${({ theme }) => theme.colors.grey[500]} !important;
      box-shadow: none;
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary} !important;
    color: #ffffff !important;
    border: none;
    box-shadow: ${({ theme }) => theme.shadows.button};

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryDark} !important;
      box-shadow: ${({ theme }) => theme.shadows.md};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.primaryDark} !important;
      box-shadow: ${({ theme }) => theme.shadows.sm};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.grey[300]} !important;
      color: ${({ theme }) => theme.colors.grey[500]} !important;
      box-shadow: none;
    }
  `,
  outline: css`
    background-color: transparent !important;
    color: ${({ theme }) => theme.colors.primary} !important;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    box-shadow: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryBg} !important;
      border-color: ${({ theme }) => theme.colors.primaryDark};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.overlay.medium} !important;
    }

    &:disabled {
      color: ${({ theme }) => theme.colors.grey[400]} !important;
      border-color: ${({ theme }) => theme.colors.grey[300]};
      background-color: transparent !important;
    }
  `,
  ghost: css`
    background-color: transparent !important;
    color: ${({ theme }) => theme.colors.text.secondary} !important;
    border: none;
    box-shadow: none;

    &:hover {
      background-color: ${({ theme }) => theme.colors.grey[100]} !important;
      color: ${({ theme }) => theme.colors.text.primary} !important;
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.grey[200]} !important;
    }

    &:disabled {
      color: ${({ theme }) => theme.colors.grey[400]} !important;
      background-color: transparent !important;
    }
  `,
};

const StyledButton = styled(MuiButton)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  text-transform: none;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "medium",
      fullWidth = false,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        {...props}
      >
        {children}
      </StyledButton>
    );
  },
);

Button.displayName = "Button";
