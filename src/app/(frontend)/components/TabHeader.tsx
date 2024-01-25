'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DatePicker from './DatePicker';

export default function TabHeader() {
  const pathname = usePathname();
  return (
    <div className="mx-auto mb-1 mt-4 max-w-screen-xl text-xs lg:text-base ">
      <div className=" grid h-20 grid-cols-12 content-center items-center ">
        <div className="col-span-3 hidden flex-col items-center justify-start gap-2 text-white lg:flex lg:flex-row lg:gap-4 ">
          <div className="flex items-center gap-1 ps-1">
            <Image
              src="/images/football (12).png"
              alt="football logo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-4 w-4"
            />
            <Link href="/">
              <h2
                className={`${
                  pathname === '/' ? 'text-secondary' : 'hover:text-secondary'
                }`}
              >
                Football
              </h2>
            </Link>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/images/ball (1).png"
              alt="cricket logo"
              height={0}
              width={0}
              sizes="100vw"
              className="h-4 w-4"
            />
            <Link href="/cricket">
              <h2
                className={`${
                  pathname === '/cricket'
                    ? 'text-secondary'
                    : 'hover:text-secondary'
                }`}
              >
                Cricket
              </h2>
            </Link>
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
