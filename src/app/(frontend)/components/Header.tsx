'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiYoutube } from 'react-icons/ci';
import { FaFacebookF } from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoLogoInstagram } from 'react-icons/io5';

export default function Header() {
  const pathname = usePathname();
  //   const { data: session } = useSession();

  //   const handleLogout = async () => {
  //     await signOut({
  //       redirect: false,
  //       callbackUrl: '/',
  //     });
  //     toast.success('Sign Out Successfully!');
  //   };

  return (
    <header>
      <div>
        {/* First header */}
        <div>
          <div className=" mx-auto flex max-w-screen-xl items-center justify-end py-4">
            <div className="flex gap-8 ">
              <div className="flex justify-end gap-4">
                <Link
                  href="/"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500  hover:text-secondary"
                >
                  <FaFacebookF className="text-sm" />
                </Link>
                <Link
                  href="/"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500  hover:text-secondary"
                >
                  <IoLogoInstagram className="text-base" />
                </Link>
                <Link
                  href="/"
                  className="flex h-6 w-6 items-center justify-center rounded-full text-white ring-1 ring-blue-500  hover:text-secondary"
                >
                  <CiYoutube className="text-base" />
                </Link>
              </div>
              <div className="flex gap-8">
                {/* {session ? (
                  <label className="text-blue-500 hover:text-white cursor-pointer">
                    sign out
                  </label>
                ) : ( */}
                <label
                  // onClick={() => window.authModal.showModal()}
                  className="cursor-pointer text-secondary hover:text-white"
                >
                  Sign in
                </label>
                {/* )} */}

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
                      <IoIosArrowDown className="text-xl text-white" />
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

        {/* Second Header */}

        <div className="relative mx-auto hidden w-full py-4 sm:block">
          <div className="absolute inset-0 z-40  origin-bottom-right transform  bg-[#0052B5]"></div>
          <div className="relative  z-50 mx-auto max-w-screen-xl">
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
                      ? "relative text-white after:absolute after:left-[50%] after:top-4 after:text-white after:content-['_-']"
                      : 'text-gray-300 hover:text-white'
                  }`}
                  href="/"
                >
                  Matches
                </Link>
                <Link
                  className={` ${
                    pathname === '/watch'
                      ? "relative text-white after:absolute after:left-11 after:top-4 after:text-white after:content-['_-']"
                      : 'text-gray-300 hover:text-white'
                  }`}
                  href="/watch"
                >
                  Highlights
                </Link>
                <Link
                  className={` ${
                    pathname === '/news'
                      ? "relative text-white after:absolute after:left-11 after:top-4 after:text-white after:content-['_-']"
                      : 'text-gray-300 hover:text-white'
                  }`}
                  href="/news"
                >
                  News
                </Link>
                <Link
                  className={` ${
                    pathname === '/favorites'
                      ? "relative text-white after:absolute after:left-11 after:top-4 after:text-white after:content-['_-']"
                      : 'text-gray-300 hover:text-white'
                  }`}
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
    </header>
  );
}
