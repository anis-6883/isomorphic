'use client';

import NoDataFound from '@/app/shared/NoDataFound';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';
import { BiStar } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import FixtureCard from './FixtureCard';
import { useGetFixtureDataQuery } from '@/features/front-end/fixture/fixtureApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/store';
import _ from "lodash"
import { ILeague, IMatch } from '@/types';


export default function Fixtures() {

 const {selectedDate ,checkLive} = useSelector((state:RootState) => state.fixtureSlice)
 const {data, isLoading , isError , refetch, isFetching} = useGetFixtureDataQuery(selectedDate)
 const fixturesData = data?.data

 if(!isLoading && !isError){
    console.log(fixturesData);
 }

  const liveStatus:string[] = [
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
  function filterLiveFixturesAndRemoveEmpty(leagues: ILeague[] | undefined, liveStatus: any) {
    if (!leagues || !Array.isArray(leagues)) {
      return [];
    }
  
    return leagues
      .map((league: ILeague) => {
        const liveFixtures = league?.fixtures?.filter((fixture) =>
          liveStatus.includes(fixture.state?.state)
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
  const finalFixtures = _.cloneDeep(fixturesData)?.sort((a:{id:number}, b:{id:number}) => a.id - b.id);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  if (isLoading || isFetching ) {
    return (
      <div className=" mb-2 px-4">
        {arr.map((item) => (
          <div className="grid grid-cols-12 gap-2 py-2" key={item}>
            <div className="col-span-1 h-12 w-full bg-neutral animate-pulse rounded-md"></div>
            <div className="col-span-8 h-12 w-full bg-neutral animate-pulse rounded-md "></div>
            <div className="col-span-2 h-12 w-full bg-neutral animate-pulse rounded-md"></div>
            <div className="col-span-1 h-12 w-full animate-pulse flex items-center justify-center">
              <BiStar className="text-xl text-neutral" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!fixturesData?.length) {
    return (
      <div className="border-[1px] border-primary rounded-2xl py-10">
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
            <div className="border-[1px] border-primary rounded-2xl pb-2 mb-20 md:mb-16  lg:mb-0 m-2 lg:m-0">
              <div>
                {/* card section */}
                {leaguesWithLiveFixtures?.map((league) => (
                  <div key={league.id} className="">
                    {/* card title */}
                    <Link
                      href={`/league/${getSlugify(league?.name)}/${league?.id}`}
                    >
                      <div className="flex justify-between items-center p-3">
                        <div className="flex items-center gap-3 ">
                          <div>
                            <Image
                              src={league?.image}
                              alt="team two"
                              height={0}
                              width={0}
                              sizes="100vw"
                              className="w-6 h-6 rounded-full bg-white"
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
                    {league?.fixtures?.map((match) => (
                      <FixtureCard
                        key={match.id}
                        match={match}
                        refetchFixtures={refetch}
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
          <div className="border-[1px] border-primary rounded-2xl  pb-2 visible mb-20 md:mb-16 lg:mb-0 m-2 lg:m-0">
            {finalFixtures?.map((league:ILeague) => (
              <div key={league.id} className="">
                {/* card title */}
                <Link
                  href={`/league/${getSlugify(league?.name)}/${league?.id}`}
                >
                  <div className="flex justify-between items-center p-3">
                    <div className="flex items-center gap-3 ">
                      <div>
                        <Image
                          src={league?.image}
                          alt="team two"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="w-8 h-8 p-[2px] rounded-full bg-white"
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
                {league?.fixtures?.map((match) => (
                  <FixtureCard
                    key={match.id}
                    match={match}
                    refetchFixtures={refetch}
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
