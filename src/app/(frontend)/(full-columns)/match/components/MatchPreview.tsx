import { INestedObject } from '@/types';
import moment from 'moment';
import { AiOutlineCalendar } from 'react-icons/ai';
import { HiOutlineUserGroup } from 'react-icons/hi';
import MatchStandingsPreview from './preview/MatchStandingsPreview';
import TeamOneMatchPreview from './preview/TeamOneMatchPreview';
import TeamTwoMatchPreview from './preview/TeamTwoMatchPreview';

export default function MatchPreview({ matchData }: INestedObject) {
  return (
    <>
      <div className=" text-white">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <AiOutlineCalendar className="text-2xl" />
            <span className="text-sm">
              {moment
                .unix(matchData?.starting_at_timestamp)
                .local()
                .format('DD MMMM YYYY, HH:mm')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <HiOutlineUserGroup className="text-2xl" title="Capacity" />
            <p className="text-sm">{matchData?.venue?.capacity}</p>
          </div>
        </div>
      </div>

      {/* Teams last 7 matches */}
      <TeamOneMatchPreview matchData={matchData} />
      <TeamTwoMatchPreview matchData={matchData} />

      {/* Standings */}
      <MatchStandingsPreview matchData={matchData} />
    </>
  );
}
