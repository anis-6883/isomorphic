import NoDataFound from "@/app/shared/NoDataFound";
import StandingTeamItem from "@/app/shared/StandingTeamItem";
import { INestedObject, ISingleStanding, LeagueStanding } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface TeamStandingsPreviewProps {
  matchData: INestedObject;
  leagueStandingsData: INestedObject;
  leagueStandingsLoading: boolean;
}



export default function TeamStandingsPreview({
  matchData,
  leagueStandingsData,
  leagueStandingsLoading,
}: TeamStandingsPreviewProps) {
  const getTeamIdByLocation = (location: string): string | null => {
    const participants = matchData.participants || [];
    const team = participants.find(
      (team: { meta: { location?: string; id?: string } } | undefined) =>
        team?.meta.location === location
    );
    return team ? team?.meta.id || null : null;
  };

  if (!leagueStandingsData.status) {
    return <NoDataFound />;
  }

  const participantOne = getTeamIdByLocation('home') || '';
  const participantTwo = getTeamIdByLocation('away') || '';

  function transformDetailsToObj(
    details: INestedObject[]
  ): Record<string, string> {
    const result: Record<string, string> = {};

    details.forEach((detail) => {
      const { type_id, value } = detail;
      result[type_id] = value;
    });

    return result;
  }

  let transformedStandings: ISingleStanding[] = leagueStandingsData.data?.map(
    (singleStandings: LeagueStanding) => {
      const transformedData = transformDetailsToObj(
        singleStandings.details || []
      );
  
      return {
        teamId: String(singleStandings.participant?.id) || null,
        position:singleStandings.position || '',
        teamName: singleStandings.participant?.name || '',
        teamImage: singleStandings.participant?.image_path || "/images/team_placeholder.png",
        GP: Number(transformedData['129']) || 0,
        W: Number(transformedData['130']) || 0,
        D: Number(transformedData['131']) || 0,
        L: Number(transformedData['132']) || 0,
        GF: Number(transformedData['133']) || 0,
        GA: Number(transformedData['134']) || 0,
        GD: Number(transformedData['179']) || 0,
        PTS:Number(transformedData['187'] )|| 0,
      };
    }
  );

  // Filter for participantOne and participantTwo
  transformedStandings = transformedStandings?.filter(
    (standing) =>
      standing.teamId === participantOne || standing.teamId === participantTwo
  );

  return (
    <div className="mt-5 text-white">
      <Link
        href={`/league/details/${matchData?.league?.id}`}
        className="my-5 ml-10 flex w-fit items-center gap-4"
      >
        <Image
          src={matchData?.league?.image_path}
          width={0}
          height={0}
          alt="League logo"
          className="h-10 w-10 rounded-full p-0.5 ring-1 ring-black"
          sizes="100vw"
        />
        <div>
          <h4 className="text-lg font-semibold">
            {matchData?.league?.name || ''}
          </h4>
          <h4 className="text-sm">{matchData?.league?.country?.name || ''}</h4>
        </div>
      </Link>

      <>
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
          {transformedStandings?.length > 0 ? (
            transformedStandings?.map((singleStandings ,index) => (
              <StandingTeamItem
                key={singleStandings.position || ''}
                singleStandings={singleStandings}
                index={index}
              />
            ))
          ) : (
            <div>No Data Found 1</div>
          )}
        </div>
      </>
    </div>
  );
}
