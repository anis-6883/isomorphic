import MatchScore from '@/app/(frontend)/(three-columns)/components/fixtureCardInfo/MatchScore';
import NoDataFound from '@/app/shared/NoDataFound';
import { useGetFixturesMatchH2HByTeamQuery } from '@/features/front-end/fixture/fixtureApi';
import { INestedObject, Team } from '@/types';
import getShortName from '@/utils/get-short-name';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoStar } from 'react-icons/io5';

export default function MatchH2H({ matchData }: { matchData: INestedObject }) {
  const [isStarClicked, setIsStarClicked] = useState(false);
  const homeId = matchData?.data.participants.find(
    (team: Team | undefined) => team?.meta?.location === 'home'
  )?.id;
  const awayId = matchData?.data.participants.find(
    (team: Team | undefined) => team?.meta?.location === 'away'
  )?.id;

  const { isLoading: headToHeadLoading, data: headToHeadData } =
    useGetFixturesMatchH2HByTeamQuery(
      { homeId, awayId },
      { skip: !homeId && !awayId }
    );

  if (headToHeadLoading) {
    return <>Loading . . . </>;
  }

  if (headToHeadData === 'No Data Found!') {
    return <NoDataFound />;
  }

  // const handleButtonClick = (event:EventListener) => {
  //   event.preventDefault();
  //   setIsStarClicked(!isStarClicked);
  // };

  interface Match {
    id: string;
    name: string;
    starting_at: string;
    participants: {
      name: string;
      image_path: string;
    }[];
    state: {
      state: string;
    };
    // Add other properties as needed
  }

  interface Encounter {
    id: string;
    league_name: string;
    match_time: string;
    home_team_name: string;
    home_team_image: string;
    away_team_name: string;
    away_team_image: string;
    match_state: string;
    teamMatch: Match;
    // Add other properties as needed
  }

  const getPreviousEncounters = (
    counters: Match[] | undefined
  ): Encounter[] | JSX.Element => {
    if (!counters?.length) {
      return <NoDataFound />;
    }

    let previousEncounters: Encounter[] = [];

    counters?.forEach((match) => {
      const fixtureId = match?.id;
      const leagueName = match.name;
      const matchTime = match.starting_at;
      const homeTeamName = match.participants[0].name;
      const homeTeamImage = match.participants[0].image_path;
      const awayTeamName = match.participants[1].name;
      const awayTeamImage = match.participants[1].image_path;
      const matchState = match.state.state;

      const encounter: Encounter = {
        id: fixtureId,
        league_name: leagueName,
        match_time: matchTime,
        home_team_name: homeTeamName,
        home_team_image: homeTeamImage,
        away_team_name: awayTeamName,
        away_team_image: awayTeamImage,
        match_state: matchState,
        teamMatch: match,
      };

      previousEncounters.push(encounter);
    });

    return previousEncounters;
  };

  const previousEncounters = getPreviousEncounters(headToHeadData?.data);
  const teamByLocation = (location: string) =>
    matchData?.data.participants?.find(
      (team: Team | undefined) => team?.meta?.location === location
    );
  return (
    <div className=" m-2 mb-20 mt-10 rounded-2xl border-[1px] border-primary text-[11px] md:m-0 md:mb-8 md:text-base">
      <div className="">
        <div></div>
        <div>
          {((previousEncounters as Encounter[]) || []).map((match) => (
            <div key={match?.id}>
              <div className="grid grid-cols-5">
                <div></div>
                <div className="col-span-3">
                  <Link
                    href={`/league/${getSlugify(
                      'league?.name'
                    )}/${'league?.id'}`}
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3 ">
                        <div>
                          <Image
                            src={matchData?.data.league?.image_path}
                            alt="team two"
                            height={0}
                            width={0}
                            sizes="100vw"
                            className="h-6 w-6 rounded-full bg-white"
                          />
                        </div>
                        <div className="text-white">
                          <h2 className="text-[11px] md:text-base">
                            {matchData?.data.league?.name}
                          </h2>
                          <p className="text-[9px] md:text-xs">
                            {matchData?.league?.country?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
                <div></div>
              </div>

              <div className="my-5 grid grid-cols-12 bg-[#1B2435] lg:grid-cols-5">
                <div></div>
                <div className="col-span-10 lg:col-span-3 ">
                  <div className="bg-[#1B2435]">
                    {' '}
                    <div className="relative ">
                      <Link
                        className={
                          'my-2h-16 grid grid-cols-10 content-center gap-4 bg-[#1B2435] text-[11px] md:text-lg'
                        }
                        href={`/match/details/${getSlugify(
                          match?.home_team_name
                        )}-vs-${getSlugify(
                          match?.home_team_name
                        )}/${match?.id}`}
                      >
                        <span className="col-span-2 my-auto me-3 p-1 text-[9px] text-[#3388FF] md:text-xs lg:col-span-1">
                          {match?.match_time?.split(' ')[1].slice(0, 5)}
                        </span>

                        <div className="col-span-6 flex items-center py-1 lg:col-span-7">
                          <div>
                            <div className="flex justify-between pb-2 text-gray-400">
                              <div className="flex items-center gap-2 ">
                                <div>
                                  <Image
                                    src={teamByLocation('home')?.image_path}
                                    alt="team one"
                                    height={0}
                                    width={0}
                                    sizes="100vw"
                                    className={'h-5 w-5'}
                                  />
                                </div>
                                <h2>
                                  {getShortName(
                                    teamByLocation('home')?.name,
                                    teamByLocation('home')?.short_code
                                  )}
                                </h2>
                              </div>
                            </div>
                            <div className="flex justify-between text-gray-400 ">
                              <div className="flex items-center gap-2 ">
                                <div>
                                  <Image
                                    src={teamByLocation('away')?.image_path}
                                    alt="team two"
                                    height={0}
                                    width={0}
                                    sizes="100vw"
                                    className={'h-5 w-5'}
                                  />
                                </div>
                                <h2>
                                  {getShortName(
                                    teamByLocation('away')?.name,
                                    teamByLocation('away')?.short_code
                                  )}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* goal section  */}
                        <MatchScore match={match?.teamMatch} large={true} />
                      </Link>

                      {/* favorite section  */}
                      <div
                        className={
                          ' absolute right-[0.25rem] top-[1.2rem] z-[999] h-8 w-8 lg:right-3 lg:top-6'
                        }
                      >
                        <div>
                          <IoStar className="mx-auto my-auto text-[14px] text-yellow-500 md:text-xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}
