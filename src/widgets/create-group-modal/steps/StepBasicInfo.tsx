import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { TextField } from "@mui/material";
import styled from "styled-components";

import { ImageUploader } from "@shared/ui/ImageUploader/ImageUploader";

import type { CreateGroupFormData } from "../types";

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const CoverCenter = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1)} 0;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.75)};
`;

const FieldLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

interface StepBasicInfoProps {
  control: Control<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
}

export const StepBasicInfo = ({ control, errors }: StepBasicInfoProps) => (
  <StepContent>
    <CoverCenter>
      <Controller
        name="coverImage"
        control={control}
        render={({ field }) => (
          <div>
            <ImageUploader
              value={field.value ?? null}
              onChange={field.onChange}
            />
            {errors.coverImage && (
              <ErrorText>{errors.coverImage.message as string}</ErrorText>
            )}
          </div>
        )}
      />
    </CoverCenter>

    <FieldGroup>
      <FieldLabel htmlFor="group-name">Название группы</FieldLabel>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="group-name"
            placeholder="Придумайте название..."
            fullWidth
            size="small"
            error={!!errors.name}
            helperText={errors.name?.message}
            autoComplete="off"
          />
        )}
      />
    </FieldGroup>
  </StepContent>
);
