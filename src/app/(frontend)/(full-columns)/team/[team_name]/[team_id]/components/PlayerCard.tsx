import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';

export default function PlayerCard({ player }:{player:any}) {
  return (
    <Link
      href={`/player/${getSlugify(player?.displayName)}/${player?.playerId}`}
      className="my-2 flex flex-col items-center justify-center gap-2 text-white"
    >
      <Image
        width={50}
        height={50}
        alt={player?.displayName}
        src={player?.imagePath}
        className="h-20 w-20 rounded-full bg-white p-1"
      />
      <div>
        <h4 className="mb-1 text-center text-sm font-semibold">
          {player?.displayName}
        </h4>
        <div className="flex items-center justify-center gap-1">
          <Image
            width={0}
            height={0}
            alt={player?.countryName}
            src={player?.countryImagePath}
            sizes="100vw"
            className="h-5 w-8"
          />
          <p className="text-xs">{player?.countryName}</p>
        </div>
      </div>
    </Link>
  );
}
