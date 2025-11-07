import { createApi } from '@reduxjs/toolkit/query/react'
import { API_ENDPOINTS } from '../../../constants/api.js'
import { baseQueryWithReauth } from '../../../common/baseQuery.js'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
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
