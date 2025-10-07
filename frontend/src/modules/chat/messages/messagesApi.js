import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ENDPOINTS } from '../../../constants/api.js'
import { TAG_TYPES } from '../../../constants/tags.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
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
  tagTypes: [TAG_TYPES.MESSAGE, TAG_TYPES.CHANNEL],
  endpoints: builder => ({
    getMessages: builder.query({
      query: () => API_ENDPOINTS.MESSAGES,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: TAG_TYPES.MESSAGE, id })),
              { type: TAG_TYPES.MESSAGE, id: 'LIST' },
              { type: TAG_TYPES.CHANNEL, id: 'LIST' },
            ]
          : [
              { type: TAG_TYPES.MESSAGE, id: 'LIST' },
              { type: TAG_TYPES.CHANNEL, id: 'LIST' },
            ],
    }),

    addMessage: builder.mutation({
      query: message => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: [{ type: TAG_TYPES.MESSAGE, id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi
