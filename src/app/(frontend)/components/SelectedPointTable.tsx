'use client'

import { useGetSelectedPointTableQuery } from '@/features/front-end/league/leagueApi';
import getShortName from '@/utils/get-short-name';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';

export default function SelectedPointTable() {
  const { data:selectedPointTable, isLoading ,isError } =
  useGetSelectedPointTableQuery(undefined);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (isLoading && isError) {
    return (
      <div className="space-y-4 mb-2">
        <div className="w-full h-16 bg-neutral animate-pulse rounded-md"></div>
        {arr.map((shimmer) => (
          <div className="grid grid-cols-12 gap-3" key={shimmer}>
            <div
              key={shimmer}
              className="col-span-6 h-6 w-full bg-neutral animate-pulse rounded-md"
            ></div>
            <div className="col-span-2 h-6 w-full bg-neutral animate-pulse rounded-md"></div>
            <div className="col-span-2 h-6 w-full bg-neutral animate-pulse rounded-md"></div>
            <div className="col-span-2 h-6 w-full bg-neutral animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    );
  }

  if (selectedPointTable?.status) {
    return (
      <div className="flex flex-col items-center border-[1px] border-primary rounded-2xl">
        <div className="h-16 w-full">
          <div className="flex items-center justify-between h-full p-4">
            <h4 className="text-white text-sm font-light uppercase">
              {selectedPointTable?.data.league_name}
            </h4>

            <Image
              src={selectedPointTable?.data.league_image}
              alt={selectedPointTable?.data.league_name}
              height={0}
              width={0}
              sizes="100vw"
              className="w-8 h-8 bg-white p-1 mr-4 rounded-full"
            />
          </div>
        </div>
        <div className=" h-auto w-full rounded-2xl">
          <div className="p-2">
            <div className="grid grid-cols-8 text-sm text-white items-center mb-2 pb-2">
              <p className="col-span-1 font-light uppercase text-xs">#</p>
              <div className="col-span-4 flex items-center">
                <p className="font-light uppercase text-xs">Team</p>
              </div>
              <p className="col-span-1 font-light uppercase text-xs text-center">
                PL
              </p>
              <p className="col-span-1 font-light uppercase text-xs text-center">
                GD
              </p>
              <p className="col-span-1 font-light uppercase text-xs text-center">
                PTS
              </p>
            </div>

            {selectedPointTable?.data?.standings?.map((team, index:number) => (
              <Link
                key={team.id}
                href={`/team/${getSlugify(team?.participant?.name)}/${
                  team?.participant?.id
                }`}
              >
                <div
                  key={team.id}
                  className="grid grid-cols-8 text-xs text-black items-center mb-2 gap-3"
                >
                  <p className="col-span-1 text-white font-light text-xs">
                    {index + 1}
                  </p>
                  <div className="col-span-4 flex items-center">
                    <Image
                      src={team?.participant?.image_path}
                      alt={team?.participant?.name}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="w-6 h-6 bg-white p-1 mr-4 rounded-full"
                    />
                    <p className="text-white font-light text-xs">
                      {team?.participant?.name
                        ? getShortName(team?.participant?.name)
                        : ''}
                    </p>
                  </div>
                  <p className="col-span-1 text-white font-light text-xs">
                    {team?.details?.find((item) => item.type.id === 129)?.value}
                  </p>
                  <p className="col-span-1 text-white font-light text-xs">
                    {team?.details?.find((item) => item.type.id === 179)?.value}
                  </p>
                  <p className="col-span-1 text-white font-light text-xs">
                    {team?.points}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center border-[1px] border-primary rounded-2xl">
      <div className="h-16 w-full">
        <div className="flex items-center justify-between h-full p-4">
          <h4 className="text-white text-xs font-light">League Name</h4>

          <Image
            src="/images/team_placeholder.png"
            alt="league-image"
            height={0}
            width={0}
            sizes="100vw"
            className="w-8 h-8 ring-1 ring-primary mr-4 rounded-full bg-white p-1"
          />
        </div>
      </div>
      <div className=" h-auto w-full rounded-2xl">
        <div className="p-2">
          <div className="grid grid-cols-8 text-xs text-white items-center mb-2 border-b border-gray-300 pb-2">
            <p className="col-span-1 font-light uppercase text-xs">#</p>
            <div className="col-span-4 flex items-center">
              <p className="font-light uppercase text-xs">Team</p>
            </div>
            <p className="col-span-1 font-light uppercase text-xs">PL</p>
            <p className="col-span-1 font-light uppercase text-xs">GD</p>
            <p className="col-span-1 font-light uppercase text-xs">PTS</p>
          </div>
        </div>
        <div className="p-3 font-light uppercase text-xs text-white">
          No data available right now... Please try again later!
        </div>
      </div>
    </div>
  );
}
