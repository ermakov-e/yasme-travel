import styled from "styled-components";
import { Typography, useMediaQuery } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

import { GroupsList } from "@widgets/groups-list";
import { useAppDispatch } from "@app/hooks";
import { openModal } from "@features/ui/modalSlice";
import { useGetGroupsQuery } from "@features/groups";
import { Loading } from "@shared/ui";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const PageTitle = styled(Typography).attrs({ variant: "h4" })`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FabContainer = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  bottom: ${({ $isMobile, theme }) =>
    $isMobile ? `calc(56px + ${theme.spacing(2)})` : theme.spacing(3)};
  right: ${({ theme }) => theme.spacing(2)};
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

const StyledFab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  & svg {
    font-size: 24px;
  }
`;

export const GroupsPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:960px)");
  const dispatch = useAppDispatch();

  const { data: groups = [], isLoading, isError } = useGetGroupsQuery();

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  const handleCreateGroup = () => {
    dispatch(openModal({ name: "create-group" }));
  };

  return (
    <PageContainer>
      <Header>
        <PageTitle>My Groups</PageTitle>
      </Header>
      {isLoading && <Loading message="Загрузка групп..." />}
      {isError && (
        <Typography color="error">Не удалось загрузить группы</Typography>
      )}
      {!isLoading && !isError && (
        <GroupsList groups={groups} onGroupClick={handleGroupClick} />
      )}
      <FabContainer $isMobile={isMobile}>
        <StyledFab aria-label="create group" onClick={handleCreateGroup}>
          <AddIcon />
        </StyledFab>
      </FabContainer>
    </PageContainer>
  );
};
