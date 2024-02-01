import { INestedObject, TModalElementType, Team } from '@/types';
import getShortName from '@/utils/get-short-name';
import getSlugify from '@/utils/get-slugify';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import BetDroopDown, {
  BetMobileModal,
} from '../(three-columns)/components/fixtureCardInfo/BetDroopDown';
import MatchScore from '../(three-columns)/components/fixtureCardInfo/MatchScore';
import MatchState from '../(three-columns)/components/fixtureCardInfo/MatchState';
import Probability from '../(three-columns)/components/fixtureCardInfo/Probability';

const FixtureCard = ({
  match,
  large,
  favoriteMatches,
  accessToken,
  user,
}: {
  match: INestedObject;
  large: boolean;
  favoriteMatches: any;
  accessToken: string | undefined;
  user: any;
}) => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoriteMatches) {
      const favoriteSelected = favoriteMatches.some(
        (item: any) => parseInt(item) === parseInt(match.id)
      );
      setIsFavorite(favoriteSelected);
    }
  }, [favoriteMatches, match]);

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

  const isPreviewPage = upcomingStatus.includes(match?.state?.short_name ?? '');

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

  const teamByLocation = (location: string) =>
    match?.participants?.find(
      (team: Team | undefined) => team?.meta?.location === location
    );

  return (
    <div className="relative mx-2 my-2 lg:mx-0">
      <Link
        className={
          large
            ? 'my-4 grid h-20 grid-cols-12 content-center gap-4 bg-[#1B2435] text-xs hover:bg-[#122948] md:text-sm lg:h-fit'
            : 'grid h-20 grid-cols-12 content-normal gap-4 bg-[#1B2435] text-xs hover:bg-[#122948] md:h-full lg:content-center'
        }
        href={`/match/${isPreviewPage ? 'preview' : 'details'}/${getSlugify(
          teamByLocation('home')?.name
        )}-vs-${getSlugify(teamByLocation('away')?.name)}/${match?.id}`}
      >
        <MatchState match={match} />
        <div
          className={
            large
              ? 'col-span-4 flex items-center py-1 lg:col-span-6'
              : 'col-span-4 flex items-center  py-1 lg:col-span-5'
          }
        >
          <div>
            <div className="flex justify-between pb-2 text-gray-400">
              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src={
                      teamByLocation('home')?.image_path ||
                      '/images/team_placeholder.png'
                    }
                    alt="team one"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className={large ? 'h-5 w-5' : 'h-4 w-4'}
                  />
                </div>
                <h2 className="text-zinc-400">
                  {getShortName(
                    teamByLocation('home')?.name,
                    teamByLocation('home')?.short_code
                  )}
                </h2>
              </div>
            </div>
            <div className="flex justify-between text-gray-400 ">
              <div className="flex items-center gap-2 ">
                <div>
                  <Image
                    src={
                      teamByLocation('away')?.image_path ||
                      '/images/team_placeholder.png'
                    }
                    alt="team two"
                    height={0}
                    width={0}
                    sizes="100vw"
                    className={large ? 'h-5 w-5' : 'h-4 w-4'}
                  />
                </div>
                <h2 className="text-zinc-400">
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
            ? 'item-center absolute right-[4.5rem] top-[55px] my-auto flex gap-6 lg:right-[13.5rem] lg:top-[20px] '
            : 'item-center absolute right-[3.5rem]  top-[47px] my-auto flex h-8 gap-4 lg:right-[12.5rem] lg:top-[9px] '
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
              className="h-4 w-4 "
            />
            <div
              tabIndex={0}
              className="menu dropdown-content absolute !right-[-241px] z-[1000] w-[600px]"
            >
              <div className="relative mt-5  rounded-md  bg-[#1B2435] shadow-lg  shadow-pink-50">
                <div className="absolute z-20 -mt-1 ms-[21.3rem] h-3 w-3 rotate-45 bg-[#1B2435] "></div>
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
            className="z-[999] h-3 w-4 lg:h-4 lg:w-5"
          />
        </div>
      </div>
      {/* brief details  */}
      <div
        className={
          large
            ? 'dropdown dropdown-end dropdown-hover absolute right-[2.8rem] top-[0px] col-span-2 mx-auto my-auto h-12 bg-gradient-to-t from-[#112848] to-transparent p-2 text-xs lg:right-[3.5rem]  lg:h-full '
            : 'dropdown dropdown-end  dropdown-hover absolute right-[2.3rem] top-[0px] col-span-2 mx-auto my-auto h-12 bg-gradient-to-t from-[#112848] to-transparent  p-2 text-xs lg:right-[3.5rem] '
        }
      >
        <div className="my-auto">
          <div
            onClick={() => {
              if (screenWidth < 400) {
                const model = document.getElementById(
                  'my_modal_4'
                ) as TModalElementType;

                if (model) {
                  model.showModal();
                }
              }
            }}
            className=" my-auto grid grid-cols-3 gap-2 text-gray-500 lg:gap-4 "
          >
            <div className="grid-cols grid h-full content-between">
              <h2>324</h2>
              <h2 className="text-green-700">324</h2>
            </div>
            <div className="grid-cols grid content-between">
              <h2 className="text-red-700">324</h2>
              <h2>324</h2>
            </div>
            <div className="grid-cols grid content-between">
              <h2 className="text-red-700">324</h2>
              <h2>324</h2>
            </div>
          </div>
          <div
            tabIndex={1}
            className="menu dropdown-content !right-[-60px] z-[1] hidden w-[600px] lg:block"
          >
            <div className=" relative mt-5 rounded-none bg-[#1B2435]  shadow-xl shadow-blue-500/50">
              <div className="absolute m-0 -mt-1 ms-[30rem] h-2 w-2 rotate-45 border-none bg-[#1B2435] p-0"></div>
              <BetDroopDown />
            </div>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <div className="">
            <dialog id="my_modal_4" className="modal">
              <div className="modal-box w-11/12 max-w-5xl rounded-md p-0 ">
                <BetMobileModal />
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}

                    <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-1 text-white ring-0">
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
      <div
        className={
          large
            ? 'absolute right-[0.5rem] top-[1.75rem] mx-auto my-auto h-5 md:right-5 md:top-5 '
            : 'absolute right-[0.5rem] top-[1.75rem] mx-auto my-auto h-5 lg:right-5 lg:top-[1rem]'
        }
      >
        <div className="cursor-pointer">
          {accessToken && user?.role !== 'admin' ? (
            isFavorite ? (
              <IoStar
                // onClick={(e) => removeFromFavorites(e, match.id)}
                onClick={(e) => setIsFavorite(false)}
                className="h-5 text-xl text-yellow-500"
              />
            ) : (
              <IoStarOutline
                // onClick={(e) => addToFavorites(e, match.id)}
                onClick={(e) => setIsFavorite(true)}
                className="h-5 text-xl text-white"
              />
            )
          ) : (
            <IoStarOutline
              onClick={() =>
                toast.error(
                  user?.role === 'admin'
                    ? 'No allow for admin!'
                    : 'Please, Login in First!'
                )
              }
              className="h-5 text-xl text-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FixtureCard;
