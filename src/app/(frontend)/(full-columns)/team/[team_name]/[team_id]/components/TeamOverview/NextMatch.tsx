
import MatchStates from '@/app/(frontend)/(full-columns)/match/components/MatchStates';
import getShortName from '@/utils/get-short-name';
import getSlugify from '@/utils/get-slugify';
import { AnyCnameRecord } from 'dns';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function NextMatch({ nextMatch }:{nextMatch:any}) {
  const [isStarClicked, setIsStarClicked] = useState(false);

  const handleButtonClick = (event :any) => {
    event.preventDefault();
    setIsStarClicked(!isStarClicked);
  };

  return (
    <div className="bg-base-100 p-5 rounded-2xl">
      <div className="">
        <div className="flex items-end justify-between ">
          <div className="text-start">
            <h4 className="text-xl font-semibold">Next Match</h4>
            <p className="text-xs font-semibold">
              {moment
                .unix(nextMatch?.starting_at_timestamp)
                .local()
                .format('DD MMMM YYYY')}
            </p>
          </div>

          <h6 className=" font-semibold">Premier League</h6>
        </div>
        <div className="relative w-full">
          <Link
            href={`/match/preview/${getSlugify(
              nextMatch?.participants[0]?.name
            )}-vs-${getSlugify(nextMatch?.participants[1]?.name)}/${
              nextMatch?.id
            }`}
            className="w-full "
          >
            <div className={`bg-base-100 h-auto w-full -skew-y-[0.5deg] mb-1 `}>
              <div
                className={`skew-y-[0.5deg] p-2 grid grid-cols-12 items-center gap-2`}
              >
                <p className="col-span-1 text-gray-400 text-sm font-semibold">
                  {nextMatch?.state?.short_name}
                </p>
                <div className="col-span-3 flex items-center">
                  <Image
                    src={nextMatch?.participants[0]?.image_path}
                    alt="team one"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
                  />
                  <h4 className="text-sm font-semibold uppercase">
                    {getShortName(
                      nextMatch?.participants[0]?.name,
                      nextMatch?.participants[0]?.short_code
                    )}
                  </h4>
                </div>

                <MatchStates matchData={nextMatch} />
                <div className="col-span-3 flex items-center">
                  <Image
                    src={nextMatch?.participants[1]?.image_path}
                    alt="team two"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
                  />
                  <h4 className="text-sm font-semibold uppercase">
                    {getShortName(
                      nextMatch?.participants[1]?.name,
                      nextMatch?.participants[1]?.short_code
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </Link>
          <button
            className="col-span-2 mx-auto absolute top-6 right-5"
            onClick={handleButtonClick}
          >
            <svg
              className={`w-6 h-6 ${isStarClicked ? 'text-green-500' : ''}`}
              viewBox="0 0 15 15"
              version="1.1"
              id="star"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="path4749-2-8-2"
                d="M7.5,0l-2,5h-5l4,3.5l-2,6l5-3.5&#xA;&#x9;l5,3.5l-2-6l4-3.5h-5L7.5,0z"
                fill={`${isStarClicked ? '#f39c12' : '#fffffff'}`}
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
