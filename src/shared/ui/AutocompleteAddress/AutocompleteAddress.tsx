import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

import { useDebounce } from '@shared/hooks/useDebounce';
import type { AddressSuggestion } from '@features/autocomplete-address';
import { useSearchAddressQuery } from '@features/autocomplete-address';

import type { AutocompleteAddressProps } from './types';


export const AutocompleteAddress = ({
  value,
  onChange,
  placeholder = 'Введите адрес',
  disabled = false,
}: AutocompleteAddressProps) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const debounceValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setInputValue(value?.label ?? '');
  }, [value]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useSearchAddressQuery(debounceValue, {
    skip: debounceValue.length < 3 || disabled,
  });

  const suggestions = data?.response.GeoObjectCollection.featureMember.map(
    (member: { GeoObject: any }) => {
      const geoObject = member.GeoObject;
      const [lng, lat] = geoObject.Point.pos.split(' ');
      const formattedAddress = geoObject.metaDataProperty.GeocoderMetaData.Address.formatted;

      return {
        value: formattedAddress,
        label: formattedAddress,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    },
  ) || [];

  const handleInputChange = (_event: React.SyntheticEvent, newValue: string) => {
    setInputValue(newValue);
  };

  const handleSelect = (_event: React.SyntheticEvent, newValue: AddressSuggestion | null) => {
    onChange?.(newValue);
    setOpen(false);
  };

  const handleBlur = () => {
    setOpen(false);
  };

  const handleFocus = () => {
    if (inputValue.length >= 3 && !disabled) {
      setOpen(true);
    }
  };

  return (
    <Autocomplete
      open={open}
      onClose={handleBlur}
      onOpen={handleFocus}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      value={value}
      onChange={handleSelect}
      options={suggestions}
      loading={isLoading || isFetching}
      disabled={disabled}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.label === value?.label}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          disabled={disabled}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading || isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <div style={{ fontSize: '0.875rem', color: '#666' }}>{option.label}</div>
        </li>
      )}
      noOptionsText={
        isError
          ? 'Ошибка при поиске адреса'
          : inputValue.length < 3
            ? 'Введите минимум 3 символа'
            : 'Ничего не найдено'
      }
      componentsProps={{
        popper: {
          style: { zIndex: 2000 },
          placement: 'bottom-start',
        },
      }}
      sx={{
        '& .MuiAutocomplete-listbox': {
          borderRadius: '8px',
          marginTop: '4px',
        },
      }}
    />
  );
};
