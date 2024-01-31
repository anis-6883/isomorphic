'use client';

import MatchScore from '@/app/(frontend)/(three-columns)/components/fixtureCardInfo/MatchScore';
import { INestedObject } from '@/types';
import moment from 'moment';
import Image from 'next/image';
import { IoStarOutline } from 'react-icons/io5';

export function UpcomingMatch({ homeMatchResponse, awayMatchResponse }:{ homeMatchResponse:INestedObject; awayMatchResponse: INestedObject}) {
  return (
    <div className="m-4 text-[11px] md:w-full md:text-base">
      <h2 className="mx-5 text-white">Next 5 Matches</h2>
      <div className="grid gap-3 py-8 pb-14 md:grid-cols-2 md:pb-0">
        {/* Code for Home Matches */}
        <div className="rounded-2xl border-[1px] border-primary py-3 ">
          {homeMatchResponse?.data.upcoming.slice(0, 5).map((data:INestedObject) => (
            <div key={data?.id} className="mb-4">
              <p className="my-2 px-4 text-secondary">
                {moment
                  .unix(data?.starting_at_timestamp)
                  .local()
                  .format('DD MMM YYYY')}
              </p>
              <div className="relative grid bg-[#1E293B] px-2 py-1 md:grid-cols-5 lg:px-0">
                <div className="my-auto">
                  <MatchScore match={data} large={false} />
                </div>
                <div className="col-span-3 md:col-span-4">
                  <div className="flex justify-between pb-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={`${data?.participants[0]?.image_path}`}
                          alt="team one"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="h-4 w-4"
                        />
                      </div>
                      <h2>{data?.participants[0]?.name}</h2>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={`${data?.participants[1]?.image_path}`}
                          alt="team two"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="h-4 w-4"
                        />
                      </div>
                      <h2>{data?.participants[1]?.name}</h2>
                    </div>
                  </div>
                </div>
                <div className="absolute right-20 top-6 mx-auto my-auto justify-self-start md:top-5">
                  <div>
                    <IoStarOutline className="text-xl text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Code for Away Matches */}
        <div className="rounded-2xl border-[1px] border-primary py-3">
          {awayMatchResponse?.data.upcoming.slice(0, 5).map((data:INestedObject) => (
            <div key={data?.id} className="mb-4">
              <p className="my-2 px-4 text-secondary">
                {moment
                  .unix(data?.starting_at_timestamp)
                  .local()
                  .format('DD MMM YYYY')}
              </p>
              <div className="relative grid bg-[#1E293B] px-2 py-1 md:grid-cols-5 lg:px-0">
                <div className="my-auto ">
                  <MatchScore match={data} large={false}/>
                </div>
                <div className="col-span-3 md:col-span-4">
                  <div className="flex justify-between pb-2 text-gray-400">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={`${data?.participants[0]?.image_path}`}
                          alt="team one"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="h-4 w-4"
                        />
                      </div>
                      <h2>{data?.participants[0]?.name}</h2>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          src={`${data?.participants[1]?.image_path}`}
                          alt="team two"
                          height={0}
                          width={0}
                          sizes="100vw"
                          className="h-4 w-4"
                        />
                      </div>
                      <h2>{data?.participants[1]?.name}</h2>
                    </div>
                  </div>
                </div>
                <div className="absolute right-20 top-6 mx-auto my-auto justify-self-start md:top-5">
                  <div>
                    <IoStarOutline className="text-xl text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
