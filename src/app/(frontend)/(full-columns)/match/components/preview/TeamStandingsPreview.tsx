import NoDataFound from '@/app/shared/NoDataFound';
import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { IMatchData, INestedObject } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface TeamStandingsPreviewProps {
  matchData: IMatchData;
  leagueStandingsData: INestedObject;
  leagueStandingsLoading: boolean;
}

export default function TeamStandingsPreview({
  matchData,
  leagueStandingsData,
  leagueStandingsLoading,
}: TeamStandingsPreviewProps): JSX.Element {
  const getTeamIdByLocation = (location: string): string | null => {
    const team = matchData?.participants.find(
      (team: { meta: { location: string } } | undefined) =>
        team?.meta.location === location
    );
    if (!team) {
      console.error(`Team not found for location: ${location}`);
    }
    return team ? team.id : null;
  };

  if (!leagueStandingsData?.status) {
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

  let transformedStandings = leagueStandingsData?.data?.map(
    (singleStandings) => {
      const transformedData = transformDetailsToObj(
        singleStandings?.details || []
      );

      return {
        teamId: singleStandings?.participant?.id || '',
        position: singleStandings?.position || '',
        teamName: singleStandings?.participant?.name || '',
        teamImage: singleStandings?.participant?.image_path || '',
        GP: transformedData['129'] || '',
        W: transformedData['130'] || '',
        D: transformedData['131'] || '',
        L: transformedData['132'] || '',
        GF: transformedData['133'] || '',
        GA: transformedData['134'] || '',
        GD: transformedData['179'] || '',
        PTS: transformedData['187'] || '',
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
          src={matchData?.league?.image_path || ''}
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
            transformedStandings?.map((singleStandings) => (
              <StandingTeamItem
                key={singleStandings.position || ''}
                singleStandings={singleStandings}
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
