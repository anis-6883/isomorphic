import { IMatch } from '@/types';
import { getCurrentGoals } from '@/utils/get-current-goals';

export default function MatchScore({
  match,
  large,
}: {
  match: IMatch;
  large: boolean;
}) {
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
  const { tOne, tTwo } = getCurrentGoals(match?.scores);

  return (
    <div className="me-2 grid content-center">
      {!isLive && !isUpcoming && (
        <div
          className={
            large
              ? 'md:text-md text-sm text-gray-400 '
              : 'my-auto text-xs text-gray-400'
          }
        >
          <div className="pb-1">
            <h2>{tOne}</h2>
          </div>
          <div>
            <h2>{tTwo}</h2>
          </div>
        </div>
      )}
    </div>
  );
}
