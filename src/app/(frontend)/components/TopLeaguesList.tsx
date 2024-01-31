'use client';

import { useGetTopLeaguesQuery } from '@/features/front-end/league/leagueApi';
import { ILeague } from '@/types';
import LeagueItem from './LeagueItem';

export default function TopLeaguesList() {
  const {
    data: popularLeagues,
    isLoading,
    isError,
  } = useGetTopLeaguesQuery(undefined);

  const arr = [1, 2, 3, 4, 5, 6, 7];

  if (isLoading) {
    return (
      <div className="mb-2 space-y-4">
        {arr.map((shimmer) => (
          <div className="grid grid-cols-12" key={shimmer}>
            <div className="col-span-2 h-7 w-7 animate-pulse rounded-full bg-neutral"></div>
            <div className="col-span-10 h-7 w-full animate-pulse rounded-md bg-neutral"></div>
          </div>
        ))}
      </div>
    );
  }
  if (!popularLeagues?.data?.length) {
    return (
      <div className="border-t border-gray-300 pb-2">
        <div className="p-3 text-xs font-light uppercase text-white ">
          No data available right now... Please try again later!
        </div>
      </div>
    );
  }

  if (popularLeagues.status) {
    return (
      <div className="p-2">
        {popularLeagues?.data.map((league: ILeague) => (
          <LeagueItem key={league?.id} league={league} />
        ))}
      </div>
    );
  }
}
