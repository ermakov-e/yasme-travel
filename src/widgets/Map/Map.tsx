import styled from 'styled-components';
import { Typography } from '@mui/material';

const MapPlaceholder = styled.div`
  height: 100%;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grey[100]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Content = styled.div`
  text-align: center;
`;

export const Map = () => {
  return (
    <MapPlaceholder>
      <Content>
        <Typography variant="h5" color="text.secondary">
          Map will be here
        </Typography>
      </Content>
    </MapPlaceholder>
  );
};
