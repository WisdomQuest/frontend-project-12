import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = '/api/v1/';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },

  endpoints: (builder) => ({
    verifyToken: builder.mutation({
      query: ({ username, password }) => ({
        method: 'post',
        url: 'login',
        body: { username, password },
      }),
    }),
  }),
});

export const { useVerifyTokenMutation } = authApi;
