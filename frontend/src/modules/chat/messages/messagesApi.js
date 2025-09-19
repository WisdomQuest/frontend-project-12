import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = '/api/v1/';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Channel','Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '/messages',
      providesTags: ['Message', 'Channel'],
    }),

    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),

    // editMessage: builder.mutation({
    //   query: ({ id, ...message }) => ({
    //     url: `/messages/${id}`,
    //     method: 'PATCH',
    //     body: message,
    //   }),
    //   invalidatesTags: ['Message'],
    // }),

    // removeMessage: builder.mutation({
    //   query: (id) => ({
    //     url: `/messages/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['Message'],
    // }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
