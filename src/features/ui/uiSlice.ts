import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  isLocationModalOpen: boolean;
  selectedLocationId: string | null;
  isCreateGroupModalOpen: boolean;
}

const initialState: UiState = {
  isLocationModalOpen: false,
  selectedLocationId: null,
  isCreateGroupModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openLocationModal: (state, action: PayloadAction<string | null>) => {
      state.isLocationModalOpen = true;
      state.selectedLocationId = action.payload;
    },
    closeLocationModal: (state) => {
      state.isLocationModalOpen = false;
      state.selectedLocationId = null;
    },
    openCreateGroupModal: (state) => {
      state.isCreateGroupModalOpen = true;
    },
    closeCreateGroupModal: (state) => {
      state.isCreateGroupModalOpen = false;
    },
  },
});

export const {
  openLocationModal,
  closeLocationModal,
  openCreateGroupModal,
  closeCreateGroupModal,
} = uiSlice.actions;

export default uiSlice.reducer;