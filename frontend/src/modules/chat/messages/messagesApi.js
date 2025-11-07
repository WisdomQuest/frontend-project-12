import { createApi } from '@reduxjs/toolkit/query/react'
import { API_ENDPOINTS } from '../../../constants/api.js'
import { TAG_TYPES } from '../../../constants/tags.js'
import { baseQueryWithReauth } from '../../../common/baseQuery.js'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithReauth,
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
        url: API_ENDPOINTS.MESSAGES,
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
