import NoDataFound from '@/app/shared/NoDataFound';
import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import { IMatch } from '@/types';
import StandingsShimmer from './StandingShimmer';

export default function AllTeams({ matchData }: { matchData: IMatch }) {
  const { isLoading: leagueStandingsLoading, data: leagueStandingsData } =
    useGetLeagueStandingQuery(matchData?.season_id);

  if (leagueStandingsLoading) {
    return <StandingsShimmer size={17} />;
  }

  if (!leagueStandingsData.status) {
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

  const isGrouped = leagueStandingsData?.data[0]?.group ? true : false;
  let groupByGroupName = [];
  let transformedStandings = [];
  let transformedStandings2 = [];

  if (isGrouped) {
    leagueStandingsData?.data?.forEach((standings) => {
      const groupIndex = groupByGroupName.findIndex(
        (group) => group.name === standings.group.name
      );

      if (groupIndex !== -1) {
        groupByGroupName[groupIndex].standings.push(standings);
      } else {
        groupByGroupName.push({
          name: standings.group.name,
          standings: [standings],
        });
      }
    });

    transformedStandings2 = groupByGroupName.map((singleGroup) => {
      const groupStandings = singleGroup.standings.map((singleStanding) => {
        const transformedData = transformDetailsToObj(singleStanding?.details);

        return {
          teamId: singleStanding?.participant?.id,
          position: singleStanding?.position,
          teamName: singleStanding?.participant?.name,
          teamImage: singleStanding?.participant?.image_path,
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
      const partA = a.groupName.split(' ')[1];
      const partB = b.groupName.split(' ')[1];

      return partA > partB ? 1 : -1;
    });
  } else {
    transformedStandings = leagueStandingsData?.data?.map((singleStandings) => {
      const transformedData = transformDetailsToObj(singleStandings?.details);
      return {
        teamId: singleStandings?.participant?.id,
        position: singleStandings?.position,
        teamName: singleStandings?.participant?.name,
        teamImage: singleStandings?.participant?.image_path,
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
  }

  return (
    <>
      {isGrouped ? (
        transformedStandings2.map((group) => (
          <div
            key={group?.id}
            className="mb-6 ml-4 skew-y-[1deg] font-semibold"
          >
            <h2>{group.groupName}</h2>
            <div className=" w-full uppercase text-gray-400">
              <div className="grid h-8 w-full grid-cols-12 items-center text-xs font-medium">
                <div className="text-center font-semibold">#</div>
                <div className="col-span-3">Team</div>
                <div className="text-center font-semibold">GP</div>
                <div className="text-center font-semibold">W</div>
                <div className="text-center font-semibold">D</div>
                <div className="text-center font-semibold">L</div>
                <div className="text-center font-semibold">GF</div>
                <div className="text-center font-semibold">GA</div>
                <div className="text-center font-semibold">GD</div>
                <div className="text-center font-semibold">PTS</div>
              </div>
            </div>
            <div>
              {group.standings?.length > 0 ? (
                group.standings.map((singleStandings, index) => (
                  <StandingTeamItem
                    index={index}
                    key={singleStandings.position}
                    singleStandings={singleStandings}
                  />
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="skew-y-[1deg]">
          <div className="w-full uppercase text-gray-400">
            <div className="grid h-8 w-full grid-cols-12 items-center text-xs font-medium">
              <div className="text-center font-semibold">#</div>
              <div className="col-span-3">Team</div>
              <div className="text-center font-semibold">GP</div>
              <div className="text-center font-semibold">W</div>
              <div className="text-center font-semibold">D</div>
              <div className="text-center font-semibold">L</div>
              <div className="text-center font-semibold">GF</div>
              <div className="text-center font-semibold">GA</div>
              <div className="text-center font-semibold">GD</div>
              <div className="text-center font-semibold">PTS</div>
            </div>
          </div>
          <div>
            {leagueStandingsData?.data?.length > 0 ? (
              transformedStandings.map((singleStandings, index) => (
                <StandingTeamItem
                  key={singleStandings.position}
                  singleStandings={singleStandings}
                />
              ))
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
