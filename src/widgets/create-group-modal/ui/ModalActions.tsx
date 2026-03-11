import styled from "styled-components";
import { Button } from "@shared/ui/Button/Button";

const ActionsRow = styled.div`
  display: flex;
  flex-direction: column;
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
}

export const ModalActions = ({
  isLastStep,
  isSubmitting,
  onNext,
  onClose,
}: ModalActionsProps) => (
  <ActionsRow>
    {isLastStep ? (
      <Button
        type="submit"
        form="create-group-form"
        variant="primary"
        fullWidth
        disabled={isSubmitting}
      >
        Создать группу
      </Button>
    ) : (
      <Button type="button" variant="primary" fullWidth onClick={onNext}>
        Далее
      </Button>
    )}
    <Button type="button" variant="ghost" fullWidth onClick={onClose}>
      Отмена
    </Button>
  </ActionsRow>
);
