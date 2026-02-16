import styled from 'styled-components';
import { CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  readonly message?: string;
  readonly fullHeight?: boolean;
}

const LoadingContainer = styled.div<{ $fullHeight: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px 0;
  ${({ $fullHeight }) => $fullHeight && 'min-height: 100vh;'}
`;

export const Loading = ({ message = 'Loading...', fullHeight = false }: LoadingProps) => {
  return (
    <LoadingContainer $fullHeight={fullHeight}>
      <CircularProgress />
      <Typography color="text.secondary">{message}</Typography>
    </LoadingContainer>
  );
};
