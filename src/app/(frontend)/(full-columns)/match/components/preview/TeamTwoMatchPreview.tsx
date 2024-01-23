import { useGetTeamInfoQuery } from '@/features/front-end/teams/teamsApi';
import { INestedObject } from '@/types';
import { calculateTeamResults } from '@/utils/calculate-team-result';
import getSlugify from '@/utils/get-slugify';
import { last7MatchesFormattedData } from '@/utils/last-seven-matches-data';
import Image from 'next/image';
import Link from 'next/link';

// Separate MatchResultIcon component
const MatchResultIcon = ({ result }: { result: string }) => {
  let bgColor, text;

  switch (result) {
    case 'win':
      bgColor = 'bg-green-600';
      text = 'W';
      break;
    case 'lose':
      bgColor = 'bg-red-600';
      text = 'L';
      break;
    default:
      bgColor = 'bg-gray-100';
      text = 'D';
  }

  return (
    <span
      className={`flex h-7 w-7 items-center justify-center rounded-full p-1 ring-1 ${
        text === 'D' ? 'text-black' : 'text-white'
      }  font-semibold ring-black ${bgColor}`}
    >
      {text}
    </span>
  );
};

export default function TeamTwoMatchPreview({ matchData }: INestedObject) {
  const awayTeamId = matchData?.participants?.find(
    (team: { meta: { location: string } } | undefined) =>
      team?.meta.location === 'away'
  )?.id;

  const { isLoading: teamInfoLoading2, data: teamInfoData2 } =
    useGetTeamInfoQuery(awayTeamId);

  const teamTwoFinalFormat = last7MatchesFormattedData(teamInfoData2?.data);
  const teamResults = calculateTeamResults(awayTeamId, teamTwoFinalFormat);

  return (
    <div>
      {teamInfoLoading2 ? (
        <div>Loading...</div>
      ) : (
        <div className="file:last:mb-3">
          <div className="mb-4 flex items-center justify-between p-4">
            <h4 className="font-bold uppercase text-white">
              {teamInfoData2?.data.name}
            </h4>
            <div className="flex items-center gap-5">
              {teamResults?.map((result, index) => (
                <MatchResultIcon key={index} result={result} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 px-5 text-white lg:grid-cols-7">
            {teamTwoFinalFormat.map((match: INestedObject, index: number) => {
              const homeGoals = match?.team_one?.goal;
              const awayGoals = match?.team_two?.goal;

              const teamOneImage = match?.team_one?.image;
              const teamTwoImage = match?.team_two?.image;

              return (
                <Link
                  href={`/match/details/${getSlugify(
                    match?.team_one?.name
                  )}-vs-${getSlugify(
                    match?.team_two?.name
                  )}/${match?.fixtureId}`}
                  key={match?.id}
                  className="flex items-center gap-2"
                >
                  <Image
                    alt="Team One Image"
                    src={teamOneImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-8 w-8 rounded-full ring-1 ring-black"
                  />

                  <span>
                    {homeGoals !== undefined && awayGoals !== undefined
                      ? `${homeGoals} - ${awayGoals}`
                      : 'N/A'}
                  </span>

                  <Image
                    alt="Team Two Image"
                    src={teamTwoImage}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-8 w-8 rounded-full ring-1 ring-black"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
