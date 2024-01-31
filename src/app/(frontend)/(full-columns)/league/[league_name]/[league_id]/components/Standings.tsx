import NoDataFound from '@/app/shared/NoDataFound';
import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import StandingsShimmer from './StandingsShimmer';
import { Detail, GroupedStandings, LeagueStanding, ResultObject, TransformedStandingDetails, TransformedStandingsArray } from '@/types';

function transformDetailsToObj(details: Detail[]): ResultObject {
  const result: ResultObject = {};

  details?.forEach((detail) => {
    const { type_id, value } = detail;
    result[type_id] = value;
  });

  return result;
}

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

  if (leagueStandingsData?.status) {
    const isGrouped = leagueStandingsData?.data[0]?.group ? true : false;
    let groupByGroupName : Array<GroupedStandings> = [];
    let transformedStandings : Array<{
      position: number;
      teamName: string;
      teamImage: string;
      teamId: string;
      GP: any;
      W: any;
      D: any;
      L: any;
      GF: any;
      GA: any;
      GD: any;
      PTS: any;
    }> = [];
    let transformedStandings2 : TransformedStandingsArray = [];

    if (isGrouped) {
      leagueStandingsData?.data.forEach((standings :LeagueStanding) => {
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
          teamImage: leagueStanding.participant?.image_path || "",
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
