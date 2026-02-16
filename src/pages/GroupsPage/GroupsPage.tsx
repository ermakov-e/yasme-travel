import styled from 'styled-components';
import { Typography, Button, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import type { Group } from '@entities';

const PageContainer = styled.div`
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PageTitle = styled(Typography).attrs({ variant: 'h4' })``;

const GroupsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
`;

const StyledList = styled(List)`
  padding: 0;
`;

const StyledListItemButton = styled(ListItemButton)`
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }
`;

// Mock data
const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Summer Trip 2024',
    description: 'Our summer vacation to the mountains',
    createdAt: '2024-06-01',
    createdBy: 'user1',
    membersCount: 5,
  },
  {
    id: '2',
    name: 'Weekend Getaways',
    description: 'Short trips around the city',
    createdAt: '2024-05-15',
    createdBy: 'user2',
    membersCount: 3,
  },
  {
    id: '3',
    name: 'Europe Adventure',
    description: 'Backpacking through Europe',
    createdAt: '2024-04-20',
    createdBy: 'user1',
    membersCount: 8,
  },
];

export const GroupsPage = () => {
  const navigate = useNavigate();

  const handleGroupClick = (groupId: string) => {
    navigate(`/groups/${groupId}`);
  };

  const handleCreateGroup = () => {
    console.warn('Create group clicked');
  };

  return (
    <PageContainer>
      <Header>
        <PageTitle>My Groups</PageTitle>
        <Button variant="contained" onClick={handleCreateGroup}>
          Create Group
        </Button>
      </Header>
      <GroupsCard>
        <StyledList disablePadding>
          {mockGroups.map((group) => (
            <ListItem key={group.id} disablePadding>
              <StyledListItemButton onClick={() => handleGroupClick(group.id)}>
                <ListItemText
                  primary={group.name}
                  secondary={`${group.description} · ${group.membersCount} members`}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </StyledList>
      </GroupsCard>
    </PageContainer>
  );
};
