'use client';

import { useGetSingleLeagueByIdQuery } from '@/features/front-end/league/leagueApi';

import TopLeaguesList from '@/app/(frontend)/components/TopLeaguesList';
import MainLoading from '@/app/shared/MainLoading';
import TabItem from '@/app/shared/TabItems';
import TabPanel from '@/app/shared/TabPanel';
import TopDetailsCard from '@/app/shared/TopDetailsCard';
import Image from 'next/image';
import { useState } from 'react';
import LeagueFixture from './LeagueFixture';
import Recent from './Recent';
import Standings from './Standings';

export default function LeagueDetails({ leagueId }) {
  const [currentTab, setCurrentTab] = useState(0);
  //   const { data: session } = useSession();
  //   const { userProfile } = useGetUserProfile(session);
  const { isLoading, data: leagueData } = useGetSingleLeagueByIdQuery(
    leagueId,
    { skip: !leagueId }
  );

  if (isLoading) {
    return <MainLoading />;
  }

  const seasonId = leagueData?.data.currentseason?.id;

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
    <LeagueFixture key={'001'} upcoming={leagueData?.data.upcoming} />,
    <Recent key={'002'} latest={leagueData?.data.latest} />,
    <Standings key={'003'} seasonId={seasonId} />,
  ];

  const handleTabChange = (tab) => {
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
                src={leagueData?.data.image_path}
                alt={leagueData?.data.name}
                height={0}
                width={0}
                sizes="100vw"
                className="mr-4 h-16 w-16 select-none rounded-full bg-white p-[2px] ring-1 ring-gray-100"
              />

              <div className="text-white">
                <p className="select-none text-2xl">{leagueData?.data.name}</p>
                <div className="flex gap-4">
                  <p className="select-none text-base font-light">
                    {leagueData?.data.country?.name}
                  </p>
                  <div>
                    <select
                      id="seasons"
                      name="seasons"
                      className="select-none bg-transparent text-secondary outline-none"
                      onChange={(e) => setSeasonId(e.target.value)}
                    >
                      {leagueData?.data.seasons
                        .slice()
                        .sort((a, b) => {
                          const firstYear1 = a?.name.split('/')[0];
                          const firstYear2 = b?.name.split('/')[0];
                          return firstYear2 - firstYear1;
                        })
                        .map((season) => (
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

      <div className="m-2 mb-20 grid grid-cols-12 gap-5 md:m-0 md:mb-0">
        <div className="col-span-3 hidden md:block">
          <TopDetailsCard title="POPULAR LEAGUES">
            <TopLeaguesList />
          </TopDetailsCard>
        </div>
        <div className="col-span-12 my-3 flex flex-col items-center md:col-span-9">
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
