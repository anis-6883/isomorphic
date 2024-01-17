'use client';

import Image from 'next/image';
import DatePicker from './DatePicker';

export default function TabHeader() {
  return (
    <div className="mx-auto mb-1 mt-4 max-w-screen-xl  ">
      <div className=" grid h-20 grid-cols-12 content-center">
        <div className="col-span-3 flex items-center justify-start gap-4 text-white">
          <div className="flex items-center gap-1">
            <Image
              src="/images/football-icon.png"
              alt="football logo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-4 w-4"
            />
            <h2 className="text-secondary">Football</h2>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/images/ball-icon.png"
              alt="cricket logo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-4 w-4"
            />
            <h2>Cricket</h2>
          </div>
        </div>
        <div className="col-span-6">
          <div>
            <DatePicker live={true} />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
