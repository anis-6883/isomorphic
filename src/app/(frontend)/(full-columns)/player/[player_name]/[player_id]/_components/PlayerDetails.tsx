'use client';

import TopLeaguesList from '@/app/(frontend)/components/TopLeaguesList';
import MainLoading from '@/app/shared/MainLoading';
import TopDetailsCard from '@/app/shared/TopDetailsCard';
import { useGetPlayerDetailsQuery } from '@/features/front-end/player/playerApi';
import Image from 'next/image';
import PlayerProfile from './PlayerProfile';
import { Team } from '@/types';

export default function PlayerDetails({ playerId }:{playerId:number}) {
  const { isLoading, data: playerData } = useGetPlayerDetailsQuery(playerId, {
    skip: !playerId,
  });
  if (isLoading) {
    return <MainLoading />;
  }
  const playerLeague = playerData?.data.teams?.find(
    (team :Team) => team?.team?.type === 'domestic'
  );
  console.log('playerLeague' , playerLeague)

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-0 md:col-span-3"></div>
        <div className="col-span-12 w-full px-5 md:col-span-9">
          <div className="flex w-full items-center justify-between py-6">
            <div className="flex items-center">
              <Image
                src={playerData?.data.image_path}
                alt="team-logo"
                height={0}
                width={0}
                sizes="100vw"
                className="mr-4 h-16 w-16 rounded-full bg-white ring-1 ring-gray-100"
              />

              <div className="text-white">
                <p className="select-none text-2xl">
                  {playerData?.data.display_name}
                </p>
                <p className="select-none text-base font-light">
                  {playerData?.data.country?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <TopDetailsCard title="POPULAR LEAGUES">
            <TopLeaguesList />
          </TopDetailsCard>
        </div>
        <div className="col-span-9 my-3 flex flex-col items-center">
          <div className="h-auto w-full pb-3">
            <PlayerProfile
              key={'player_details_tab_01'}
              playerData={playerData?.data}
              playerLeague={playerLeague}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
