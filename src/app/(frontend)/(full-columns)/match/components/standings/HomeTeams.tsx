import NoDataFound from '@/app/shared/NoDataFound';
import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import StandingsShimmer from './StandingShimmer';
import { Detail, GroupedStandings, IMatchData, INestedObject, ISingleStanding, LeagueStanding, ResultObject, TransformedStandingDetails, TransformedStandingsArray } from '@/types';

export default function HomeTeams({ matchData }:{matchData:INestedObject}) {
  const { isLoading: leagueStandingsLoading, data: leagueStandingsData } =
    useGetLeagueStandingQuery(matchData?.data.season_id, {skip:!matchData?.data.season_id});
  const homeData = matchData?.data.participants.filter(
    (data :INestedObject) => data?.meta?.location === 'home'
  );

  if (leagueStandingsLoading) {
    return <StandingsShimmer size={17} />;
  }

  if (!leagueStandingsData.status) {
    return <NoDataFound />;
  }

  function transformDetailsToObj(details:Detail[]):ResultObject {
    const result:ResultObject = {};

    details.forEach((detail) => {
      const { type_id, value } = detail;
      result[type_id] = value;
    });

    return result;
  }

  const isGrouped = leagueStandingsData?.data[0]?.group ? true : false;
  let groupByGroupName : Array<GroupedStandings> = [];
  let transformedStandings :Array<ISingleStanding> = [];
  let transformedStandings2 :TransformedStandingsArray  = [];

  if (isGrouped) {
    leagueStandingsData?.data?.forEach((standings :LeagueStanding) => {
      const groupIndex = groupByGroupName.findIndex(
        (group) => group.name === standings?.group?.name
      );
      const transformedData = transformDetailsToObj(standings.details || []);
      const transformedStanding: TransformedStandingDetails = {
      position: standings.position,
      teamName: standings.participant?.name || "",
      teamImage: standings.participant?.image_path || "",
      teamId: standings.participant?.id || "",
      GP: transformedData['129'] || 0,
      W: transformedData['130'] || 0,
      D: transformedData['131'] || 0,
      L: transformedData['132'] || 0,
      GF: transformedData['133'] || 0,
      GA: transformedData['134'] || 0,
      GD: transformedData['179'] || 0,
      PTS: transformedData['187'] || 0,
    };

      if (groupIndex !== -1) {
        groupByGroupName[groupIndex].standings.push(transformedStanding);
      } else {
        groupByGroupName.push({
          name: standings?.group?.name || '',
          standings: [transformedStanding],
        });
      }
    });

    transformedStandings2 = groupByGroupName.map((singleGroup) => {
      const groupStandings : Array<TransformedStandingDetails> = singleGroup.standings.map((standing) => {
        const transformedData = transformDetailsToObj(standing?.details || []);
        const teamName = standing?.participant?.name || "Unknown";
        const teamImage = standing?.participant?.image_path || "/images/team_placeholder.png";
      
        return {
          position: standing?.position || 0,
          teamName: teamName,
          teamImage: teamImage,
          teamId: standing?.participant?.id || "",
          GP: transformedData['141'] || 0,
          W: transformedData['142'] || 0,
          D: transformedData['143'] || 0,
          L: transformedData['144'] || 0,
          GF: transformedData['145'] || 0,
          GA: transformedData['146'] || 0,
          GD: transformedData['179'] || 0,
          PTS: transformedData['186'] || 0,
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
    transformedStandings = leagueStandingsData?.data?.map((singleStandings:INestedObject ) => {
      const transformedData = transformDetailsToObj(singleStandings?.details || []);
      const teamName = singleStandings?.participant?.name || "Unknown";
        const teamImage = singleStandings?.participant?.image_path || "/images/team_placeholder.png";
      
        return {
          position: singleStandings?.position || 0,
          teamName: teamName,
          teamImage: teamImage,
          teamId: singleStandings?.participant?.id || "",
          GP: transformedData['141'] || 0,
          W: transformedData['142'] || 0,
          D: transformedData['143'] || 0,
          L: transformedData['144'] || 0,
          GF: transformedData['145'] || 0,
          GA: transformedData['146'] || 0,
          GD: transformedData['179'] || 0,
          PTS: transformedData['186'] || 0,
        };;
    });

    // Sort standings by PTS
    transformedStandings?.sort((a, b) => {
      // Check if both 'a' and 'b' are not undefined
      if (a && b) {
        // Check if PTS property is defined in both 'a' and 'b'
        if (a.PTS !== undefined && b.PTS !== undefined) {
          return b.PTS - a.PTS;
        }
      }
      return 0; // Return 0 if either 'a' or 'b' is undefined, or if PTS is undefined in either 'a' or 'b'
    });
  }

  return (
    <>
      {isGrouped ? (
        transformedStandings2.slice(0, 10).map((group) => (
          <div
            key={group?.id}
            className="mb-6 ml-4 rounded-2xl border-[1px] border-primary py-3 font-semibold "
          >
            <h2 className="p-2 text-white">{group.groupName}</h2>
            <div className="w-full uppercase text-gray-400">
              <div className="grid h-8 w-full grid-cols-12 items-center text-xs font-medium">
                <div className="text-center font-semibold">#</div>
                <div className="col-span-3 mx-auto">Team</div>
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
                    className={`${
                      homeData[0]?.name === singleStandings?.teamName
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
        <div className="rounded-2xl border-[1px] border-primary py-3 ">
          <div className="w-full uppercase text-gray-400">
            <div className="grid h-8 w-full grid-cols-12 items-center text-xs font-medium">
              <div className="text-center font-semibold">#</div>
              <div className="col-span-3 mx-auto">Team</div>
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
                .map((singleStandings, index) => (
                  <div
                    key={index}
                    className={`${
                      homeData[0]?.name === singleStandings?.teamName
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
