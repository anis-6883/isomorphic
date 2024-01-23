import { useGetTeamInfoQuery } from '@/features/front-end/teams/teamsApi';
import { INestedObject } from '@/types';
import { calculateTeamResults } from '@/utils/calculate-team-result';
import getSlugify from '@/utils/get-slugify';
import { last7MatchesFormattedData } from '@/utils/last-seven-matches-data';
import Image from 'next/image';
import Link from 'next/link';

export default function TeamOneMatchPreview({ matchData }: INestedObject) {
  const homeTeamId = matchData?.participants?.find(
    (team: { meta: { location: string } } | undefined) =>
      team?.meta.location === 'home'
  )?.id;

  const { isLoading: teamInfoLoading1, data: teamInfoData1 } =
    useGetTeamInfoQuery(homeTeamId);

  const teamOneFinalFormat = last7MatchesFormattedData(teamInfoData1?.data);

  const teamResults = calculateTeamResults(homeTeamId, teamOneFinalFormat);

  return (
    <div>
      {teamInfoLoading1 ? (
        <div>Loading...</div>
      ) : (
        <div className="mb-3">
          <div className="mb-4 flex items-center justify-between p-4">
            <h4 className="font-bold uppercase text-white">
              {teamInfoData1?.data.name}
            </h4>
            <div className="flex items-center gap-5">
              {teamResults?.map((match, index) => {
                if (match === 'win') {
                  return (
                    <span
                      key={index}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-green-600 p-1 font-semibold text-white ring-1 ring-black md:h-4 md:w-4"
                    >
                      W
                    </span>
                  );
                } else if (match === 'lose') {
                  return (
                    <span
                      key={index}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 p-1 font-semibold text-white ring-1 ring-black md:h-4 md:w-4"
                    >
                      L
                    </span>
                  );
                } else {
                  return (
                    <span
                      key={index}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 p-1 font-semibold text-black ring-1 ring-black md:h-4 md:w-4"
                    >
                      D
                    </span>
                  );
                }
              })}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 px-5 text-white lg:grid-cols-7">
            {teamOneFinalFormat.map((match: INestedObject) => {
              const homeGoals = match?.team_one?.goal;
              const awayGoals = match?.team_two?.goal;
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
                    alt="Demo Image"
                    src={match?.team_one?.image}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-8 w-8 rounded-full ring-1 ring-black"
                  />

                  <span>
                    {homeGoals} - {awayGoals}
                  </span>

                  <Image
                    alt="Demo Image"
                    src={match?.team_two?.image}
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
