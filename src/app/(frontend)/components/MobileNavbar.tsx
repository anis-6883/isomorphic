'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCrown, FaRegNewspaper } from 'react-icons/fa';
import { IoStarSharp } from 'react-icons/io5';
import { PiVideoLight } from 'react-icons/pi';

export const MobileNavbar = () => {
  const pathname = usePathname();
  const isCurrentPath = (path: string) => pathname.includes(path);

  return (
    <div className="mobile_menu_bar fixed -bottom-2 left-0 mt-16 block h-20 w-full bg-[#061728] pb-5 lg:hidden ">
      <div className="flex flex-wrap justify-around p-4 ">
        <div className="flex flex-col justify-center">
          <Link
            className={` ${
              pathname === '/' || isCurrentPath('/match')
                ? "relative text-green-400 after:absolute after:left-11 after:top-4 after:text-white after:content-['']"
                : 'text-white '
            }`}
            href="/"
          >
            <div className="flex justify-center">
              {pathname === '/' ? (
                <div>
                  <Image
                    src="/images/football (12).png"
                    alt="football logo"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-5 w-5"
                  />
                </div>
              ) : (
                <div>
                  <Image
                    src="/images/football (12).png"
                    alt="football logo"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-5 w-5"
                  />
                </div>
              )}
            </div>
            <div className="font-xs">
              <small className="text-center uppercase">matches</small>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <Link
            className={` ${
              pathname === '/favorites'
                ? "relative text-green-400 after:absolute after:left-11  after:top-4 after:text-white after:content-['']"
                : 'text-white'
            }`}
            href="/favorites"
          >
            <div className="flex justify-center">
              {pathname === '/favorites' ? (
                <div>
                  <IoStarSharp className="text-2xl font-extrabold text-green-400" />
                </div>
              ) : (
                <div>
                  <IoStarSharp className="text-2xl font-extrabold" />
                </div>
              )}
            </div>
            <div className="font-xs">
              <small className="text-center uppercase">Favorites</small>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <Link
            className={` ${
              pathname === '/watch'
                ? "relative text-green-400 after:absolute after:left-11 after:top-4 after:text-white after:content-['']"
                : 'text-white'
            }`}
            href="/watch"
          >
            <div className="flex justify-center">
              {pathname === '/watch' ? (
                <div>
                  <PiVideoLight className="text-2xl font-extrabold text-green-400" />
                </div>
              ) : (
                <div>
                  <PiVideoLight className="text-2xl font-extrabold" />
                </div>
              )}
            </div>
            <div className="font-xs">
              <small className="text-center uppercase">Watch</small>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <Link
            className={` ${
              pathname === '/news'
                ? "relative text-green-400 after:absolute after:left-11 after:top-4 after:text-white after:content-['']"
                : 'text-white'
            }`}
            href="/news"
          >
            <div className="flex justify-center">
              {pathname === '/news' ? (
                <div>
                  <FaRegNewspaper className="text-2xl text-green-400" />
                </div>
              ) : (
                <div>
                  <FaRegNewspaper className=" text-2xl" />
                </div>
              )}
            </div>
            <div className="font-xs">
              <small className="text-center uppercase">News</small>
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center">
          <Link
            className={` ${
              pathname === '/subscription'
                ? "relative text-green-400 after:absolute after:left-11 after:top-4 after:text-white after:content-['']"
                : 'text-white'
            }`}
            href="/subscription"
          >
            <div className="flex justify-center">
              <div>
                <FaCrown className="text-2xl text-yellow-400" />
              </div>
            </div>
            <div className="font-xs">
              <small className="text-center uppercase">Premium</small>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
