import styled from 'styled-components';
import { Avatar, AvatarGroup } from '@mui/material';

import type { Group } from '../types';

interface GroupCardProps {
  readonly group: Group;
  readonly onClick?: (groupId: string) => void;
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
`;

const GroupName = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing(1)} 0;
  line-height: 1.4;
`;

const MembersRow = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvatarGroup = styled(AvatarGroup)`
  & .MuiAvatar-root {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
    border: 2px solid ${({ theme }) => theme.colors.background.paper};
  }
`;

const MemberAvatar = styled(Avatar)`
  width: 28px;
  height: 28px;
`;

export const GroupCard = ({ group, onClick }: GroupCardProps) => {
  const handleClick = () => {
    onClick?.(group.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(group.id);
    }
  };

  return (
    <Card
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open group ${group.name}`}
    >
      <CoverImage src={group.coverImage} alt={group.name} />
      <Content>
        <GroupName>{group.name}</GroupName>
        <MembersRow>
          <StyledAvatarGroup max={4}>
            {group.members.map((member) => (
              <MemberAvatar
                key={member.id}
                src={member.avatar}
                alt="Member"
              />
            ))}
          </StyledAvatarGroup>
        </MembersRow>
      </Content>
    </Card>
  );
};
