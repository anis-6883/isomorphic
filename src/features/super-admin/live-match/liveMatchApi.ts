import { apiSlice } from '@/features/api/apiSlice';

export const liveMatchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLiveMatches: builder.query({
      query: () => '/api/admin/matches',
    }),
    deleteLiveMatch: builder.mutation({
      query: (id) => ({
        url: `/api/admin/matches/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetLiveMatchesQuery, useDeleteLiveMatchMutation } =
  liveMatchApi;
