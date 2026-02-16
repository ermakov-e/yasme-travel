import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from '@features/auth';
import { uiReducer } from '@features/ui';
import { api } from '@shared/api/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
