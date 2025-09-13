import { configureStore } from '@reduxjs/toolkit';
import authReduser from './modules/login/auth/authSlice';
import { authApi } from './modules/login/auth/authApi';

export const store = configureStore({
  reducer: {
    auth: authReduser,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
