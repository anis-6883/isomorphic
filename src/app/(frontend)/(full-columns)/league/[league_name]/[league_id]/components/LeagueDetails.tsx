'use client';

import { useGetSingleLeagueByIdQuery } from '@/features/front-end/league/leagueApi';

import TopLeaguesList from '@/app/(frontend)/components/TopLeaguesList';
import MainLoading from '@/app/shared/MainLoading';
import TabItem from '@/app/shared/TabItems';
import TabPanel from '@/app/shared/TabPanel';
import TopDetailsCard from '@/app/shared/TopDetailsCard';
import { ISeason } from '@/types';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import LeagueFixture from './LeagueFixture';
import Recent from './Recent';
import Standings from './Standings';
import { BiStar } from 'react-icons/bi';

export default function LeagueDetails({ leagueId }: { leagueId: number }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [seasonId, setSeasonId] = useState<number | null>(null);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const { isLoading, data: leagueData , isFetching } = useGetSingleLeagueByIdQuery(
    leagueId || null,
    { skip: !leagueId }
  );

  useEffect(() => {
    if (!isLoading && leagueData?.data?.currentseason?.id) {
      setSeasonId(leagueData.data.currentseason.id);
    }
  }, [isLoading, leagueData]);

  if (isLoading || isFetching) {
    return (
      <div className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-0 md:col-span-3"></div>
        <div className="col-span-12 w-full px-5 md:col-span-9">
          <div className="flex w-full items-center justify-between py-6">
            <div className="flex items-center">
              <Image
                src='/images/team_placeholder.png'
                alt="team placeholder name"
                height={0}
                width={0}
                sizes="100vw"
                className="mr-4 h-16 w-16 animate-pulse select-none rounded-full bg-white p-[2px] ring-1 ring-gray-100"
              />
              <div className="text-white">
              <div className="col-span-8 h-6 w-64 animate-pulse rounded-md bg-neutral "></div>
                <div className="flex gap-4">
                <div className="col-span-8 h-4 w-20 animate-pulse rounded-md bg-neutral mt-3 "></div>
                  <div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5 flex select-none items-center justify-start gap-5">
          <div className="col-span-8 h-1 w-14 animate-pulse rounded-md bg-neutral mt-3 "></div>
          <div className="col-span-8 h-1 w-14 animate-pulse rounded-md bg-neutral mt-3 "></div>
          <div className="col-span-8 h-1 w-14 animate-pulse rounded-md bg-neutral mt-3 "></div>
          </div>
        </div>
      </div>

      <div className="m-2 my-2 mb-20 grid grid-cols-12 gap-5 md:m-0 md:mb-0 ">
        <div className="col-span-3 rounded-2xl border-[1px] border-primary hidden md:block">
        {arr.map((item) => (
        <div key={item} className="flex items-center gap-2 p-3">
        <div className="col-span-8 h-10 w-10 animate-pulse rounded-full bg-neutral"></div>
              <div className="text-white">
              <div className="col-span-8 h-4 w-44 animate-pulse rounded-md bg-neutral "></div>
                <div className="flex gap-4">
                  <div>
                  </div>
                </div>
              </div>
            </div>))}
        </div>
        <div className="col-span-12  flex flex-col items-center md:col-span-9">
          <div className="h-auto w-full rounded-2xl border-[1px] border-primary pb-3">
          {arr.map((item) => (
          <div className="grid grid-cols-12 gap-2 py-2 p-3" key={item}>
            <div className="col-span-1 h-12 w-full animate-pulse rounded-md bg-neutral"></div>
            <div className="col-span-8 h-12 w-full animate-pulse rounded-md bg-neutral "></div>
            <div className="col-span-2 h-12 w-full animate-pulse rounded-md bg-neutral"></div>
            <div className="col-span-1 flex h-12 w-full animate-pulse items-center justify-center">
              <BiStar className="text-xl text-neutral" />
            </div>
          </div>
        ))}
          </div>
        </div>
      </div>
    </div>
    );
  }

  //   const favoriteSelected =
  //     userProfile?.favorites?.leagues.some(
  //       (item) => parseInt(item.id) === parseInt(leagueData.id)
  //     ) || false;

  //   const [isFavorite, setIsFavorite] = useState(favoriteSelected);

  //   useEffect(() => {
  //     if (userProfile) {
  //       setIsFavorite(favoriteSelected);
  //     }
  //   }, [favoriteSelected, userProfile]);

  const tabs = ['Upcoming', 'Recent', 'Standings'];

  const tabContents = [
    <LeagueFixture key={'001'} upcoming={leagueData?.data?.upcoming} />,
    <Recent key={'002'} latest={leagueData?.data?.latest} />,
    <Standings key={'003'} seasonId={leagueData?.data?.currentseason?.id} />,
  ];

  const handleTabChange = (tab: number) => {
    setCurrentTab(tab);
  };

  // Add To Favorites
  //   const addToFavorites = async (e, league) => {
  //     e.preventDefault();

  //     if (session) {
  //       setIsFavorite(!isFavorite);
  //       const favoriteData = {
  //         phone: session.user?.phone,
  //         key: 'leagues',
  //         item: {
  //           id: league?.id,
  //           name: league?.name,
  //           image: league?.image_path,
  //           country: league?.country?.name,
  //         },
  //       };

  //       try {
  //         const { data } = await asiaSportBackendUrl.put(
  //           '/api/user/favorites',
  //           favoriteData,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${session?.user?.accessToken}`,
  //             },
  //           }
  //         );

  //         if (data.status) {
  //           toast.success('League added to favorites!');
  //         } else {
  //           setIsFavorite(!isFavorite);
  //           toast.error('Something went wrong!');
  //         }
  //       } catch (error) {
  //         console.error('Error while adding to favorites:', error);
  //       }
  //     } else {
  //       toast.error('Please login first!');
  //     }
  //   };

  // Remove From Favorites
  //   const removeFromFavorites = async (e, league) => {
  //     e.preventDefault();

  //     if (session) {
  //       setIsFavorite(!isFavorite);
  //       const favoriteData = {
  //         phone: session.user?.phone,
  //         key: 'leagues',
  //         item: {
  //           id: league.id,
  //         },
  //       };

  //       try {
  //         const { data } = await asiaSportBackendUrl.put(
  //           '/api/user/favorites/remove',
  //           favoriteData,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${session?.user?.accessToken}`,
  //             },
  //           }
  //         );

  //         if (data.status) {
  //           toast.success('Removed from favorites!');
  //         } else {
  //           setIsFavorite(!isFavorite);
  //           toast.error('Error');
  //         }
  //       } catch (error) {
  //         console.error('Error while removing from favorites:', error);
  //         toast.error('An error occurred');
  //       }
  //     } else {
  //       toast.error('Please login first');
  //     }
  //   };

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-0 md:col-span-3"></div>
        <div className="col-span-12 w-full px-5 md:col-span-9">
          <div className="flex w-full items-center justify-between py-6">
            <div className="flex items-center">
              <Image
                src={
                  leagueData?.data?.image_path
                    ? leagueData?.data?.image_path
                    : 'team_placeholder.png'
                }
                alt={leagueData?.data?.name}
                height={0}
                width={0}
                sizes="100vw"
                className="mr-4 h-16 w-16 select-none rounded-full bg-white p-[2px] ring-1 ring-gray-100"
              />

              <div className="text-white">
                <p className="select-none text-2xl">{leagueData?.data?.name}</p>
                <div className="flex gap-4">
                  <p className="my-auto select-none text-base font-light">
                    {leagueData?.data.country?.name}
                  </p>
                  <div>
                    <select
                      id="seasons"
                      name="seasons"
                      className="select mt-2 border-none bg-transparent text-secondary outline-none cursor-pointer"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setSeasonId(Number(e.target.value))
                      }
                    >
                      {leagueData?.data.seasons
                        .slice()
                        .sort((a: { name: string }, b: { name: string }) => {
                          const firstYear1 = Number(a?.name.split('/')[0]);
                          const firstYear2 = Number(b?.name.split('/')[0]);
                          return firstYear2 - firstYear1;
                        })
                        .map((season: ISeason) => (
                          <option
                            className="bg-primary text-white"
                            key={season?.id}
                            value={season?.id}
                          >
                            {season?.name}
                          </option>
                          
                        ))}
                    </select>
                     
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="cursor-pointer">
                {isFavorite ? (
                  <IoStar
                    onClick={(e) => removeFromFavorites(e, leagueData)}
                    className="text-xl text-yellow-500"
                  />
                ) : (
                  <IoStarOutline
                    onClick={(e) => addToFavorites(e, leagueData)}
                    className="text-xl text-white"
                  />
                )}
              </div> */}
          </div>
          <div className="my-5 flex select-none items-center justify-start gap-5">
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
        </div>
      </div>

      <div className="m-2 my-2 mb-20 grid grid-cols-12 gap-5 md:m-0 md:mb-0">
        <div className="col-span-3 hidden md:block">
          <TopDetailsCard title="POPULAR LEAGUES">
            <TopLeaguesList />
          </TopDetailsCard>
        </div>
        <div className="col-span-12  flex flex-col items-center md:col-span-9">
          <div className="h-auto w-full rounded-2xl border-[1px] border-primary pb-3">
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
    </div>
  );
}
