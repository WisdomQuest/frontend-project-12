import { configureStore } from '@reduxjs/toolkit';
import authReduser from './modules/login/auth/authSlice';
import channelReduser from './modules/chat/channels/channelsSlice'
import { authApi } from './modules/login/auth/authApi';
import { regApi } from './modules/registration/regApi';
import { channelApi } from './modules/chat/channels/channelsApi';
import { messagesApi } from './modules/chat/messages/messagesApi';

export const store = configureStore({
  reducer: {
    auth: authReduser,
    channels: channelReduser,
    [channelApi.reducerPath]: channelApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [regApi.reducerPath]: regApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, regApi.middleware, channelApi.middleware, messagesApi.middleware),
});
