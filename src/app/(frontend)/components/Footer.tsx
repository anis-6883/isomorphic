import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { CiYoutube } from 'react-icons/ci';
import {
  FaApple,
  FaFacebookF,
  FaGooglePlay,
  FaRegCopyright,
} from 'react-icons/fa';
import { IoLogoInstagram } from 'react-icons/io5';
import { MobileNavbar } from './MobileNavbar';

export default function Footer() {
  const updateYear = moment().format('YYYY [escaped] YYYY').split(' ');

  return (
    <div className="bg-accent">
      <div className=" hidden lg:block">
        <div className="mx-auto mt-5 grid max-w-[1200px] select-none grid-cols-2 gap-10">
          <div className="col-span-2 md:col-span-1">
            <p className="font-extralight text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              nisi itaque suscipit ipsum reiciendis hic quibusdam quae impedit
              fuga ullam perferendis aut veniam quidem repudiandae quos
              cupiditate! Rerum, placeat hic! Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Rerum odit recusandae saepe ducimus
              animi, asperiores iure unde vero voluptas? Doloremque veniam non
              aspernatur nulla harum, quas deserunt cupiditate quis adipisci.
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-3 text-xl font-light text-white">Disclaimer</h4>
            <p className="font-extralight text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas,
              nisi itaque suscipit ipsum reiciendis hic quibusdam quae impedit
              fuga ullam perferendis aut veniam quidem repudiandae quos
              cupiditate! Rerum, placeat hic!
            </p>
          </div>
        </div>
        <footer className="footer mx-auto max-w-screen-xl p-10 text-gray-200">
          <nav className="mx-auto md:mx-0">
            <div>
              <div className="flex items-center gap-1">
                <Image
                  src="/images/asia-sport-logo.svg"
                  alt="team two"
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="mr-3 w-16"
                />
                <h2 className="text-xl font-bold text-secondary">
                  ASIA SPORTS
                </h2>
              </div>
              <div className="mt-6 select-none text-center text-base md:text-start">
                <h2>Asia Sports is the best</h2>
                <h2>Football App</h2>
              </div>
            </div>
          </nav>
          <nav className="mx-auto space-y-2 text-base font-extralight md:mx-0">
            <Link href="/" className="mx-auto md:mx-0">
              Matches
            </Link>
            <Link href="/favorites" className="mx-auto md:mx-0">
              Favorites
            </Link>
            <Link href="/news" className="mx-auto md:mx-0">
              News
            </Link>
            <Link href="/highlights" className="mx-auto md:mx-0">
              Highlights
            </Link>
          </nav>
          <nav className="mx-auto space-y-2 md:mx-0">
            <h4 className="mx-auto select-none text-lg font-extralight md:mx-0">
              Get the App
            </h4>
            <div className="mx-auto flex gap-4 md:mx-0">
              <Link
                href="/"
                className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
              >
                <FaApple className="text-xl" />
              </Link>
              <Link
                href="/"
                className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
              >
                <FaGooglePlay className="text-xl" />
              </Link>
            </div>
            <Link href="/" className="select-none text-lg font-extralight">
              Privacy & Policy
            </Link>
          </nav>
          <nav className="mx-auto md:mx-0">
            <h4 className="mx-auto select-none text-lg font-extralight md:mx-0">
              Follow Us On
            </h4>
            <div className="flex gap-4">
              <Link
                href="/"
                className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
              >
                <FaFacebookF className="text-sm" />
              </Link>
              <Link
                href="/"
                className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
              >
                <IoLogoInstagram className="text-xl" />
              </Link>
              <Link
                href="/"
                className="flex h-8 w-8 items-center justify-center rounded-full p-2 text-white ring-1 ring-blue-500 transition-all duration-150 ease-in  hover:text-secondary"
              >
                <CiYoutube className="text-xl" />
              </Link>
            </div>
          </nav>
        </footer>
        <hr className="mx-auto mt-3 max-w-screen-xl border-gray-200 sm:mx-auto lg:my-4 dark:border-gray-700" />
        {/* copyright section */}
        <div className="my-4 flex justify-center">
          <span className="text-md flex select-none items-center gap-1 text-gray-500 sm:text-center">
            <p className="text-center">
              <span className="mx-1 mb-1">
                <FaRegCopyright className=" inline-block text-sm  text-gray-500" />
              </span>
              Copyright {updateYear[2]} ASIA SPORTS | All Rights Reserved.
            </p>
          </span>
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
}
