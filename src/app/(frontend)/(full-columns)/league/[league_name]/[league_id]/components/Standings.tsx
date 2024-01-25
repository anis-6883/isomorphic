import NoDataFound from '@/app/shared/NoDataFound';
import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import StandingsShimmer from './StandingsShimmer';

export default function Standings({ seasonId }: { seasonId: number | null }) {
  const {
    isLoading: leagueStandingsLoading,
    data: leagueStandingsData,
    isFetching,
  } = useGetLeagueStandingQuery(seasonId, { skip: !seasonId });

  if (leagueStandingsLoading || isFetching) {
    return <StandingsShimmer size={17} />;
  }

  if (!leagueStandingsData?.status) {
    return <NoDataFound />;
  }

  function transformDetailsToObj(details) {
    const result = {};

    details.forEach((detail) => {
      const { type_id, value } = detail;
      result[type_id] = value;
    });

    return result;
  }

  if (leagueStandingsData?.status) {
    const isGrouped = leagueStandingsData?.data[0]?.group ? true : false;
    let groupByGroupName = [];
    let transformedStandings = [];
    let transformedStandings2 = [];

    if (isGrouped) {
      leagueStandingsData?.data.forEach((standings) => {
        const groupIndex = groupByGroupName.findIndex(
          (group) => group.name === standings.group?.name
        );

        if (groupIndex !== -1) {
          groupByGroupName[groupIndex].standings.push(standings);
        } else {
          groupByGroupName.push({
            name: standings.group?.name,
            standings: [standings],
          });
        }
      });

      transformedStandings2 = groupByGroupName.map((singleGroup) => {
        const groupStandings = singleGroup.standings.map((standing) => {
          const transformedData = transformDetailsToObj(standing?.details);
          return {
            position: standing?.position,
            teamName: standing?.participant?.name,
            teamImage: standing?.participant?.image_path,
            teamId: standing?.participant?.id,
            GP: transformedData['129'],
            W: transformedData['130'],
            D: transformedData['131'],
            L: transformedData['132'],
            GF: transformedData['133'],
            GA: transformedData['134'],
            GD: transformedData['179'],
            PTS: transformedData['187'],
          };
        });

        return {
          id: singleGroup.id,
          groupName: singleGroup.name,
          standings: groupStandings,
        };
      });

      transformedStandings2.sort((a, b) => {
        const partA = a.groupName?.split(' ')[1];
        const partB = b.groupName?.split(' ')[1];

        return partA > partB ? 1 : -1;
      });
    } else {
      transformedStandings = leagueStandingsData?.data.map(
        (singleStandings) => {
          const transformedData = transformDetailsToObj(
            singleStandings?.details
          );

          return {
            position: singleStandings?.position,
            teamName: singleStandings?.participant?.name,
            teamImage: singleStandings?.participant?.image_path,
            teamId: singleStandings?.participant?.id,
            GP: transformedData['129'],
            W: transformedData['130'],
            D: transformedData['131'],
            L: transformedData['132'],
            GF: transformedData['133'],
            GA: transformedData['134'],
            GD: transformedData['179'],
            PTS: transformedData['187'],
          };
        }
      );
    }

    return (
      <>
        {isGrouped ? (
          transformedStandings2.map((group) => (
            <div key={group?.id} className="mb-6 mt-4 w-full font-semibold ">
              <h2 className="p-2 text-white">{group.groupName}</h2>
              <div className="w-full uppercase text-gray-400">
                <div className="grid h-8 w-full grid-cols-12 items-center text-lg font-light">
                  <div className="text-center">#</div>
                  <div className="col-span-3">Team</div>
                  <div className="text-center">GP</div>
                  <div className="text-center">W</div>
                  <div className="text-center">D</div>
                  <div className="text-center">L</div>
                  <div className="text-center">GF</div>
                  <div className="text-center">GA</div>
                  <div className="text-center">GD</div>
                  <div className="text-center">PTS</div>
                </div>
              </div>
              <div>
                {group.standings?.length > 0 ? (
                  group.standings.map((singleStandings, index) => (
                    <StandingTeamItem
                      key={singleStandings.position}
                      singleStandings={singleStandings}
                      index={index + 1}
                    />
                  ))
                ) : (
                  <NoDataFound />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="mt-4">
            <div className="w-full select-none uppercase text-gray-400">
              <div className="grid h-8 w-full grid-cols-12 items-center text-lg font-light">
                <div className="text-center">#</div>
                <div className="col-span-3">Team</div>
                <div className="text-center">GP</div>
                <div className="text-center">W</div>
                <div className="text-center">D</div>
                <div className="text-center">L</div>
                <div className="text-center">GF</div>
                <div className="text-center">GA</div>
                <div className="text-center">GD</div>
                <div className="text-center">PTS</div>
              </div>
            </div>
            <div>
              {leagueStandingsData?.data?.length > 0 ? (
                transformedStandings.map((singleStandings, index) => (
                  <StandingTeamItem
                    key={singleStandings.position}
                    singleStandings={singleStandings}
                    index={index + 1}
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
