'use client';

import { useGetFootballFixturesQuery } from '@/features/super-admin/fixtures/fixtureApi';
import { useGetGeneralSettingsQuery } from '@/features/super-admin/general-settings/generalSettingsApi';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IoFootball } from 'react-icons/io5';

export default function FixtureList({ pickerDate, isFetching, setIsFetching }) {
  const [skip, setSkip] = useState(true);
  const [showData, setShowData] = useState(false);
  const {
    data: fixtures,
    isLoading: fixturesLoading,
    isError: fixturesError,
  } = useGetFootballFixturesQuery(pickerDate, {
    skip,
  });
  const {
    data: generalSettings,
    isLoading,
    isError,
  } = useGetGeneralSettingsQuery(undefined);

  const [offset, setOffset] = useState(0);
  const [highlightInfo, setHighlightInfo] = useState(0);
  const [isCheckingHighlight, setIsCheckingHighlight] = useState(false);

  console.log('Fixtures: ', fixtures);

  useEffect(() => {
    if (!isLoading && !isError) {
      if (
        generalSettings?.data?.timezone &&
        generalSettings?.data?.timezone?.value
      ) {
        setSkip(false);
      } else {
        toast.error('Setup timezone in general settings!');
      }
    }
  }, [generalSettings, isError, isLoading]);

  useEffect(() => {
    if (
      !skip &&
      !fixturesLoading &&
      !fixturesError &&
      fixtures &&
      fixtures.status
    ) {
      setShowData(true);
    }

    if (fixtures && !fixtures.status) {
      toast.error(fixtures?.message || 'Something went wrong!');
    }
  }, [fixtures, fixturesError, fixturesLoading, skip]);

  // const handleCheckHighlightModal = async (match) => {
  //   setIsCheckingHighlight(true);

  //   const { data } = await asiaSportBackendUrl.post(
  //     `/api/admin/fixtures/highlights`,
  //     {
  //       fixture_id: match.id,
  //     }
  //   );

  //   if (data.status) {
  //     if (data?.data.length === 0) {
  //       toast.success('No highlights available');
  //     } else {
  //       setHighlightInfo({ highlights: data.data, matchInfo: match });
  //       document.getElementById('check_highlight_modal').showModal();
  //     }
  //     setIsCheckingHighlight(false);
  //   } else {
  //     setIsCheckingHighlight(false);
  //     toast.error(data?.message);
  //   }
  // };

  // const finalFixtures = fixturesDataAdmin?.sort((a, b) => a.id - b.id);

  return (
    <div className="grid grid-cols-1 gap-3 pt-5">
      {!showData && (
        <div className="mt-5 flex h-32 justify-center">
          <div className="animate-bounce">
            <IoFootball className="animate-spin text-3xl text-primary" />
          </div>
        </div>
      )}

      {showData &&
        fixtures.data.map((group: { id: number }) => {
          return (
            <div key={group.id}>
              <div className="panel">
                <div className="flex flex-col items-center">
                  <div className="w-full bg-white">
                    <div className="flex h-full items-center justify-start p-2 px-4 hover:text-secondary">
                      <Image
                        src="/images/premier_logo.png"
                        alt="team one"
                        height={0}
                        width={0}
                        sizes="100vw"
                        className="mr-3 h-8 w-8 rounded-full"
                      />

                      <h4 className="text-[16px] font-semibold uppercase text-gray-900">
                        Premier League
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead className="bg-slate-100">
                    <tr className="border-slate-100 text-center text-base">
                      <th>Status</th>
                      <th>Team One</th>
                      <th>Time/Score</th>
                      <th>Team Two</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-slate-100 text-center">
                      <th>
                        <div className="badge badge-primary">FT</div>
                      </th>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src="/images/premier_logo.png"
                            alt="team one"
                            height={0}
                            width={0}
                            sizes="100vw"
                            className="h-7 w-7 rounded-full ring-1 ring-slate-200"
                          />
                          <h4 className="text-sm font-semibold uppercase">
                            League Name
                          </h4>
                        </div>
                      </td>
                      <td>0 - 0</td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <Image
                            src="/images/premier_logo.png"
                            alt="team one"
                            height={0}
                            width={0}
                            sizes="100vw"
                            className="h-7 w-7 rounded-full ring-1 ring-slate-200"
                          />
                          <h4 className="text-sm font-semibold uppercase">
                            League Name
                          </h4>
                        </div>
                      </td>
                      <td>
                        <Link href="/" className="btn btn-primary btn-sm">
                          Add Live
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

      {/* Modals */}
      {/* <CheckHighlightModal highlightInfo={highlightInfo} /> */}
    </div>
  );
}
