import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@features/auth";
import { modalReducer } from "@features/ui";
import { api } from "@shared/api/apiSlice";
import { autocompleteApi } from "@features/autocomplete-address";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    [api.reducerPath]: api.reducer,
    [autocompleteApi.reducerPath]: autocompleteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, autocompleteApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
