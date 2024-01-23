'use client';

import MainLoading from '@/app/shared/MainLoading';
import NoDataFound from '@/app/shared/NoDataFound';
import { useGetFixturesInfoAndCommentsQuery } from '@/features/front-end/fixture/fixtureApi';

export default function Feed({ matchData }) {
  const { isLoading: matchEventsLoading, data: eventData } =
    useGetFixturesInfoAndCommentsQuery(matchData?.data.id, {
      skip: !matchData?.data.id,
    });

  if (matchEventsLoading) {
    return <MainLoading />;
  }
  const comment = eventData?.data?.comments?.map((comment) => comment?.comment);

  if (comment?.length === 0) {
    return <NoDataFound />;
  }
  return (
    <div className="m-2 mb-20 mt-10 rounded-2xl border-[1px] border-primary md:m-0 md:mb-0">
      {[...eventData.data.comments]
        .sort((a, b) => b.order - a.order)
        .map((comment) => (
          <div
            key={comment.id}
            className=" mt-3 flex p-2 text-[9px] text-gray-400 md:text-base "
          >
            <p className="">
              {comment?.minute !== null && (
                <div className="mx-2 w-20 border-r border-primary px-2 text-center">
                  <span>
                    {comment?.minute}
                    {comment?.extra_minute
                      ? `+ ${comment?.extra_minute}`
                      : null}
                    {"' "}
                  </span>
                </div>
              )}
            </p>
            <p className=" ms-4 max-w-[1000px]">{comment?.comment}</p>
          </div>
        ))}
    </div>
  );
}
