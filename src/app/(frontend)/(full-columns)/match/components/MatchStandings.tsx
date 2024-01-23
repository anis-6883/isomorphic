import Image from 'next/image';
import Link from 'next/link';

import getSlugify from '@/utils/get-slugify';
import { UpcomingMatch } from './UpcomingMatch';
import AwayTeams from './standings/AwayTeams';
import HomeTeams from './standings/HomeTeams';

export default function MatchStandings({
  matchData,
  homeMatchResponse,
  awayMatchResponse,
}) {
  const homeData = matchData?.data?.participants.filter(
    (data) => data?.meta?.location === 'home'
  );
  const awayData = matchData?.data.participants.filter(
    (data) => data?.meta?.location === 'away'
  );

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 py-8 lg:grid-cols-2">
        <div className="mx-5 py-2">
          <Link
            href={`/team/${getSlugify(homeData[0]?.name)}/${homeData[0]?.id}`}
            className="my-2 flex items-center justify-start"
          >
            <h4 className="mx-4 font-semibold uppercase text-white">
              {homeData[0]?.name}
            </h4>
            <Image
              src={homeData[0]?.image_path}
              alt={homeData[0]?.name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-8 w-8 rounded-full"
            />
          </Link>
          <HomeTeams key={'match_standings_tab_01'} matchData={matchData} />
        </div>
        <div className="mx-5 py-2">
          <Link
            href={`/team/${getSlugify(awayData[0]?.name)}/${awayData[0]?.id}`}
            className="my-2 flex items-center justify-end"
          >
            <h4 className="mx-4 font-semibold uppercase text-white">
              {awayData[0]?.name}
            </h4>
            <Image
              src={awayData[0]?.image_path}
              alt={awayData[0]?.name}
              height={0}
              width={0}
              sizes="100vw"
              className="h-8 w-8 rounded-full"
            />
          </Link>
          <AwayTeams key={'match_standings_tab_02'} matchData={matchData} />
        </div>
      </div>

      {/* Next five match */}

      <UpcomingMatch
        homeMatchResponse={homeMatchResponse}
        awayMatchResponse={awayMatchResponse}
      />
    </div>
  );
}
