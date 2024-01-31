'use client';

import NoDataFound from '@/app/shared/NoDataFound';
import { useGetProfileQuery } from '@/features/auth/authApi';
import { useGetFixtureDataQuery } from '@/features/front-end/fixture/fixtureApi';
import { RootState } from '@/features/store';
import { ILeague } from '@/types';
import getSlugify from '@/utils/get-slugify';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import { BiStar } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import FixtureCard from './FixtureCard';

export default function FootballFixtures() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const { selectedDate, checkLive } = useSelector(
    (state: RootState) => state.fixtureSlice
  );

  const { accessToken, user } = useSelector(
    (state: RootState) => state.authSlice
  );

  const { data, isLoading, isFetching } = useGetFixtureDataQuery(selectedDate, {
    skip: !selectedDate,
  });

  const { data: userData } = useGetProfileQuery(undefined, {
    skip: accessToken === undefined,
  });

  if (isLoading || isFetching) {
    return (
      <div className=" m-2 mb-2 rounded-2xl border-[1px] border-primary p-2 px-4 lg:m-0">
        {arr.map((item) => (
          <div className="grid grid-cols-12 gap-2 py-2" key={item}>
            <div className="col-span-1 h-12 w-full animate-pulse rounded-md bg-neutral"></div>
            <div className="col-span-8 h-12 w-full animate-pulse rounded-md bg-neutral "></div>
            <div className="col-span-2 h-12 w-full animate-pulse rounded-md bg-neutral"></div>
            <div className="col-span-1 flex h-12 w-full animate-pulse items-center justify-center">
              <BiStar className="text-xl text-neutral" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const fixturesData = data?.data;

  const liveStatus: string[] = [
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

  const liveMatches = fixturesData?.flatMap((league: ILeague) =>
    league.fixtures.filter((match: { state?: { state: string } | undefined }) =>
      liveStatus.includes(match?.state?.state ?? '')
    )
  );

  // Filter live matches based on the isLive status
  function filterLiveFixturesAndRemoveEmpty(
    leagues: ILeague[] | undefined,
    liveStatus: string[] | undefined
  ) {
    if (!leagues || !Array.isArray(leagues)) {
      return [];
    }

    return leagues
      .map((league: ILeague) => {
        const liveFixtures = league?.fixtures?.filter(
          (fixture) =>
            liveStatus !== undefined &&
            fixture?.state?.state !== undefined &&
            liveStatus.includes(fixture?.state?.state)
        );
        return { ...league, fixtures: liveFixtures };
      })
      .filter((league) => league.fixtures.length > 0);
  }

  // Live Fixtures
  const leaguesWithLiveFixtures = filterLiveFixturesAndRemoveEmpty(
    fixturesData,
    liveStatus
  );

  // Sort All Fixtures
  const finalFixtures = _.cloneDeep(fixturesData)?.sort(
    (a: { id: number }, b: { id: number }) => a.id - b.id
  );

  if (!fixturesData?.length) {
    return (
      <div className="rounded-2xl border-[1px] border-primary py-10">
        <NoDataFound width="10/12" />
      </div>
    );
  }

  return (
    <>
      {checkLive ? (
        <>
          {liveMatches.length === 0 && (
            <div className="p-10">
              <NoDataFound
                width="11/12"
                message="UNFORTUNATELY, THERE ARE NO LIVE MATCHES HAPPENING AT THE
                MOMENT. PLEASE CHECK BACK LATER. SEE YOU SOON!"
              />
            </div>
          )}

          {leaguesWithLiveFixtures.length > 0 && (
            <div className="m-2 mb-20 rounded-2xl border-[1px] border-primary pb-2  md:mb-16 lg:m-0 lg:mb-0">
              <div>
                {/* card section */}
                {leaguesWithLiveFixtures?.map((league) => (
                  <div key={league.id} className="">
                    {/* card title */}
                    <Link
                      href={`/league/${getSlugify(league?.name)}/${league?.id}`}
                    >
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3 ">
                          <div>
                            <Image
                              src={league?.image}
                              alt="team two"
                              height={0}
                              width={0}
                              sizes="100vw"
                              className="h-6 w-6 rounded-full bg-white"
                            />
                          </div>
                          <div className="text-white">
                            <h2 className="text-sm">{league?.name}</h2>
                            <p className="text-xs">
                              {league?.fixtures?.[0].league?.country?.name}
                            </p>
                          </div>
                        </div>
                        <div>
                          <IoIosArrowForward className="text-xl text-white" />
                        </div>
                      </div>
                    </Link>
                    {/* card body  */}
                    {league?.fixtures?.map((match, index: number) => (
                      <FixtureCard
                        key={index}
                        match={match}
                        large={false}
                        favoriteMatches={
                          userData?.data?.favorites?.matches || undefined
                        }
                        accessToken={accessToken}
                        user={user}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="visible m-2 mb-20  rounded-2xl border-[1px] border-primary pb-2 md:mb-16 lg:m-0 lg:mb-0">
            {finalFixtures?.map((league: ILeague) => (
              <div key={league.id} className="">
                {/* card title */}
                <Link
                  href={`/league/${getSlugify(league?.name)}/${league?.id}`}
                >
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3 ">
                      <div>
                        <Image
                          src={league?.image}
                          alt="team two"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="h-8 w-8 rounded-full bg-white p-[2px]"
                        />
                      </div>
                      <div className="text-white">
                        <h2 className="text-sm">{league?.name}</h2>
                        {league?.fixtures && league.fixtures.length > 0 && (
                          <p className="text-xs">
                            {league.fixtures[0]?.league?.country?.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <IoIosArrowForward className="text-xl text-white" />
                    </div>
                  </div>
                </Link>

                {/* card body  */}
                {league?.fixtures?.map((match, index: number) => (
                  <FixtureCard
                    key={index}
                    match={match}
                    large={false}
                    favoriteMatches={
                      userData?.data?.favorites?.matches || undefined
                    }
                    accessToken={accessToken}
                    user={user}
                  />
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
