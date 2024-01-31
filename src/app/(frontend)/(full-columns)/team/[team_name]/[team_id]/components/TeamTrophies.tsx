
import NoDataFound from '@/app/shared/NoDataFound';
import { useGetTeamTrophiesQuery } from '@/features/front-end/teams/teamsApi';

import Image from 'next/image';

const LOADING_TEXT = 'Loading...';

const formatSeasonName = (season:any) => `${season?.name},`;

const TeamTrophies = ({ teamId }:{teamId:any}) => {

  const { isLoading:teamTrophiesLoading, data:teamTrophiesData, refetch:teamTrophiesRefetch } =
  useGetTeamTrophiesQuery(teamId);

  const trophiesData = teamTrophiesData?.data;

  if (teamTrophiesLoading) {
    return <>{LOADING_TEXT}</>;
  }

  const extractWinnersAndRunnersUp = (data:any) => {
    const results = {};

    data.forEach((entry:any) => {
      const { league } = entry;
      const leagueId = league?.id;

      if (!results[leagueId]) {
        results[leagueId] = {
          leagueId,
          leagueName: league?.name,
          leagueImage: league?.image_path,
          winners: [],
          runnersUp: [],
        };
      }

      const { season, trophy } = entry;
      const position = trophy?.position;

      if (position === 1) {
        results[leagueId].winners.push({
          seasonName: formatSeasonName(season),
          seasonId: season?.id,
        });
      } else if (position === 2) {
        results[leagueId].runnersUp.push({
          seasonName: formatSeasonName(season),
          seasonId: season?.id,
        });
      }
    });

    return Object.values(results);
  };

  const leagueResults = extractWinnersAndRunnersUp(trophiesData?.trophies);

  return (
    <div>
      {leagueResults.length === 0 && <NoDataFound />}
      {leagueResults
        .filter((league) => league?.leagueId !== undefined)
        .map((league) => (
          <div key={league?.leagueId}>
            <div className="bg-base-100 p-4 px-6 skew-y-[0.5deg]">
              <div className="flex items-center gap-2">
                <Image
                  src={league?.leagueImage}
                  width={0}
                  height={0}
                  alt={league?.leagueName}
                  sizes="100vw"
                  className="w-10 h-10 ring-1 ring-black rounded-full"
                />
                <h4>{league?.leagueName}</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 skew-y-[0.5deg]">
              <div>
                <h4 className="font-semibold">
                  WINNER <span>({league?.winners?.length})</span>
                </h4>
                <div className="flex flex-wrap items-center gap-1">
                  {league?.winners?.map((win, index) => (
                    <p key={index}>{win?.seasonName}</p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold">
                  RUNNER UP <span>({league?.runnersUp?.length})</span>
                </h4>
                <div className="flex flex-wrap items-center gap-1">
                  {league?.runnersUp?.map((runner, index) => (
                    <p key={index}>{runner?.seasonName}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TeamTrophies;
