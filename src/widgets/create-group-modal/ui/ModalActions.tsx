import styled from "styled-components";

import { Button } from "@shared/ui/Button/Button";

const ActionsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(1)};

  ${({ theme }) => theme.breakpoints.up("sm")} {
    flex-direction: row-reverse;
  }
`;

interface ModalActionsProps {
  isLastStep: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const ModalActions = ({
  isLastStep,
  isSubmitting,
  onNext,
  onClose,
  onSubmit,
}: ModalActionsProps) => (
  <ActionsRow>
    <Button
      type="button"
      variant="ghost"
      fullWidth
      size="small"
      onClick={onClose}
    >
      Отмена
    </Button>
    {isLastStep ? (
      <Button
        type="button"
        variant="primary"
        size="small"
        fullWidth
        disabled={isSubmitting}
        onClick={onSubmit}
      >
        Создать группу
      </Button>
    ) : (
      <Button type="button" variant="primary" fullWidth onClick={onNext}>
        Далее
      </Button>
    )}
  </ActionsRow>
);
