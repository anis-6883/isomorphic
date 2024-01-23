'use client';
import { useEffect, useState } from 'react';
import { GiSoccerKick } from 'react-icons/gi';
import { PiSoccerBallFill } from 'react-icons/pi';

export default function MainLoading() {
  const numberOfBalls = 7;
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Increment the visible index, reset to 0 if it exceeds the total number of balls
      setVisibleIndex((prevIndex) => (prevIndex + 1) % numberOfBalls);
    }, 500); // Adjust the timeout duration as needed

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, [visibleIndex]);

  return (
    <div className="mt-10">
      <div className="relative p-5">
        <GiSoccerKick className="absolute top-20 text-8xl text-secondary" />
        <div className="absolute left-[110px] top-[146px] flex">
          {Array.from({ length: numberOfBalls }, (_, index) => (
            <PiSoccerBallFill
              key={index}
              className={`${
                index === visibleIndex ? 'opacity-100' : 'opacity-0'
              }  animate-spin text-xl text-secondary`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
