import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL, API_ENDPOINTS } from '../../../constants/api.js'
import { TAG_TYPES } from '../../../constants/tags.js'

export const channelApi = createApi({
  reducerPath: 'channelApi',
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
  tagTypes: [TAG_TYPES.CHANNEL, TAG_TYPES.MESSAGE],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => API_ENDPOINTS.CHANNELS,
      providesTags: [TAG_TYPES.CHANNEL],
    }),

    addChannel: builder.mutation({
      query: (channel) => ({
        url: API_ENDPOINTS.CHANNELS,
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: [TAG_TYPES.CHANNEL],
    }),

    editChannel: builder.mutation({
      query: ({ id, ...channel }) => ({
        url: `${API_ENDPOINTS.CHANNELS}/${id}`,
        method: 'PATCH',
        body: channel,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: TAG_TYPES.CHANNEL, id },
        { type: TAG_TYPES.CHANNEL, id: 'LIST' },
        { type: TAG_TYPES.MESSAGE },
      ],
    }),

    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.CHANNELS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: TAG_TYPES.CHANNEL, id },
        { type: TAG_TYPES.CHANNEL, id: 'LIST' },
        { type: TAG_TYPES.MESSAGE },
      ],
    }),
  }),
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelApi
