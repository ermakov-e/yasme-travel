import { Avatar, Typography } from "@mui/material";
import styled from "styled-components";

import type { GroupMember } from "@entities/group";
import { Loading } from "@shared/ui";

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing(0.75)};
`;

const FieldLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const SelectedCount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FriendsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const FriendItem = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  padding: ${({ theme }) => theme.spacing(0.75)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : "transparent"};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primaryBg : "transparent"};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryBg};
  }
`;

const SelectedBadge = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #fff;
  line-height: 1;
`;

interface StepMembersProps {
  friends: GroupMember[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  isLoading?: boolean;
}

export const StepMembers = ({ friends, selectedIds, onToggle, isLoading }: StepMembersProps) => (
  <StepContent>
    {isLoading && <Loading message="Загрузка друзей..." />}
    <LabelRow>
      <FieldLabel>Друзья</FieldLabel>
      {selectedIds.length > 0 && (
        <SelectedCount>· выбрано {selectedIds.length}</SelectedCount>
      )}
    </LabelRow>

    <FriendsGrid>
      {friends.map((friend) => {
        const isSelected = selectedIds.includes(friend.id);
        return (
          <FriendItem
            key={friend.id}
            type="button"
            $selected={isSelected}
            onClick={() => onToggle(friend.id)}
            aria-pressed={isSelected}
            aria-label={`Друг ${friend.id}`}
          >
            <Avatar src={friend.avatar} sx={{ width: 52, height: 52 }} />
            {isSelected && <SelectedBadge>✓</SelectedBadge>}
          </FriendItem>
        );
      })}
    </FriendsGrid>

    <Typography variant="caption" color="text.secondary">
      Вы можете пропустить этот шаг и добавить участников позже
    </Typography>
  </StepContent>
);
