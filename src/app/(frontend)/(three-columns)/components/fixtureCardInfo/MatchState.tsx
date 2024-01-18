import { IMatch } from "@/types";
import { convertTimestampToFormattedDate } from "@/utils/convert-timestamp-to-formatted-date";

export default function MatchState({ match }:{match:IMatch}) {
  const liveStatus = [
    'INPLAY_1ST_HALF',
    'INPLAY_2ND_HALF',
    'HT',
    'INPLAY_ET',
    'INPLAY_ET_2ND_HALF',
    'BREAK',
    'PEN_BREAK',
    'EXTRA_TIME_BREAK',
    'INPLAY_PENALTIES',
  ];
  
  const finishedStatus = ['FT', 'AET', 'FT_PEN'];
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

  const matchState = match?.state?.state;
  const isLive = liveStatus.includes(matchState);
  const isUpcoming = upcomingStatus.includes(matchState);
  const isFinished = finishedStatus.includes(matchState);

  const formattedDate = convertTimestampToFormattedDate(
    match?.starting_at_timestamp
  );

  return (
    <div className="flex justify-center items-center col-span-2 lg:col-span-1  ps-3 pe-5 lg:pe-0">
      {isLive && (
        <div className="text-[#3388FF] text-xs p-1">
          <span>{match?.periods?.slice(-1)[0]?.minutes}</span>
          <span className="">{`"`}</span>
        </div>
      )}

      {isFinished && (
        <span className="text-[#3388FF] text-xs p-1">
          {match?.state?.short_name}
        </span>
      )}

      {isUpcoming && (
        <div className="text-center">
          <span className="text-[#3388FF] text-xs p-1">{formattedDate}</span>
        </div>
      )}
    </div>
  );
}
