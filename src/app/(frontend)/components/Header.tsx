'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { CiYoutube } from 'react-icons/ci';
import { FaFacebookF } from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io5';
import './header.css'
export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/',
    });
    toast.success('Sign Out Successfully!');
  };

  return (
    <header>
      <div className="">
        {/* First header */}
        <div className=" mx-2 lg:mx-0">
          <Link href="/" className=" ">
            <Image
              src="/images/asia-sport-logo-white.svg"
              alt="team two"
              height={0}
              width={0}
              sizes="100vw"
              className="w-12 absolute animate-pulse m-2 block lg:hidden"
            />
          </Link>
          <div className=" flex items-center py-4 justify-end mx-auto max-w-[1200px]">
            <div className="flex gap-8 ">
              <div className="flex justify-end gap-4">
                <Link
                  href="/"
                  className="w-6 h-6 rounded-full flex justify-center items-center transition-all ease-in duration-150 ring-1 ring-blue-500 text-white  hover:text-secondary"
                >
                  <FaFacebookF className="text-sm" />
                </Link>
                <Link
                  href="/"
                  className="w-6 h-6 rounded-full flex justify-center items-center transition-all ease-in duration-150 ring-1 ring-blue-500 text-white  hover:text-secondary"
                >
                  <IoLogoInstagram className="text-base" />
                </Link>
                <Link
                  href="/"
                  className="w-6 h-6 rounded-full flex justify-center items-center transition-all ease-in duration-150 ring-1 ring-blue-500 text-white  hover:text-secondary"
                >
                  <CiYoutube className="text-base" />
                </Link>
              </div>
              <div className="flex gap-8">
                {session ? (
                  <label
                    className="text-blue-500 hover:text-white cursor-pointer"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </label>
                ) : (
                  <Link
                    href="/signin"
                    className="text-secondary hover:text-white cursor-pointer transition-all ease-in duration-150"
                  >
                    Sign in
                  </Link>
                )}

                <div className="flex items-center">
                  <div>
                    <Image
                      src="/images/earth-americas.png"
                      alt="team two"
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="w-6 "
                    />
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                      <IoIosArrowDown className="text-white text-sm" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[2000] p-2 bg-white rounded-md w-52 mt-4"
                    >
                      <li>
                        <a>Item 1</a>
                      </li>
                      <li>
                        <a>Item 2</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg className="editorial"
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         viewBox="0 24 150 28"
         preserveAspectRatio="none">
      <defs>
        <path id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z" />
      </defs>
      <g className="parallax1">
        <use xlinkHref="#gentle-wave" x="50" y="3" fill="#f461c1" />
      </g>
      <g className="parallax2">
        <use xlinkHref="#gentle-wave" x="50" y="0" fill="#4579e2" />
      </g>
      <g className="parallax3">
        <use xlinkHref="#gentle-wave" x="50" y="9" fill="#122948" />
      </g>
     
    </svg>


        {/* Second Header */}

        <div className="hidden lg:block">
          <div className="relative w-full mx-auto py-4 ">
            <div className="absolute z-40 inset-0  bg-[#0052B5] transform  origin-bottom-right"></div>
            <div className="relative  z-50 mx-auto max-w-[1200px]">
              <div className="flex items-center justify-between ">
                <Link href="/" className=" flex items-center">
                  <Image
                    src="/images/asia-sport-logo-white.svg"
                    alt="team two"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="w-24 absolute animate-pulse"
                  />
                </Link>
                <ul className="flex items-center gap-3 md:gap-7 text-lg text-white">
                  <Link
                    className={` ${
                      pathname === '/'
                        ? "text-white after:block relative after:content-['_-'] after:absolute after:top-4 after:text-white after:left-[50%]"
                        : ' hover:text-white'
                    } transition-all ease-in duration-150`}
                    href="/"
                  >
                    Matches
                  </Link>
                  <Link
                    className={` ${
                      pathname === '/highlights'
                        ? "text-white relative after:content-['_-'] after:absolute after:top-4 after:text-white after:left-[50%]"
                        : ' hover:text-gray-700'
                    } transition-all ease-in duration-150`}
                    href="/highlights"
                  >
                    Highlights
                  </Link>
                  <Link
                    className={` ${
                      pathname === '/news'
                        ? "text-white relative after:content-['_-'] after:absolute after:top-4 after:text-white after:left-[50%]"
                        : 'hover:text-gray-700'
                    } transition-all ease-in duration-150`}
                    href="/news"
                  >
                    News
                  </Link>
                  <Link
                    className={` ${
                      pathname === '/favorites'
                        ? "text-white relative after:content-['_-'] after:absolute after:top-4 after:text-white after:left-[50%]"
                        : 'hover:text-gray-700'
                    } transition-all ease-in duration-150`}
                    href="/favorites"
                  >
                    Favorites
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="block sm:hidden">
            <div className="flex items-center justify-between h-[75px] bg-[#0052B5] p-3">
              <h2 className="text-xl font-bold text-[#55B0FF]">ASIA SPORTS</h2>
              <button>
                <HiMenuAlt2 className="text-2xl text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
