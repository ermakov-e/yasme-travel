export interface AddressSuggestion {
  value: string;
  label: string;
  lat: number;
  lng: number;
}

export interface AutocompleteAddressProps {
  value?: AddressSuggestion | null;
  onChange?: (value: AddressSuggestion | null) => void;
  placeholder?: string;
  disabled?: boolean;
}
