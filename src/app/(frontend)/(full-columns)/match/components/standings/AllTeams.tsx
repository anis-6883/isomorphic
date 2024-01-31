import NoDataFound from '@/app/shared/NoDataFound';
import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import { Detail, GroupedStandings, IMatch, ISingleStanding, LeagueStanding, ResultObject, TransformedStandingDetails, TransformedStandingsArray } from '@/types';
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

  function transformDetailsToObj(details:Detail[]):ResultObject {
    const result:ResultObject = {};

    details.forEach((detail) => {
      const { type_id, value } = detail;
      result[type_id] = value;
    });
    return result;
  }

  const isGrouped = leagueStandingsData?.data[0]?.group ? true : false;
  let groupByGroupName :Array<GroupedStandings> = [];
  let transformedStandings:Array<ISingleStanding> = [];
  let transformedStandings2 :TransformedStandingsArray = [];

  if (isGrouped) {
    leagueStandingsData?.data?.forEach((standings:LeagueStanding) => {
      const groupIndex = groupByGroupName.findIndex(
        (group) => group.name === standings?.group?.name
      );

      const transformedData = transformDetailsToObj(standings.details || []);
      const transformedStanding: TransformedStandingDetails = {
      position: standings.position,
      teamName: standings.participant?.name || "",
      teamImage: standings.participant?.image_path || "/images/team_placeholder.png",
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
          name: standings?.group?.name || "",
          standings: [transformedStanding],
        });
      }
    });

    transformedStandings2 = groupByGroupName.map((singleGroup) => {
      const groupStandings: Array<TransformedStandingDetails> = singleGroup.standings.map((standing) => {
        const transformedData = transformDetailsToObj(standing.details || []);
    
        if ('participant' in standing) {
          // This is a LeagueStanding
          const leagueStanding = standing as LeagueStanding;
          return {
            position: leagueStanding.position || 0,
            teamName: leagueStanding.participant?.name || "",
            teamImage: leagueStanding.participant?.image_path || "/images/team_placeholder.png",
            teamId: leagueStanding.participant?.id || "",
            GP: transformedData['129'] || 0,
            W: transformedData['130'] || 0,
            D: transformedData['131'] || 0,
            L: transformedData['132'] || 0,
            GF: transformedData['133'] || 0,
            GA: transformedData['134'] || 0,
            GD: transformedData['179'] || 0,
            PTS: transformedData['187'] || 0,
          };
        } else {
          // This is a TransformedStandingDetails
          const transformedStanding = standing as TransformedStandingDetails;
          return {
            position: transformedStanding.position || 0,
            teamName: transformedStanding.teamName || "",
            teamImage: transformedStanding.teamImage || "",
            teamId: transformedStanding.teamId || "",
            GP: transformedStanding.GP || 0,
            W: transformedStanding.W || 0,
            D: transformedStanding.D || 0,
            L: transformedStanding.L || 0,
            GF: transformedStanding.GF || 0,
            GA: transformedStanding.GA || 0,
            GD: transformedStanding.GD || 0,
            PTS: transformedStanding.PTS || 0,
          };
        }
      });
    
      return {
        id: singleGroup.id || "",
        groupName: singleGroup.name || "",
        standings: groupStandings,
      };
    });
    
    transformedStandings2.sort((a, b) => {
      const partA = a.groupName?.split(' ')[1];
      const partB = b.groupName?.split(' ')[1];
    
      return partA && partB ? (partA > partB ? 1 : -1) : 0;
    });
    
      } else {
        transformedStandings = leagueStandingsData?.data.map(
          (singleStandings:LeagueStanding) => {
            const transformedData = transformDetailsToObj(
              singleStandings?.details || []
            );
  
            return {
              position: singleStandings?.position || 0,
              teamName: singleStandings?.participant?.name || "",
              teamImage: singleStandings?.participant?.image_path || "",
              teamId: singleStandings?.participant?.id || "",
              GP: transformedData['129'] || 0,
              W: transformedData['130'] || 0,
              D: transformedData['131'] || 0,
              L: transformedData['132'] || 0,
              GF: transformedData['133'] || 0,
              GA: transformedData['134'] || 0,
              GD: transformedData['179'] || 0,
              PTS: transformedData['187'] || 0,
            };
          }
        );
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
                  index={index}
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
