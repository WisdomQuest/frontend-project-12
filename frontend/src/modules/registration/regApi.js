import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const regApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
  }),
  reducerPath: 'regApi',
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ username, password }) => ({
        method: 'post',
        url: 'signup',
        body: { username, password },
      }),
    }),
  }),
});

export const { useRegisterMutation } = regApi;
