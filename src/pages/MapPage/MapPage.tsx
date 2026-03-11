import styled from "styled-components";
import { Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";

import { Map } from "@widgets/Map";
import { LocationModal } from "@widgets/LocationModal";
import { useAppDispatch } from "@app/hooks";
import { openModal } from "@features/ui";

const PageContainer = styled.div`
  padding: 24px;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const HeaderContent = styled.div``;

const MapContainer = styled.div`
  flex: 1;
  min-height: 0;
`;

export const MapPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const handleAddLocation = () => {
    dispatch(openModal({ name: "create-group" }));
  };

  return (
    <PageContainer>
      <Header>
        <HeaderContent>
          <Typography variant="h5">Group Map</Typography>
          <Typography variant="body2" color="text.secondary">
            Group ID: {id}
          </Typography>
        </HeaderContent>
        <Button variant="contained" onClick={handleAddLocation}>
          Add Location
        </Button>
      </Header>
      <MapContainer>
        <Map />
      </MapContainer>
      <LocationModal />
    </PageContainer>
  );
};
