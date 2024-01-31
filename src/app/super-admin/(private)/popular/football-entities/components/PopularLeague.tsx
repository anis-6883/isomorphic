import {
  useGetAllLeaguesQuery,
  useGetPopularLeaguesQuery,
} from '@/features/super-admin/popular-football-entity/popularFootballEntityApi';
import { TModalElementType } from '@/types';
import { arrayMove } from '@dnd-kit/sortable';
import Image from 'next/image';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { LuPlus } from 'react-icons/lu';
import { RiCloseCircleFill } from 'react-icons/ri';

export default function PopularLeague() {
  const [showLeagues, setShowLeagues] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [addingLeague, setAddingLeague] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [singleLeague, setSingleLeague] = useState(null);
  const [leagueList, setLeagueList] = useState([]);
  // const { popularLeagues, popularLeaguesLoading, popularLeaguesRefetch } =
  //   useGetPopularLeagues(session);

  const { data: allLeagues, isLoading: allLeaguesLoading } =
    useGetAllLeaguesQuery(undefined);
  const { data: popularLeagues, isLoading: popularLeaguesLoading } =
    useGetPopularLeaguesQuery(undefined);

  if (!allLeaguesLoading && !popularLeaguesLoading) {
    console.log('allLeagues: ', allLeagues);
    console.log('allPopularLeagues: ', popularLeagues);
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);

    // const searchResult = leaguesData.filter((league) =>
    //   league.name.toLowerCase().includes(searchValue.toLowerCase())
    // );

    // setShowLeagues(searchResult);
    setShowSearchModal(true);
  };

  // const selectPointTableHandler = async (id) => {
  //   try {
  //       const { data } = await asiaSportBackendUrl.post(
  //         '/api/admin/popular-leagues/update/select-point-table',
  //         {
  //           id: id,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
  //         }
  //       );
  //       if (data.status) {
  //         popularLeaguesRefetch();
  //         toast.success(data?.message);
  //       } else {
  //         toast.error(data?.message);
  //       }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSearchModal = () => {
    setShowSearchModal(false);
    setSearchInput('');
  };

  const deleteLeagueHandler = (league: any) => {
    setSingleLeague(league);
    const modal = document.getElementById(
      'leagueDeleteModal'
    ) as TModalElementType;
    if (modal) {
      modal.showModal();
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const activeIndex = leagueList.findIndex(
        (item: any) => item.id === active.id
      );
      const overIndex = leagueList.findIndex(
        (item: any) => item.id === over.id
      );
      const newItems = arrayMove(leagueList, activeIndex, overIndex);
      newItems.forEach((item: any, index: number) => {
        item.position = index + 1;
      });

      setLeagueList(newItems);

      const leagueIdWithPosition = newItems.map((item: any) => {
        return { id: item.id, position: item.position };
      });

      try {
        // setIsSorting(true);
        // const { data } = await asiaSportBackendUrl.post(
        //   '/api/admin/popular-leagues/sort',
        //   leagueIdWithPosition,
        //   {
        //     headers: { Authorization: `Bearer ${session?.user?.accessToken}` },
        //   }
        // );
        // if (data?.status) {
        //   // setIsSorting(false);
        //   toast.success(data?.message);
        // }
      } catch (err) {
        // setIsSorting(false);
        toast.error('Failed to sort!');
      } finally {
        // setIsSorting(false);
      }
    }
  };

  return (
    <section className={'@5xl:grid @5xl:grid-cols-6'}>
      <header className="col-span-2 mb-4 @5xl:mb-0">
        <h3 className="text-lg font-semibold uppercase">Popular Leagues</h3>
      </header>
      <div className="w-full px-5 py-5">
        <h2 className="mb-3 text-xl font-semibold">Search Popular League</h2>
        <div className="form-control relative">
          <input
            className="input input-bordered bg-white pr-10"
            placeholder="Type here..."
            onChange={handleSearch}
            value={searchInput}
          />
          <HiMagnifyingGlass className="absolute right-3 top-3 text-2xl" />

          <div
            className={`${
              showSearchModal ? 'block' : 'hidden'
            } absolute top-24 z-10 max-h-[300px] w-full rounded-md bg-white shadow-md`}
          >
            <div className="relative py-2">
              <RiCloseCircleFill
                className="absolute -right-2 -top-2 cursor-pointer text-2xl text-secondary"
                onClick={handleSearchModal}
              />
              <div className="max-h-[280px] overflow-y-auto px-5 pb-5 pt-10">
                <ul className="w-full rounded-box">
                  {showLeagues.length > 0 ? (
                    <>
                      {showLeagues.map((league: any) => (
                        <li
                          key={league.league_id}
                          className="mb-2 grid grid-cols-12 rounded-md bg-gray-200 p-2"
                        >
                          <div className="col-span-8 flex items-center justify-start">
                            <Image
                              width={40}
                              height={0}
                              sizes="100vw"
                              className="rounded-full"
                              src={league.image_path}
                              alt="Logo"
                            />
                            <span className="ml-2 font-medium">
                              {league.name}
                            </span>
                          </div>
                          <div className="col-span-4 flex items-center justify-center">
                            <button
                              className="btn btn-success btn-sm"
                              //   onClick={() => addLeagueHandler(league)}
                              disabled={addingLeague}
                            >
                              Add <LuPlus className="text-xl" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li className="mb-2 grid grid-cols-12 rounded-md bg-gray-200 p-2">
                      <div className="col-span-12 flex items-center justify-center">
                        <span className="ml-2 font-medium">
                          No League Found!
                        </span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full bg-white px-5">
        <h2 className="mb-5 text-xl font-semibold">Popular League List</h2>
        <div>
          {/* <div className="w-full rounded-box">
            {popularLeaguesLoading ? (
              <div className="flex h-44 justify-center p-5">
                <div className="animate-bounce">
                  <FaVolleyballBall className="animate-spin text-3xl text-secondary" />
                </div>
              </div>
            ) : popularLeagues?.data.length > 0 ? (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={leagueList}
                >
                  {popularLeagues?.data.map((league) => (
                    <LeagueItem
                      key={league._id}
                      league={league}
                      selectPointTableHandler={selectPointTableHandler}
                      deleteLeagueHandler={deleteLeagueHandler}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="mb-2 rounded-md border-slate-100 p-2 text-center font-medium">
                No Data Found!
              </div>
            )}
          </div> */}
        </div>
      </div>

      {/* <LeagueDeleteModal
        singleLeague={singleLeague}
        session={session}
        popularLeaguesRefetch={popularLeaguesRefetch}
      /> */}
    </section>
  );
}
