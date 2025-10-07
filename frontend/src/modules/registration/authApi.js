import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ENDPOINTS } from '../../constants/api.js'

export const authApi = createApi({
  reducerPath: 'authApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: (builder) => ({
    verifyToken: builder.mutation({
      query: ({ username, password }) => ({
        method: 'post',
        url: API_ENDPOINTS.LOGIN,
        body: { username, password },
      }),
    }),
  }),
})

export const { useVerifyTokenMutation } = authApi
