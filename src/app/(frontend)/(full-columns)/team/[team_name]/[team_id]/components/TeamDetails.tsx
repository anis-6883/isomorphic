'use client';

import TopLeaguesList from '@/app/(frontend)/components/TopLeaguesList';
import MainLoading from '@/app/shared/MainLoading';
import TabItem from '@/app/shared/TabItems';
import TabPanel from '@/app/shared/TabPanel';
import TopDetailsCard from '@/app/shared/TopDetailsCard';
import {
  useGetTeamDetailsQuery,
  useGetTeamTransfersQuery,
} from '@/features/front-end/teams/teamsApi';
import Image from 'next/image';
import { useState } from 'react';
import TeamMatches from './TeamMatches';
import TeamOverview from './TeamOverview';
import TeamSquad from './TeamSquad';

export default function TeamDetails({
  teamId,
}: {
  teamId: string | undefined;
}) {
  // const { data: session } = useSession();
  // const { userProfile } = useGetUserProfile(session);
  const [currentTab, setCurrentTab] = useState(0);

  const { isLoading: teamDetailsLoading, data: teamDetails } =
    useGetTeamDetailsQuery(teamId, { skip: !teamId });
  const { isLoading: teamTransfersLoading, data: teamTransfers } =
    useGetTeamTransfersQuery(teamId, { skip: !teamId });

  if (teamDetailsLoading || teamTransfersLoading) {
    return <MainLoading />;
  }
  // const favoriteSelected =
  //   userProfile?.favorites?.teams.some(
  //     (item) => parseInt(item.id) === parseInt(teamId)
  //   ) || false;

  // const [isFavorite, setIsFavorite] = useState(favoriteSelected);

  // useEffect(() => {
  //   if (userProfile) {
  //     setIsFavorite(favoriteSelected);
  //   }
  // }, [favoriteSelected, userProfile]);

  const tabs = ['Overview', 'Matches', 'Squad'];

  const tabContents = [
    <TeamOverview
      key={'team_details_tab_001'}
      teamDetails={teamDetails?.data}
      teamTransfers={teamTransfers?.data}
    />,
    <TeamMatches
      key={'team_details_tab_002'}
      teamDetails={teamDetails?.data}
    />,
    <TeamSquad
      key={'team_details_tab_003'}
      teamDetails={teamDetails?.data}
      teamId={teamId}
    />,
  ];

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  // Add To Favorites
  // const addToFavorites = async (e, team) => {
  //   e.preventDefault();

  //   if (session) {
  //     setIsFavorite(!isFavorite);
  //     const favoriteData = {
  //       phone: session.user?.phone,
  //       key: 'teams',
  //       item: {
  //         id: team?.id,
  //         name: team?.name,
  //         image: team?.image_path,
  //         country: team?.country?.name,
  //       },
  //     };

  //     try {
  //       const { data } = await asiaSportBackendUrl.put(
  //         '/api/user/favorites',
  //         favoriteData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.user?.accessToken}`,
  //           },
  //         }
  //       );

  //       if (data.status) {
  //         toast.success('Team added to favorites!');
  //       } else {
  //         setIsFavorite(!isFavorite);
  //         toast.error('Something went wrong!');
  //       }
  //     } catch (error) {
  //       console.error('Error while adding to favorites:', error);
  //     }
  //   } else {
  //     toast.error('Please login first!');
  //   }
  // };

  // // Remove From Favorites
  // const removeFromFavorites = async (e, team) => {
  //   e.preventDefault();

  //   if (session) {
  //     setIsFavorite(!isFavorite);
  //     const favoriteData = {
  //       phone: session.user?.phone,
  //       key: 'teams',
  //       item: {
  //         id: team.id,
  //       },
  //     };

  //     try {
  //       const { data } = await asiaSportBackendUrl.put(
  //         '/api/user/favorites/remove',
  //         favoriteData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.user?.accessToken}`,
  //           },
  //         }
  //       );

  //       if (data.status) {
  //         toast.success('Removed from favorites!');
  //       } else {
  //         setIsFavorite(!isFavorite);
  //         toast.error('Error');
  //       }
  //     } catch (error) {
  //       console.error('Error while removing from favorites:', error);
  //       toast.error('An error occurred');
  //     }
  //   } else {
  //     toast.error('Please login first!');
  //   }
  // };

  return (
    <div className="mx-auto max-w-screen-lg">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-0 md:col-span-3"></div>
        <div className="col-span-12 w-full px-5 md:col-span-9">
          <div className="flex w-full items-center justify-between py-6">
            <div className="flex items-center">
              <Image
                src={
                  teamDetails?.data.image_path
                    ? teamDetails?.data.image_path
                    : 'team_placeholder.png'
                }
                alt="team-logo"
                height={0}
                width={0}
                sizes="100vw"
                className="mr-4 h-16 w-16 rounded-full bg-white ring-1 ring-gray-100"
              />

              <div className="text-white">
                <p className="select-none text-2xl">{teamDetails?.data.name}</p>
                <p className="select-none text-base font-light">
                  {teamDetails?.data.country?.name}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-5">
              <div className="cursor-pointer">
                {isFavorite ? (
                  <IoStar
                    onClick={(e) => removeFromFavorites(e, teamDetails)}
                    className="text-xl text-yellow-500"
                  />
                ) : (
                  <IoStarOutline
                    onClick={(e) => addToFavorites(e, teamDetails)}
                    className="text-xl text-white"
                  />
                )}
              </div>
            </div> */}
          </div>
          <div className="my-5 flex items-center justify-start gap-5">
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

      <div className="m-2 grid grid-cols-12 gap-5 md:m-0">
        <div className="col-span-3 hidden md:block">
          <TopDetailsCard title="POPULAR LEAGUES">
            <TopLeaguesList />
          </TopDetailsCard>
        </div>
        <div className="col-span-12 flex flex-col items-center md:col-span-9 ">
          <div className="h-auto w-full pb-3 ">
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
