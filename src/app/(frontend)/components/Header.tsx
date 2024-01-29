'use client';

import { routes } from '@/config/routes';
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
import './header.css';
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
              className="absolute m-2 block w-12 animate-pulse lg:hidden"
            />
          </Link>
          <div className=" mx-auto flex max-w-[1200px] items-center justify-end py-4">
            <div className="flex gap-8 ">
              <div className="flex justify-end gap-4">
                <Link
                  href="/"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
                >
                  <FaFacebookF className="text-sm" />
                </Link>
                <Link
                  href="/"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
                >
                  <IoLogoInstagram className="text-base" />
                </Link>
                <Link
                  href="/"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
                >
                  <CiYoutube className="text-base" />
                </Link>
              </div>
              <div className="flex gap-8">
                {session ? (
                  <label
                    className="cursor-pointer text-blue-500 hover:text-white"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </label>
                ) : (
                  <Link
                    href={routes.signIn}
                    className="cursor-pointer text-secondary transition-all duration-150 ease-in hover:text-white"
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
                      width={24}
                    />
                  </div>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="">
                      <IoIosArrowDown className="text-sm text-white" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[2000] mt-4 w-52 rounded-md bg-white p-2"
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

        <svg
          className="editorial"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
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
          <div className="relative mx-auto w-full py-4 ">
            <div className="absolute inset-0 z-40  origin-bottom-right transform  bg-[#0052B5]"></div>
            <div className="relative  z-50 mx-auto max-w-[1200px]">
              <div className="flex items-center justify-between ">
                <Link href="/" className=" flex items-center">
                  <Image
                    src="/images/asia-sport-logo-white.svg"
                    alt="team two"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="absolute w-24 animate-pulse"
                  />
                </Link>
                <ul className="flex items-center gap-3 text-lg text-white md:gap-7">
                  <Link
                    className={` ${
                      pathname === '/'
                        ? "relative text-white after:absolute after:left-[50%] after:top-4 after:block after:text-white after:content-['_-']"
                        : ' hover:text-white'
                    } transition-all duration-150 ease-in`}
                    href="/"
                  >
                    Matches
                  </Link>
                  <Link
                    className={` ${
                      pathname === '/highlights'
                        ? "relative text-white after:absolute after:left-[50%] after:top-4 after:text-white after:content-['_-']"
                        : ' hover:text-gray-700'
                    } transition-all duration-150 ease-in`}
                    href="/highlights"
                  >
                    Highlights
                  </Link>
                  <Link
                    className={` ${
                      pathname === '/news'
                        ? "relative text-white after:absolute after:left-[50%] after:top-4 after:text-white after:content-['_-']"
                        : 'hover:text-gray-700'
                    } transition-all duration-150 ease-in`}
                    href="/news"
                  >
                    News
                  </Link>
                  <Link
                    className={` ${
                      pathname === '/favorites'
                        ? "relative text-white after:absolute after:left-[50%] after:top-4 after:text-white after:content-['_-']"
                        : 'hover:text-gray-700'
                    } transition-all duration-150 ease-in`}
                    href="/favorites"
                  >
                    Favorites
                  </Link>
                </ul>
              </div>
            </div>
          </div>
          <div className="block sm:hidden">
            <div className="flex h-[75px] items-center justify-between bg-[#0052B5] p-3">
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
