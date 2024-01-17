'use client';

import { useGetTopLeaguesQuery } from '@/features/front-end/league/leagueApi';

export default function TopLeaguesList() {
  const {
    data: topLeagues,
    isLoading,
    isError,
  } = useGetTopLeaguesQuery(undefined);

  if (!isLoading && !isError) {
    console.log('topLeagues: ', topLeagues);
  }

  return <div>TopLeaguesList</div>;
}
