'use client';
import FixtureCard from '@/app/(frontend)/components/FixtureCard';
import moment from 'moment';
import RecentTeamMatches from './RecentTeamMatches';

export default function UpcomingTeamMatches({
  upcomingMatches,
  recentMatches,
}:{
  upcomingMatches:any
  recentMatches:any,
}) {
  return (
    <div className=" mx-auto">
      {upcomingMatches?.map((match:any) => (
        <div key={match?.id} className="relative w-full">
          <p className="px-4 text-secondary">
            {moment
              .unix(match?.starting_at_timestamp)
              .local()
              .format('DD MMM YYYY')}
          </p>

          <div className="">
            <FixtureCard match={match} large={true} />
          </div>
        </div>
      ))}
      <RecentTeamMatches
        key={'team_matches_tab_002'}
        recentMatches={recentMatches}
      />
    </div>
  );
}
