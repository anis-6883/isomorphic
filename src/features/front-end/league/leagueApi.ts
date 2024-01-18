import { apiSlice } from '../../api/apiSlice';

export const leagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopLeagues: builder.query({
      query: () => '/api/league/top-leagues',
    }),
    getSelectedPointTable: builder.query({
      query: () => '/api/league/selected-point-table',
    }),
  }),
});

export const { useGetTopLeaguesQuery, useGetSelectedPointTableQuery } = leagueApi;
