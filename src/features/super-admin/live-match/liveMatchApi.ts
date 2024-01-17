import { apiSlice } from '@/features/api/apiSlice';

export const liveMatchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLiveMatches: builder.query({
      query: () => 'api/admin/matches',
    }),
  }),
});

export const { useGetLiveMatchesQuery } = liveMatchApi;
