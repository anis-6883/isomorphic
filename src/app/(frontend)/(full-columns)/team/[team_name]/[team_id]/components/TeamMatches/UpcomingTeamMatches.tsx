'use client';

import FixtureCard from '@/app/(frontend)/components/FixtureCard';
import { useGetProfileQuery } from '@/features/auth/authApi';
import { RootState } from '@/features/store';
import moment from 'moment';
import { useSelector } from 'react-redux';
import RecentTeamMatches from './RecentTeamMatches';

export default function UpcomingTeamMatches({
  upcomingMatches,
  recentMatches,
}: {
  upcomingMatches: any;
  recentMatches: any;
}) {
  const { accessToken, user } = useSelector(
    (state: RootState) => state.authSlice
  );

  const { data: userData } = useGetProfileQuery(undefined, {
    skip: accessToken === undefined,
  });

  return (
    <div className=" mx-auto">
      {upcomingMatches?.map((match: any) => (
        <div key={match?.id} className="relative w-full">
          <p className="px-4 text-secondary">
            {moment
              .unix(match?.starting_at_timestamp)
              .local()
              .format('DD MMM YYYY')}
          </p>

          <div className="">
            <FixtureCard
              match={match}
              large={true}
              favoriteMatches={userData?.data?.favorites?.matches || undefined}
              accessToken={accessToken}
              user={user}
            />
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
