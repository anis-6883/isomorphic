import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';

export default function TeamOverview({ teamDetails, teamTransfers }) {
  return (
    <>
      <div className="mb-5 rounded-2xl border-[1px] border-primary p-5 text-white">
        <h4 className="mb-4 text-lg font-semibold text-secondary">General</h4>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Name</span>
          <span>{teamDetails?.name}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Country</span>
          <span>{teamDetails?.country?.name}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Founded</span>
          <span>{teamDetails?.founded}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Venue</span>
          <span>{teamDetails?.venue?.name}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Venue Surface</span>
          <span>
            {teamDetails?.venue?.surface.charAt(0).toUpperCase() +
              teamDetails?.venue?.surface.slice(1)}
          </span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Venue Address</span>
          <span>{teamDetails?.venue?.address}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Venue City</span>
          <span>{teamDetails?.venue?.city?.name}</span>
        </div>
        <div className="mb-4 flex items-center justify-between text-lg font-light">
          <span>Venue Capacity</span>
          <span>{teamDetails?.venue?.capacity}</span>
        </div>
      </div>
      <div className="rounded-2xl border-[1px] border-primary py-5 text-white">
        <h4 className="mx-5 mb-2 text-lg font-semibold text-secondary">
          Transfer In Players
        </h4>
        <div className="h-[350px] overflow-y-scroll p-5">
          {teamTransfers?.map((transfer) => (
            <div
              key={transfer?.id}
              className="my-3 grid grid-cols-12 items-center"
            >
              <div className="col-span-5">
                <Link
                  className="flex items-center "
                  href={`/player/${getSlugify(
                    transfer?.player?.display_name
                  )}/${transfer?.player?.id}`}
                >
                  <Image
                    src={transfer?.player?.image_path}
                    alt={transfer?.player?.display_name}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="mr-4 h-7 w-7 rounded-full bg-white ring-1 ring-gray-100"
                  />
                  <span>{transfer?.player?.display_name}</span>
                </Link>
              </div>
              <div className="col-span-5">{transfer?.fromteam?.name}</div>
              <div className="col-span-2">{transfer?.date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
