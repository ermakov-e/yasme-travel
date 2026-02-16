import styled from 'styled-components';
import { Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorProps {
  readonly message?: string;
  readonly onRetry?: () => void;
  readonly fullHeight?: boolean;
}

const ErrorContainer = styled.div<{ $fullHeight: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 0;
  ${({ $fullHeight }) => $fullHeight && 'min-height: 100vh;'}
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  font-size: 64px;
  color: ${({ theme }) => theme.colors.error};
`;

export const Error = ({ 
  message = 'Something went wrong', 
  onRetry,
  fullHeight = false 
}: ErrorProps) => {
  return (
    <ErrorContainer $fullHeight={fullHeight}>
      <ErrorIcon />
      <Typography color="text.secondary" align="center">
        {message}
      </Typography>
      {onRetry && (
        <Button variant="outlined" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </ErrorContainer>
  );
};
