import { baseApi } from '../../../shared/api.js';

export const channelApi = baseApi.injectEndpoints({
  reducerPath: 'channelApi',
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannel: builder.query({
      query: () => '/channels',
      providesTags: ['Channel'],
    }),

    addChannel: builder.mutation({
      query: (channel) => ({
        url: '/channels',
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),

    editChannel: builder.mutation({
      query: ({ id, ...channel }) => ({
        url: `/channels/${id}`,
        method: 'PATCH',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),

    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelApi;
