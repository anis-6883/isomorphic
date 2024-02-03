'use client';

import MainLoading from '@/app/shared/MainLoading';
import TabItem from '@/app/shared/TabItems';
import TabPanel from '@/app/shared/TabPanel';
import { useGetFixturesByIdQuery } from '@/features/front-end/fixture/fixtureApi';
import { useGetTeamUpcomingDataQuery } from '@/features/front-end/teams/teamsApi';
import { IFixtureProps, IMatchData } from '@/types';
import { convertTimestampToFormattedDate } from '@/utils/convert-timestamp-to-formatted-date';
import { getCurrentGoals } from '@/utils/get-current-goals';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiYoutube } from 'react-icons/ci';
import { FaFacebookF } from 'react-icons/fa';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoLogoInstagram } from 'react-icons/io5';
import Feed from './Feed';
import MatchH2H from './MatchH2H';
import MatchLineup from './MatchLineup';
import MatchPreview from './MatchPreview';
import MatchStandings from './MatchStandings';
import MatchStates from './MatchStates';
import Events from './summary/Events';
import StandingsShimmer from './standings/StandingShimmer';

export default function MatchDetails({ status, fixtureId }: IFixtureProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const [homeTeamFixtureId, setHomeTeamFixtureId] = useState(null);
  const [awayTeamFixtureId, setAwayTeamFixtureId] = useState(null);

  const {
    data: matchData,
    isLoading: isMatchDataLoading,
    isError,
  } = useGetFixturesByIdQuery(fixtureId) as IMatchData;

  const { data: homeMatchResponse, isLoading: isHomeDataLoading } =
    useGetTeamUpcomingDataQuery(homeTeamFixtureId, {
      skip: !homeTeamFixtureId,
    }) as IMatchData;

  const { data: awayMatchResponse, isLoading: isAwayDataLoading } =
    useGetTeamUpcomingDataQuery(awayTeamFixtureId, {
      skip: !awayTeamFixtureId,
    }) as IMatchData;

  useEffect(() => {
    if (!isMatchDataLoading) {
      const homeTeamFixture = matchData?.data?.participants.find(
        (team: { meta: { location: string } } | undefined) =>
          team?.meta.location === 'home'
      );

      const awayTeamFixture = matchData?.data?.participants.find(
        (team: { meta: { location: string } } | undefined) =>
          team?.meta.location === 'away'
      );

      setHomeTeamFixtureId(homeTeamFixture.id);
      setAwayTeamFixtureId(awayTeamFixture.id);
    }
  }, [matchData]);

  if (isMatchDataLoading || isHomeDataLoading || isAwayDataLoading) {
    return <StandingsShimmer size={10} />;
  }

  const liveStatus = [
    'INPLAY_1ST_HALF',
    'INPLAY_2ND_HALF',
    'HT',
    'INPLAY_ET',
    'INPLAY_ET_2ND_HALF',
    'BREAK',
    'PEN_BREAK',
    'EXTRA_TIME_BREAK',
    'INPLAY_PENALTIES',
  ];
  const finishedStatus = ['FT', 'AET', 'FT_PEN'];
  const upcomingStatus = [
    'TBA',
    'NS',
    'WO',
    'ABANDONED',
    'CANCELLED',
    'AWARDED',
    'INTERRUPTED',
    'POSTPONED',
  ];
  const matchState = matchData?.data?.state?.state;
  const isLive = liveStatus?.includes(matchState);
  const isUpcoming = upcomingStatus?.includes(matchState);
  const isFinished = finishedStatus?.includes(matchState);
  const { tOne, tTwo } = getCurrentGoals(matchData?.data?.scores);
  const formattedDate = convertTimestampToFormattedDate(
    matchData?.data?.starting_at_timestamp
  );
  const goalFormate: string = `${tOne} - ${tTwo}`;

  const homeTeam = matchData?.data?.participants?.find(
    (team: { meta: { location: string } } | undefined) =>
      team?.meta.location === 'home'
  );

  const awayTeam = matchData?.data?.participants?.find(
    (team: { meta: { location: string } } | undefined) =>
      team?.meta.location === 'away'
  );

  const tabs =
    status === 'preview'
      ? ['Preview', 'Analysis', 'Head-2-Head']
      : ['Info', 'Stats', 'Analysis', 'Line-up', 'Feed', 'H2H'];

  const tabContents =
    status === 'preview'
      ? [
          <MatchPreview
            key={'match_details_tab_01'}
            matchData={matchData.data}
          />,
          <MatchStandings
            key={'match_details_tab_02'}
            matchData={matchData}
            homeMatchResponse={homeMatchResponse}
            awayMatchResponse={awayMatchResponse}
          />,
          <MatchH2H key={'match_details_tab_03'} matchData={matchData} />,
        ]
      : [
          <Events
            key={'match_details_tab_04'}
            matchData={matchData}
            totalGoal={goalFormate}
          />,
          <MatchStates key={'match_details_tab_05'} matchData={matchData} />,
          <MatchStandings
            key={'match_details_tab_06'}
            matchData={matchData}
            homeMatchResponse={homeMatchResponse}
            awayMatchResponse={awayMatchResponse}
          />,
          <MatchLineup key={'match_details_tab_07'} matchData={matchData} />,
          <Feed key={'match_details_tab_08'} matchData={matchData.data} />,
          <MatchH2H key={'match_details_tab_9'} matchData={matchData} />,
        ];

  const handleTabChange = (tab: number) => {
    setCurrentTab(tab);
  };

  const videos = [
    'http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8',
    'http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8',
  ];

  return (
    <div className="mx-auto mb-20 md:mb-4">
      <div className="flex flex-col items-start justify-between ">
        <div className="w-full bg-[#1B2435] ">
          <div className="h-full p-2 lg:p-4">
            <div className="grid grid-cols-3 justify-items-center">
              <div></div>
              <h2 className="py-4 text-center text-sm text-gray-500 lg:text-xl ">
                {matchData?.data?.league?.name}
              </h2>
              <div className="flex items-center justify-end gap-2 justify-self-end px-1">
                <HiOutlineVideoCamera className="text-2xl " />
                <div>
                  <Image
                    src="/icons/star_black.png"
                    alt="Star logo"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </div>
            <div className=" w-full">
              <div className="grid w-full grid-cols-3 items-center justify-center lg:grid-cols-9">
                <div className=" hidden lg:block"></div>
                <div className=" hidden lg:block"></div>
                <Link
                  href={`/team/${getSlugify(homeTeam?.name)}/${homeTeam?.id}`}
                  className="col-span-1 flex items-center justify-end lg:col-span-2 "
                >
                  <div className="flex flex-col items-center justify-center gap-0 lg:flex-row-reverse lg:gap-3">
                    <Image
                      src={homeTeam?.image_path}
                      alt={homeTeam?.name}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="mx-auto h-8 w-8 rounded-full"
                    />
                    <h4 className="text-center text-xs font-semibold uppercase text-white lg:text-base">
                      {homeTeam?.name}
                    </h4>
                  </div>
                </Link>

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#061626] text-sm">
                  {isLive && (
                    <div className="relative flex flex-col items-center text-white">
                      <span>{matchData?.periods?.slice(-1)[0]?.minutes}</span>
                      <span className="absolute -right-1 -top-2 animate-pulse text-xl text-secondary">
                        {`"`}
                      </span>
                      <span className="font-semibold text-white">
                        {goalFormate}
                      </span>
                    </div>
                  )}

                  {isFinished && (
                    <span className="text-xl font-semibold text-white">
                      {goalFormate}
                    </span>
                  )}

                  {isUpcoming && (
                    <div className="text-center">
                      <span className="text-xl font-semibold text-white">
                        {formattedDate}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href={`/team/${getSlugify(awayTeam?.name)}/${awayTeam?.id}`}
                  className="col-span-1 flex items-center lg:col-span-2"
                >
                  <div className="flex flex-col content-center items-center gap-0 lg:flex-row lg:gap-3">
                    <Image
                      src={awayTeam?.image_path}
                      alt={awayTeam?.name}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="mx-auto h-8 w-8 rounded-full"
                    />
                    <h4 className="me-0 text-center text-xs  font-semibold uppercase text-white lg:me-3 lg:text-base">
                      {awayTeam?.name}
                    </h4>
                  </div>
                </Link>
                <div className=" hidden lg:block"></div>
              </div>
            </div>
            <h2 className="py-4 text-center text-xl text-gray-500">84{'"'}</h2>
          </div>
        </div>
      </div>
      {/* <VideoPlayer video={videos} /> */}
      <div className="mx-2 flex items-center justify-between py-2 lg:mx-0">
        <div className=" flex items-start  gap-5 font-normal text-gray-500 ">
          {tabs.map((tab, index) => (
            <TabItem
              key={index}
              tab={tab}
              onClick={() => handleTabChange(index)}
              active={currentTab === index}
              isWhite={false}
            />
          ))}
        </div>
        <div className="hidden content-center justify-end gap-4 pe-3 md:flex ">
          <Link
            href="/"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500  hover:text-secondary"
          >
            <FaFacebookF className="text-sm" />
          </Link>
          <Link
            href="/"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500  hover:text-secondary"
          >
            <IoLogoInstagram className="text-base" />
          </Link>
          <Link
            href="/"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500  hover:text-secondary"
          >
            <CiYoutube className="text-base" />
          </Link>
          <Link
            href="/"
            className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500  hover:text-secondary"
          >
            <CiYoutube className="text-base" />
          </Link>
        </div>
      </div>
      <div className="mt-1 h-auto w-full md:mt-5">
        <div className="">
          {tabContents.map((content, index) => (
            <TabPanel
              key={index}
              content={content}
              index={index}
              currentTab={currentTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
