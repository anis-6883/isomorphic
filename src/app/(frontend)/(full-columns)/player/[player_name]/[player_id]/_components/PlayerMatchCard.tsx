
import { INestedObject } from '@/types';
import getShortName from '@/utils/get-short-name';
import getSlugify from '@/utils/get-slugify';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosFootball } from 'react-icons/io';

// Constants for Type IDs
const GOALS_TYPE_ID = 52;
const RATING_TYPE_ID = 118;
const MINUTES_TYPE_ID = 119;

export default function PlayerMatchCard({ match, playerData } : {match:INestedObject , playerData:INestedObject}) {
  const [isStarClicked, setIsStarClicked] = useState(false);

  const findPlayerLineUp = match?.lineups?.find(
    (lineup : INestedObject) => lineup?.player_id === playerData?.id
  );

  const goals = findPlayerLineUp?.details?.find(
    (element: INestedObject) => element.type_id === GOALS_TYPE_ID
  );

  const rating = findPlayerLineUp?.details?.find(
    (element: INestedObject) => element.type_id === RATING_TYPE_ID
  );

  const minutes = findPlayerLineUp?.details?.find(
    (element : INestedObject) => element.type_id === MINUTES_TYPE_ID
  );

  const { participants, scores, state } = match;

  const homeTeam = participants.find(
    (participant: INestedObject) => participant.meta.location === 'home'
  );
  const awayTeam = participants.find(
    (participant: INestedObject) => participant.meta.location === 'away'
  );

  // Get the current score for home and away teams
  const homeScore =
    scores.find((score: INestedObject) => score.participant_id === homeTeam.id)?.score.goals ||
    0;
  const awayScore =
    scores.find((score: INestedObject) => score.participant_id === awayTeam.id)?.score.goals ||
    0;

  const handleButtonClick = (event: INestedObject) => {
    event.preventDefault();
    setIsStarClicked(!isStarClicked);
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4 skew-y-[0.5deg]">
        <div className="flex items-center gap-2">
          <Image
            src={match?.league?.image_path}
            alt="team image"
            height={0}
            width={0}
            sizes="100vw"
            className="w-10 h-10 p-0.5 ring-1 ring-black rounded-full mr-3"
          />
          <h4 className="text-md font-semibold">{match?.league?.name}</h4>
        </div>
        <div>
          {moment
            .unix(match?.starting_at_timestamp)
            .local()
            .format('DD MMMM YYYY')}
        </div>
      </div>
      <div className="bg-base-100 p-4">
        <div>
          <div className="relative w-8/12 mx-auto skew-y-[0.5deg]">
            <Link
              href={`/match/details/${getSlugify(
                homeTeam.name
              )}-vs-${getSlugify(awayTeam.name)}/${match?.id}`}
              className="w-full"
            >
              <div className={`h-auto w-full mb-1`}>
                <div className={`p-2 grid grid-cols-12 items-center gap-2`}>
                  <p className="col-span-1 text-gray-400 text-sm font-semibold">
                    {state?.short_name}
                  </p>
                  <div className="col-span-3 flex items-center">
                    <Image
                      src={homeTeam.image_path}
                      alt={homeTeam.name}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
                    />
                    <h4 className="text-sm font-semibold uppercase">
                      {getShortName(homeTeam.name, homeTeam?.short_code)}
                    </h4>
                  </div>

                  <div
                    className={`col-span-3 w-16 h-16 rounded-full flex text-sm gap-1 text-white items-center justify-center mx-auto bg-black`}
                  >
                    <p>{homeScore}</p>
                    <p>-</p>
                    <p>{awayScore}</p>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <Image
                      src={awayTeam.image_path}
                      alt={awayTeam.name}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
                    />
                    <h4 className="text-sm font-semibold uppercase">
                      {getShortName(awayTeam.name, awayTeam?.short_code)}
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
        <div className="flex items-center justify-between  w-8/12 mx-auto skew-y-[0.5deg]">
          <div className="flex items-center gap-2">
            <IoIosFootball className="text-4xl text-black" />
            <span>{goals?.data?.value || 0}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <span>{minutes?.data?.value || '-'}</span>
              <h4>Min</h4>
            </div>

            <div className="text-center font-semibold bg-red-600 text-white px-2">
              <span>{rating?.data?.value || '-'}</span>
              <h4>Rating</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
