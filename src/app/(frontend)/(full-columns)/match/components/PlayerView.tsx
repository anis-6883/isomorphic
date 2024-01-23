import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PlayerView({ player }) {
  const [bgColor, setBgColor] = useState('');

  let playerGoals = [];
  for (let i = 0; i < player?.playerGoals; i++) {
    playerGoals.push(i + 1);
  }
  let playerAssists = [];
  for (let i = 0; i < player?.playerAssists; i++) {
    playerAssists.push(i + 1);
  }

  useEffect(() => {
    let color;
    if (Number(player?.rating) >= 8.25) {
      color = '#1D8ADD';
    } else if (Number(player?.rating) > 7.5 && Number(player?.rating) < 9) {
      color = '#22B96B';
    } else {
      color = '#F67E1D';
    }
    setBgColor(color);
  }, []);

  return (
    <div className="relative flex h-10 w-20 flex-col items-center justify-center gap-0 text-xs md:h-20 md:w-20 md:gap-1">
      <Image
        width={0}
        height={0}
        src={player?.image}
        alt="goal keeper image"
        sizes="100vw"
        className="h-7 w-7 rounded-full p-0.5 md:h-10 md:w-10 "
      />
      <h4 className="text-center text-[8px] font-semibold md:text-xs">
        <span>{player?.name}</span>
      </h4>
      {/* ratings */}
      <div
        className={`bg-[${bgColor}] absolute right-[0.65rem] top-[-0.55rem] rounded-md px-1 md:right-1 md:top-1`}
      >
        <p className="my-auto text-[8px] text-white md:text-[10px]">
          {player?.rating}
        </p>
      </div>
      {/* goal */}
      <div className="absolute right-3 top-[0.75rem] md:right-3 md:top-7">
        <div className=" ">
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            {playerGoals?.map((goal, index) => (
              <div className="avatar border-none " key={index}>
                <div className="ms-3 w-3  md:w-4 ">
                  <Image
                    src="/icons/football-(10).png"
                    alt="football icon"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-1 w-1 rounded-full md:h-2 md:w-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* assists */}
      <div className="absolute right-[3rem] top-[1rem] md:top-8">
        <div className=" ">
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            {playerAssists?.map((assists, index) => (
              <div className="avatar border-none " key={index}>
                <div className="w-3 rounded-full  bg-white p-0 md:w-4 md:p-1">
                  <Image
                    src="/icons/shoe.png"
                    alt="football icon"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className=" h-1 w-1 rounded-full md:h-2 md:w-2 "
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* FoulCards */}
      <div className="absolute right-[3rem] top-1 md:right-[3rem] md:top-3">
        <div className=" ">
          <div className="avatar-group -space-x-6 rtl:space-x-reverse">
            {player?.playerYellowCards && (
              <div className="avatar border-none ">
                <div className="w-3 rounded-full bg-white p-0 md:w-5 md:p-1 ">
                  <div className="mx-auto my-auto mt-[2px] h-2 w-1 bg-[#FDCE26] md:mt-0 md:h-3 md:w-2"></div>
                </div>
              </div>
            )}
            {player?.playerRedCards && (
              <div className="avatar border-none ">
                <div className="w-3 rounded-full bg-white p-1 md:w-5">
                  <div className="mx-auto h-2 w-1 bg-[#E51B36] md:h-3  md:w-2"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
