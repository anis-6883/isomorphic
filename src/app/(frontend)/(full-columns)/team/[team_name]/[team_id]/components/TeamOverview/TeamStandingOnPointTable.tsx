import StandingTeamItem from '@/app/shared/StandingTeamItem';
import { useGetLeagueStandingQuery } from '@/features/front-end/league/leagueApi';
import Image from 'next/image';
import Link from 'next/link';

function transformDetailsToObj(details :any) {
  const result:any = {};
  details.forEach(({ type_id, value } : { type_id:string,value:string }) => {
    result[type_id] = value;
  });
  return result;
}

function getItemAndNeighbors(array:any, teamId:string) {
  const index = array.findIndex((item : any) => item.teamId === parseInt(teamId));
  if (index === -1) {
    return [];
  }

  const previousItem = index > 0 ? array[index - 1] : null;
  const currentItem = array[index];
  const nextItem = index < array.length - 1 ? array[index + 1] : null;

  const resultArray = [previousItem, currentItem, nextItem].filter(Boolean);
  return resultArray;
}

export default function TeamStandingOnPointTable({
  seasonId,
  teamId,
  leagueInfo,
}:{
  seasonId:string
  teamId:string,
  leagueInfo:any,
}) {
  const { isLoading:leagueStandingsLoading, data:leagueStandingsData } =
  useGetLeagueStandingQuery(seasonId);

  if (leagueStandingsLoading) {
    return <>Loading . . . .</>;
  }

  const transformedStandings = (leagueStandingsData?.data ?? []).map(
    (singleStandings :any) => {
      const transformedData = transformDetailsToObj(singleStandings?.details);
      return {
        teamId: singleStandings?.participant?.id,
        position: singleStandings?.position,
        teamName: singleStandings?.participant?.name,
        teamImage: singleStandings?.participant?.image_path,
        GP: transformedData['129'],
        W: transformedData['130'],
        D: transformedData['131'],
        L: transformedData['132'],
        GF: transformedData['133'],
        GA: transformedData['134'],
        GD: transformedData['179'],
        PTS: transformedData['187'],
      };
    }
  );

  transformedStandings.sort((a:any, b:any) => b.PTS - a.PTS);

  const desiredList = getItemAndNeighbors(transformedStandings, teamId);

  return (
    <div className="border-t border-gray-800 mt-6 px-5">
      <Link
        href={`/league/details/${leagueInfo?.id}`}
        className="flex items-center w-fit gap-4 my-5 ml-10"
      >
        <Image
          src={leagueInfo?.image_path}
          width={0}
          height={0}
          alt="League logo"
          className="w-10 h-10 rounded-full ring-1 ring-black p-0.5"
          sizes="100vw"
        />
        <div>
          <h4 className="text-lg font-semibold">{leagueInfo?.name}</h4>
          <h4 className="text-sm">{leagueInfo?.country?.name}</h4>
        </div>
      </Link>

      <div className="text-gray-400 uppercase w-full">
        <div className="text-xs h-8 font-medium grid grid-cols-12 items-center w-full">
          <div className="text-center font-semibold">#</div>
          <div className="col-span-3">Team</div>
          <div className="text-center font-semibold">GP</div>
          <div className="text-center font-semibold">W</div>
          <div className="text-center font-semibold">D</div>
          <div className="text-center font-semibold">L</div>
          <div className="text-center font-semibold">GF</div>
          <div className="text-center font-semibold">GA</div>
          <div className="text-center font-semibold">GD</div>
          <div className="text-center font-semibold">PTS</div>
        </div>
      </div>
      <div>
        {transformedStandings.length > 0 ? (
          desiredList?.map((singleStandings, index) => (
            <StandingTeamItem
              key={singleStandings.position + index}
              singleStandings={singleStandings}
              index={index}
            />
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
}
