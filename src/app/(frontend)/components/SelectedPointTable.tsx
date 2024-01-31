'use client';

import { useGetSelectedPointTableQuery } from '@/features/front-end/league/leagueApi';
import { IIteam, INestedObject, Team } from '@/types';
import getShortName from '@/utils/get-short-name';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';

export default function SelectedPointTable() {
  const {
    data: selectedPointTable,
    isLoading,
    isError,
    isFetching,
  } = useGetSelectedPointTableQuery(undefined);

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (isLoading || isFetching) {
    return (
      <div className="mb-2 space-y-4 rounded-2xl border-[1px] border-primary p-2">
        <div className="h-16 w-full animate-pulse rounded-md bg-neutral"></div>
        {arr.map((shimmer) => (
          <div className="grid grid-cols-12 gap-3" key={shimmer}>
            <div
              key={shimmer}
              className="col-span-6 h-6 w-full animate-pulse rounded-md bg-neutral"
            ></div>
            <div className="col-span-2 h-6 w-full animate-pulse rounded-md bg-neutral"></div>
            <div className="col-span-2 h-6 w-full animate-pulse rounded-md bg-neutral"></div>
            <div className="col-span-2 h-6 w-full animate-pulse rounded-md bg-neutral"></div>
          </div>
        ))}
      </div>
    );
  }

  if (selectedPointTable?.status) {
    return (
      <div className="flex flex-col items-center rounded-2xl border-[1px] border-primary">
        <div className="h-16 w-full">
          <div className="flex h-full items-center justify-between p-4">
            <h4 className="text-sm font-light uppercase text-white">
              {selectedPointTable?.data.league_name}
            </h4>

            <Image
              src={selectedPointTable?.data.league_image}
              alt={selectedPointTable?.data.league_name}
              height={0}
              width={0}
              sizes="100vw"
              className="mr-4 h-8 w-8 rounded-full bg-white p-1"
            />
          </div>
        </div>
        <div className=" h-auto w-full rounded-2xl">
          <div className="p-2">
            <div className="mb-2 grid grid-cols-8 items-center pb-2 text-sm text-white">
              <p className="col-span-1 text-xs font-light uppercase">#</p>
              <div className="col-span-4 flex items-center">
                <p className="text-xs font-light uppercase">Team</p>
              </div>
              <p className="col-span-1 text-center text-xs font-light uppercase">
                PL
              </p>
              <p className="col-span-1 text-center text-xs font-light uppercase">
                GD
              </p>
              <p className="col-span-1 text-center text-xs font-light uppercase">
                PTS
              </p>
            </div>

            {selectedPointTable?.data?.standings?.map((team :INestedObject, index: number) => (
              <Link
                key={team.id}
                href={`/team/${getSlugify(team?.participant?.name)}/${team
                  ?.participant?.id}`}
              >
                <div
                  key={team.id}
                  className="mb-2 grid grid-cols-8 items-center gap-3 text-xs text-black"
                >
                  <p className="col-span-1 text-xs font-light text-white">
                    {index + 1}
                  </p>
                  <div className="col-span-4 flex items-center">
                    <Image
                      src={team?.participant?.image_path}
                      alt={team?.participant?.name}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="mr-4 h-6 w-6 rounded-full bg-white p-1"
                    />
                    <p className="text-xs font-light text-white">
                      {team?.participant?.name
                        ? getShortName(team?.participant?.name)
                        : ''}
                    </p>
                  </div>
                  <p className="col-span-1 text-xs font-light text-white">
                    {team?.details?.find((item : IIteam | undefined) => item?.type?.id === 129)?.value}
                  </p>
                  <p className="col-span-1 text-xs font-light text-white">
                    {team?.details?.find((item : IIteam | undefined) => item?.type.id === 179)?.value}
                  </p>
                  <p className="col-span-1 text-xs font-light text-white">
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
    <div className="flex flex-col items-center rounded-2xl border-[1px] border-primary">
      <div className="h-16 w-full">
        <div className="flex h-full items-center justify-between p-4">
          <h4 className="text-xs font-light text-white">League Name</h4>

          <Image
            src="/images/team_placeholder.png"
            alt="league-image"
            height={0}
            width={0}
            sizes="100vw"
            className="mr-4 h-8 w-8 rounded-full bg-white p-1 ring-1 ring-primary"
          />
        </div>
      </div>
      <div className=" h-auto w-full rounded-2xl">
        <div className="p-2">
          <div className="mb-2 grid grid-cols-8 items-center border-b border-gray-300 pb-2 text-xs text-white">
            <p className="col-span-1 text-xs font-light uppercase">#</p>
            <div className="col-span-4 flex items-center">
              <p className="text-xs font-light uppercase">Team</p>
            </div>
            <p className="col-span-1 text-xs font-light uppercase">PL</p>
            <p className="col-span-1 text-xs font-light uppercase">GD</p>
            <p className="col-span-1 text-xs font-light uppercase">PTS</p>
          </div>
        </div>
        <div className="p-3 text-xs font-light uppercase text-white">
          No data available right now... Please try again later!
        </div>
      </div>
    </div>
  );
}
