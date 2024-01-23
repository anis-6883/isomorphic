import NoDataFound from '@/app/shared/NoDataFound';
import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import StandingsShimmer from './StandingShimmer';

export default function AwayTeams({ matchData }) {
  const { isLoading: leagueStandingsLoading, data: leagueStandingsData } =
    useGetLeagueStandingQuery(matchData?.data.season_id);
  const awayData = matchData?.data.participants.filter(
    (data) => data?.meta?.location === 'away'
  );
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
      const groupStandings = singleGroup.standings.map((standing) => {
        const transformedData = transformDetailsToObj(standing?.details);

        return {
          teamId: standing?.participant?.id,
          position: standing?.position,
          teamName: standing?.participant?.name,
          teamImage: standing?.participant?.image_path,
          GP: transformedData['141'],
          W: transformedData['142'],
          D: transformedData['143'],
          L: transformedData['144'],
          GF: transformedData['145'],
          GA: transformedData['146'],
          GD: transformedData['179'],
          PTS: transformedData['186'],
        };
      });

      // Sort group standings by PTS
      groupStandings?.sort((a, b) => b.PTS - a.PTS);

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
        GP: transformedData['141'],
        W: transformedData['142'],
        D: transformedData['143'],
        L: transformedData['144'],
        GF: transformedData['145'],
        GA: transformedData['146'],
        GD: transformedData['179'],
        PTS: transformedData['186'],
      };
    });

    // Sort standings by PTS
    transformedStandings?.sort((a, b) => b.PTS - a.PTS);
  }

  return (
    <>
      {isGrouped ? (
        transformedStandings2.slice(0, 10).map((group) => (
          <div
            key={group?.id}
            className="mb-6 ml-4 rounded-2xl  border-[1px] border-primary py-3 font-semibold"
          >
            <h2 className="p-2 text-white">{group.groupName}</h2>
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
                  <div
                    key={index}
                    className={` ${
                      awayData[0]?.name === singleStandings?.teamName
                        ? 'text-blue-400'
                        : 'text-white'
                    }`}
                  >
                    <StandingTeamItem
                      key={singleStandings.position}
                      singleStandings={singleStandings}
                      index={index}
                    />
                  </div>
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className=" rounded-2xl border-[1px] border-primary py-3">
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
              transformedStandings
                .slice(0, 10)
                ?.map((singleStandings, index) => (
                  <div
                    key={index}
                    className={`  ${
                      awayData[0]?.name === singleStandings?.teamName
                        ? 'text-blue-400'
                        : 'text-white'
                    }`}
                  >
                    <StandingTeamItem
                      key={singleStandings.position}
                      singleStandings={singleStandings}
                      index={index}
                    />
                  </div>
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
