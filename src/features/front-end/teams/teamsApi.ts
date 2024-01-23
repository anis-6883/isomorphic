import { apiSlice } from '../../api/apiSlice';

export const leagueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamUpcomingData: builder.query({
      query: (id) =>
        `/v3/football/teams/${id}?include=upcoming.participants;upcoming.scores;upcoming.state;upcoming.league;`,
    }),

    getTeamInfo: builder.query({
      query: (id) =>
        `/v3/football/teams/${id}?include=latest.participants;latest.scores;latest.state;latest.league;`,
    }),

    getTeamDetails: builder.query({
      query: (id) =>
        `/v3/football/teams/${id}?include=activeSeasons.league;country;venue.city;coaches.coach;upcoming.participants;upcoming.scores;upcoming.state;upcoming.league;latest.participants;latest.scores;latest.state;latest.league`,
    }),

    getTeamTransfers: builder.query({
      query: (id) =>
        `/v3/football/transfers/teams/${id}?include=toTeam;fromTeam;player&filters=transferTypes:219;`,
    }),
    getTeamSquadData: builder.query({
      query: ({ seasonId, teamId }) =>
        `/v3/football/squads/seasons/${seasonId}/teams/${teamId}?include=player.position;player.country`,
    }),
  }),
});

export const {
  useGetTeamUpcomingDataQuery,
  useGetTeamInfoQuery,
  useGetTeamDetailsQuery,
  useGetTeamTransfersQuery,
  useGetTeamSquadDataQuery,
} = leagueApi;
