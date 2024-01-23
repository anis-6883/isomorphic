
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import getSlugify from '@/utils/get-slugify';
import { IMatch } from '@/types';
import MatchState from '../(three-columns)/components/fixtureCardInfo/MatchState';
import getShortName from '@/utils/get-short-name';
// import useGetUserProfile from '@/hooks/use-get-userprofile';
import MatchScore from '../(three-columns)/components/fixtureCardInfo/MatchScore';
import BetDroopDown, { BetMobileModal } from '../(three-columns)/components/fixtureCardInfo/BetDroopDown';
import Probability from '../(three-columns)/components/fixtureCardInfo/Probability';
import { number } from 'prop-types';
import { useGetSelectedPointTableQuery } from '@/features/front-end/league/leagueApi';

const FixtureCard = ({ match, large }:{match:IMatch ; large:boolean}) => {
  const { data: session } = useSession();
  // const { userProfile, refetchProfile } = useGetUserProfile(session);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  // const favoriteSelected =
  //   userProfile?.favorites?.matches.some(
  //     (item) => parseInt(item.id) === parseInt(match.id)
  //   ) || false;

  // const [isFavorite, setIsFavorite] = useState(favoriteSelected);

  // useEffect(() => {
  //   if (userProfile) {
  //     setIsFavorite(favoriteSelected);
  //   }
  // }, [favoriteSelected, userProfile]);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // Initial screen width
    updateScreenWidth();

    // Add event listener to update screen width on window resize
    window.addEventListener('resize', updateScreenWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  const upcomingStatus = [
    'TBA',
    'NS',
    'WO',
    'ABANDONED',
    'CANCELLED',
    'AWARDED',
    'INTERRUPTED',
    'POSTPONED',
  ];
  const isPreviewPage = upcomingStatus.includes(match?.state?.short_name);
  // Add To Favorites
  // const addToFavorites = async (e, matchId) => {
  //   e.preventDefault();

  //   if (session) {
  //     setIsFavorite(!isFavorite);
  //     const favoriteData = {
  //       phone: session.user?.phone,
  //       key: 'matches',
  //       item: {
  //         id: matchId,
  //       },
  //     };

  //     try {
  //       const { data } = await asiaSportBackendUrl.put(
  //         '/api/user/favorites',
  //         favoriteData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.user?.accessToken}`,
  //           },
  //         }
  //       );

  //       if (data.status) {
  //         refetchProfile();
  //         toast.success('Match added to favorites!');
  //       } else {
  //         setIsFavorite(!isFavorite);
  //         toast.error('Something went wrong!');
  //       }
  //     } catch (error) {
  //       console.error('Error while adding to favorites:', error);
  //     }
  //   } else {
  //     toast.error('Please login first!');
  //   }
  // };

  // Remove From Favorites
  // const removeFromFavorites = async (e, matchId) => {
  //   e.preventDefault();

  //   if (session) {
  //     setIsFavorite(!isFavorite);
  //     const favoriteData = {
  //       phone: session.user?.phone,
  //       key: 'matches',
  //       item: {
  //         id: matchId,
  //       },
  //     };

  //     try {
  //       const { data } = await asiaSportBackendUrl.put(
  //         '/api/user/favorites/remove',
  //         favoriteData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${session?.user?.accessToken}`,
  //           },
  //         }
  //       );

  //       if (data.status) {
  //         refetchProfile();
  //         toast.success('Removed from favorites!');
  //       } else {
  //         setIsFavorite(!isFavorite);
  //         toast.error('Error');
  //       }
  //     } catch (error) {
  //       console.error('Error while removing from favorites:', error);
  //       toast.error('An error occurred');
  //     }
  //   } else {
  //     toast.error('Please login first');
  //   }
  // };

  const teamByLocation = (location:string) => match?.participants?.find((team) => team?.meta?.location === location);

  return (
    <div className="relative my-2 mx-2 lg:mx-0">
      <Link
        className={
          large
            ? 'bg-[#1B2435] hover:bg-[#122948] grid grid-cols-12 content-center gap-4 my-4 h-20 lg:h-fit text-xs md:text-sm'
            : 'bg-[#1B2435] hover:bg-[#122948] grid grid-cols-12 content-normal lg:content-center gap-4 h-20 md:h-full text-xs'
        }
        href={`/match/${isPreviewPage ? 'preview' : 'details'}/${getSlugify(
          teamByLocation('home')?.name
        )}-vs-${getSlugify(teamByLocation('away')?.name)}/${match?.id}`}
      >
        <MatchState match={match} />
        <div
          className={
            large
              ? 'py-1 col-span-4 lg:col-span-6 flex items-center'
              : 'py-1 col-span-4 lg:col-span-5  flex items-center'
          }
        >
          <div>
            <div className="flex justify-between text-gray-400 pb-2">
              <div className="flex gap-2 items-center">
                <div>
                  <Image
                    src={teamByLocation('home')?.image_path}
                    alt="team one"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className={large ? 'w-5 h-5' : 'w-4 h-4'}
                  />
                </div>
                <h2 className='text-gray-500'>
                  {getShortName(
                    teamByLocation('home')?.name,
                    teamByLocation('home')?.short_code
                  )}
                </h2>
              </div>
            </div>
            <div className="flex justify-between text-gray-400 ">
              <div className="flex gap-2 items-center ">
                <div>
                  <Image
                    src={teamByLocation('away')?.image_path}
                    alt="team two"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className={large ? 'w-5 h-5' : 'w-4 h-4'}
                  />
                </div>
                <h2 className='text-gray-500'>
                  {getShortName(
                    teamByLocation('away')?.name,
                    teamByLocation('away')?.short_code
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* goal section  */}
        <MatchScore match={match} large={large} />
      </Link>
      {/* analytic & highlight */}
      <div
        className={
          large
            ? 'my-auto flex gap-6 item-center absolute right-[4.5rem] lg:right-[13.5rem] top-[55px] lg:top-[20px] '
            : 'my-auto flex gap-4  item-center absolute right-[3.5rem] lg:right-[12.5rem] top-[47px] lg:top-[9px] h-8 '
        }
      >
        <div className="dropdown dropdown-hover my-auto">
          <div role="button" className="">
            <Image
              src="/images/Group 190.png"
              alt="team two"
              height={0}
              width={0}
              sizes="100vw"
              className="w-4 h-4 "
            />
            <div
              tabIndex={0}
              className="dropdown-content menu w-[600px] hidden lg:block  !right-[-241px] absolute z-[1000]"
            >
              <div className="mt-5 bg-[#1B2435]  shadow-lg  shadow-pink-50 rounded-md  relative">
                <div className="bg-[#1B2435] w-3 h-3 ms-[21.3rem] rotate-45 absolute -mt-1 z-20 "></div>
                <Probability />
              </div>
            </div>
          </div>
        </div>
        <div className="my-auto">
          <Image
            src="/images/Group 199.png"
            alt="team two"
            height={0}
            width={0}
            sizes="100vw"
            className="w-4 h-3 lg:w-5 lg:h-4 z-[999]"
          />
        </div>
      </div>
      {/* brief details  */}
      <div
        className={
          large
            ? 'col-span-2 p-2 bg-[#122948] mx-auto dropdown dropdown-hover my-auto dropdown-end absolute right-[2.8rem] top-[0px] lg:right-[3.5rem] h-12 lg:h-full  text-xs '
            : 'col-span-2 p-2  bg-[#122948] mx-auto dropdown dropdown-hover my-auto dropdown-end absolute right-[2.3rem] lg:right-[3.5rem] h-12 top-[0px] text-xs '
        }
      >
        <div className="my-auto">
          <div
            onClick={() => {
              if (screenWidth < 400) {
                document.getElementById('my_modal_4').showModal();
              }
            }}
            className=" grid grid-cols-3 gap-2 lg:gap-4 text-gray-500 my-auto "
          >
            <div className="grid grid-cols content-between h-full">
              <h2>324</h2>
              <h2 className="text-green-700">324</h2>
            </div>
            <div className="grid grid-cols content-between">
              <h2 className="text-red-700">324</h2>
              <h2>324</h2>
            </div>
            <div className="grid grid-cols content-between">
              <h2 className="text-red-700">324</h2>
              <h2>324</h2>
            </div>
          </div>
          <div
            tabIndex={1}
            className="dropdown-content hidden lg:block z-[1] menu w-[600px] !right-[-60px]"
          >
            <div className=" mt-5 bg-[#1B2435] shadow-xl shadow-blue-500/50  rounded-none relative">
              <div className="bg-[#1B2435] w-2 h-2 ms-[30rem] border-none p-0 m-0 rotate-45 absolute -mt-1"></div>
              <BetDroopDown />
            </div>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <div className="">
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box p-0 rounded-md w-11/12 max-w-5xl ">
                <BetMobileModal />
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}

                    <button className="btn btn-sm btn-circle btn-ghost ring-0 absolute right-2 top-1 text-white">
                      ✕
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      {/* favorite section  */}
      {/* <div
        className={
          large
            ? 'my-auto mx-auto absolute right-[0.5rem] top-[1.75rem] h-5 md:right-5 md:top-5 '
            : 'my-auto mx-auto absolute right-[0.5rem] lg:right-5 top-[1.75rem] lg:top-[1rem] h-5'
        }
      >
        <div className="cursor-pointer">
          {isFavorite ? (
            <IoStar
              // onClick={(e) => removeFromFavorites(e, match.id)}
              className="text-xl text-yellow-500 h-5"
            />
          ) : (
            <IoStarOutline
              // onClick={(e) => addToFavorites(e, match.id)}
              className="text-xl text-white h-5"
            />
          )}
        </div>
      </div> */}
    </div>
  );
};

export default FixtureCard;
