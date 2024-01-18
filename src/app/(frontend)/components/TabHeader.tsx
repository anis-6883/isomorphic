'use client';

import Image from 'next/image';
import DatePicker from './DatePicker';

export default function TabHeader() {
  return (
    <div className="mx-auto max-w-screen-xl mt-4 mb-1 text-xs lg:text-base ">
      <div className=" grid grid-cols-12 content-center items-center h-20 ">
        <div className="col-span-3 text-white hidden lg:flex flex-col lg:flex-row justify-start items-center gap-2 lg:gap-4 ">
          <div className="flex items-center gap-1 ps-1">
            <Image
              src="/images/football (12).png"
              alt="football logo"
              height={0}
              width={0}
              sizes="100vw"
              className="w-4 h-4"
            />
            <h2 className="text-secondary">Football</h2>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/images/ball (1).png"
              alt="cricket logo"
              height={0}
              width={0}
              sizes="100vw"
              className="w-4 h-4"
            />
            <h2>Cricket</h2>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 ">
          
            <div>
              <DatePicker live={true} />
            </div>
      
          <div></div>
        </div>
      </div>
    </div>
  );
}
