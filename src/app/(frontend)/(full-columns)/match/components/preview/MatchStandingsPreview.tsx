import MainLoading from '@/app/shared/MainLoading';
import NoDataFound from '@/app/shared/NoDataFound';

import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import { INestedObject } from '@/types';
import TeamStandingsPreview from './TeamStandingsPreview';

export default function MatchStandingsPreview({ matchData }: INestedObject) {
  const { isLoading: leagueStandingsLoading, data: leagueStandingsData } =
    useGetLeagueStandingQuery(matchData?.season_id);

  if (leagueStandingsLoading) {
    <MainLoading />;
  }

  return (
    <div>
      <div className=" mt-5 ">
        <div className="flex h-10 items-center justify-between">
          <h4 className="mt-2 px-5 font-semibold uppercase text-white">
            Standings
          </h4>
        </div>
      </div>
      {!leagueStandingsData?.status ? (
        <NoDataFound />
      ) : (
        <TeamStandingsPreview
          matchData={matchData}
          leagueStandingsData={leagueStandingsData}
          leagueStandingsLoading={leagueStandingsLoading}
        />
      )}
    </div>
  );
}
