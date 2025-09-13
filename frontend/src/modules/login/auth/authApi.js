import { baseApi } from '../../../shared/api.js';

export const authApi = baseApi.injectEndpoints({
  reducerPath: 'authApi',

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
