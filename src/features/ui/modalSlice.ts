import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type ModalName = 'create-group';

export interface ModalState {
  activeModal: ModalName | null;
  modalPayload: Record<string, unknown> | null;
}

const initialState: ModalState = {
  activeModal: null,
  modalPayload: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ name: ModalName; payload?: Record<string, unknown> }>) => {
      state.activeModal = action.payload.name;
      state.modalPayload = action.payload.payload ?? null;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalPayload = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
