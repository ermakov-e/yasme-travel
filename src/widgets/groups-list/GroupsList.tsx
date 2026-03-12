import styled from 'styled-components';

import { GroupCard } from '@entities';
import type { Group } from '@entities';

interface GroupsListProps {
  readonly groups: Group[];
  readonly onGroupClick?: (groupId: string) => void;
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const GroupsList = ({ groups, onGroupClick }: GroupsListProps) => {
  return (
    <List>
      {groups.map((group) => (
        <GroupCard
          key={group.id}
          group={group}
          onClick={onGroupClick}
        />
      ))}
    </List>
  );
};
