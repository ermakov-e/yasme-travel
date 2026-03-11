import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import styled from "styled-components";

import { AutocompleteAddress } from "@shared/ui/AutocompleteAddress/AutocompleteAddress";
import { LocationPicker } from "@shared/ui/LocationPicker";
import type { AddressSuggestion } from "@features/autocomplete-address";

import type { CreateGroupFormData } from "../types";

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
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

interface StepLocationProps {
  control: Control<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
}

export const StepLocation = ({ control, errors }: StepLocationProps) => (
  <StepContent>
    <Hint>
      Укажите место, где будет собираться группа — введите адрес или нажмите на карту.
    </Hint>

    <FieldGroup>
      <FieldLabel>Адрес</FieldLabel>
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <>
            <AutocompleteAddress
              value={
                field.value?.address
                  ? ({
                      value: field.value.address,
                      label: field.value.address,
                      lat: field.value.lat,
                      lng: field.value.lng,
                    } as AddressSuggestion)
                  : null
              }
              onChange={(suggestion) => {
                field.onChange(
                  suggestion
                    ? {
                        lat: suggestion.lat,
                        lng: suggestion.lng,
                        address: suggestion.label,
                      }
                    : undefined,
                );
              }}
            />

            <LocationPicker
              value={field.value}
              onChange={(loc) => field.onChange(loc)}
            />
          </>
        )}
      />
      {errors.location && (
        <ErrorText>{errors.location.message as string}</ErrorText>
      )}
    </FieldGroup>
  </StepContent>
);
