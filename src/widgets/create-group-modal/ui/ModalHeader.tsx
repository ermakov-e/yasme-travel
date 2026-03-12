import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import styled from "styled-components";

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

const TitleText = styled.h2`
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  flex: 1;
`;

const StepDots = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const StepDot = styled.div<{ $active: boolean; $done: boolean }>`
  width: ${({ $active }) => ($active ? "20px" : "8px")};
  height: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background-color: ${({ theme, $active, $done }) =>
    $active || $done ? theme.colors.primary : theme.colors.border.main};
  transition: all ${({ theme }) => theme.transitions.normal};
`;

interface ModalHeaderProps {
  title: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
}

export const ModalHeader = ({ title, step, totalSteps, onBack }: ModalHeaderProps) => (
  <TitleRow>
    {step > 1 && onBack && (
      <BackButton type="button" onClick={onBack} aria-label="Назад">
        <ArrowBackIcon fontSize="small" />
      </BackButton>
    )}
    <TitleText>{title}</TitleText>
    <StepDots>
      {Array.from({ length: totalSteps }, (_, i) => (
        <StepDot key={i} $active={i + 1 === step} $done={i + 1 < step} />
      ))}
    </StepDots>
  </TitleRow>
);
