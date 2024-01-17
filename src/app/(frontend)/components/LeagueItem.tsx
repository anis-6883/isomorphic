import { ILeague } from '@/types';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';

export default function LeagueItem({ league }: { league: ILeague }) {
  return (
    <div className="select-none">
      <Link
        href={`/league/${getSlugify(league?.name)}/${league?.id}`}
        className="mb-3 flex items-center"
      >
        <Image
          src={league?.image_path}
          alt={league?.name}
          height={0}
          width={0}
          sizes="100vw"
          className="mr-4 h-6 w-6 rounded-full bg-white p-1"
        />
        <p className="text-xs font-light text-white">{league?.name}</p>
      </Link>
    </div>
  );
}
