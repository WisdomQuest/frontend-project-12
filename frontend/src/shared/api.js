import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = '/api/v1/';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  prepareHeaders: (headers, { getState}) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = getState().auth.token;
    // const token = localStorage.getItem('token');
   console.log('PrepareHeaders вызван! Токен:', token);

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
  tagTypes: ['Channel', 'Message'],
  endpoints: () => ({}),
});
