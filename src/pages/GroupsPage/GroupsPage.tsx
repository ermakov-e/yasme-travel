import styled from 'styled-components';
import { Typography, useMediaQuery } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

import { GroupsList } from '@widgets/groups-list';
import type { Group } from '@entities';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const Header = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const PageTitle = styled(Typography).attrs({ variant: 'h4' })`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const FabContainer = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  bottom: ${({ $isMobile, theme }) => $isMobile ? `calc(56px + ${theme.spacing(2)})` : theme.spacing(3)};
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

// Mock data
const mockGroups: Group[] = [
  {
    id: '1',
    name: 'Summer Trip 2024',
    description: 'Our summer vacation to the mountains',
    coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=200&fit=crop',
    createdAt: '2024-06-01',
    createdBy: 'user1',
    members: [
      { id: '1', avatar: 'https://i.pravatar.cc/100?img=1' },
      { id: '2', avatar: 'https://i.pravatar.cc/100?img=2' },
      { id: '3', avatar: 'https://i.pravatar.cc/100?img=3' },
      { id: '4', avatar: 'https://i.pravatar.cc/100?img=4' },
      { id: '5', avatar: 'https://i.pravatar.cc/100?img=5' },
    ],
  },
  {
    id: '2',
    name: 'Weekend Getaways',
    description: 'Short trips around the city',
    coverImage: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=200&fit=crop',
    createdAt: '2024-05-15',
    createdBy: 'user2',
    members: [
      { id: '6', avatar: 'https://i.pravatar.cc/100?img=6' },
      { id: '7', avatar: 'https://i.pravatar.cc/100?img=7' },
      { id: '8', avatar: 'https://i.pravatar.cc/100?img=8' },
    ],
  },
  {
    id: '3',
    name: 'Europe Adventure',
    description: 'Backpacking through Europe',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=200&fit=crop',
    createdAt: '2024-04-20',
    createdBy: 'user1',
    members: [
      { id: '9', avatar: 'https://i.pravatar.cc/100?img=9' },
      { id: '10', avatar: 'https://i.pravatar.cc/100?img=10' },
      { id: '11', avatar: 'https://i.pravatar.cc/100?img=11' },
      { id: '12', avatar: 'https://i.pravatar.cc/100?img=12' },
      { id: '13', avatar: 'https://i.pravatar.cc/100?img=13' },
      { id: '14', avatar: 'https://i.pravatar.cc/100?img=14' },
      { id: '15', avatar: 'https://i.pravatar.cc/100?img=15' },
      { id: '16', avatar: 'https://i.pravatar.cc/100?img=16' },
    ],
  },
];

export const GroupsPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:960px)');

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
      </Header>
      <GroupsList groups={mockGroups} onGroupClick={handleGroupClick} />
      <FabContainer $isMobile={isMobile}>
        <StyledFab
          aria-label="create group"
          onClick={handleCreateGroup}
        >
          <AddIcon />
        </StyledFab>
      </FabContainer>
    </PageContainer>
  );
};
