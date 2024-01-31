
import { INestedObject, ISingleStanding } from '@/types';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface StandingTeamItemProps {
  singleStandings: INestedObject;
  index: number;
}

  export default function StandingTeamItem({ singleStandings, index}:StandingTeamItemProps) {
  return (
    <div
      key={singleStandings.teamName}
      className={`grid grid-cols-12 items-center text-[8px] lg:text-xs w-full py-3 font-light select-none text-white ${
        index % 2 === 0 && 'bg-slate-800'
      }`}
    >
      <div className="text-center">{singleStandings?.position}</div>
      <div className="col-span-3">
        <div>
          <Link
            href={`/team/${getSlugify(singleStandings.teamName)}/${
              singleStandings?.teamId
            }`}
            className="flex items-center"
          >
            <Image
              src={singleStandings?.teamImage}
              alt={singleStandings?.teamName}
              height={0}
              width={0}
              sizes="100vw"
              className="w-7 h-7 p-1 mr-0 lg:mr-4 rounded-full"
            />
            <p className="uppercase ">{singleStandings?.teamName}</p>
          </Link>
        </div>
      </div>
      <div className="text-center ">{singleStandings.GP}</div>
      <div className="text-center ">{singleStandings.W}</div>
      <div className="text-center">{singleStandings.D}</div>
      <div className="text-center">{singleStandings.L}</div>
      <div className="text-center">{singleStandings.GF}</div>
      <div className="text-center">{singleStandings.GA}</div>
      <div className="text-center">{singleStandings.GD}</div>
      <div className="text-center">{singleStandings.PTS}</div>
    </div>
  );
}
