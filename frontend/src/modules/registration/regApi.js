import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ENDPOINTS } from '../../constants/api.js'

export const regApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  reducerPath: 'regApi',
  endpoints: builder => ({
    register: builder.mutation({
      query: ({ username, password }) => ({
        method: 'post',
        url: API_ENDPOINTS.SIGNUP,
        body: { username, password },
      }),
    }),
  }),
})

export const { useRegisterMutation } = regApi
