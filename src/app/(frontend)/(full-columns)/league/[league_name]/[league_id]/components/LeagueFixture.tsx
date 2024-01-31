import FixtureCard from '@/app/(frontend)/components/FixtureCard';
import NoDataFound from '@/app/shared/NoDataFound';
import { useGetProfileQuery } from '@/features/auth/authApi';
import { RootState } from '@/features/store';
import { IMatch } from '@/types';
import { filterSortAndGroupMatches } from '@/utils/filterSortAndGroupMatches';
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function LeagueFixture<T>({ upcoming }: { upcoming: Array<T> }) {
  const { accessToken, user } = useSelector(
    (state: RootState) => state.authSlice
  );

  const { data: userData } = useGetProfileQuery(undefined, {
    skip: accessToken === undefined,
  });

  if (upcoming) {
    const filteredSortedGroupedMatches = filterSortAndGroupMatches(
      upcoming,
      true
    );

    return (
      <div>
        {filteredSortedGroupedMatches.length > 0 ? (
          <div>
            {filteredSortedGroupedMatches?.map((league) => (
              <div key={league.date} className="">
                <div className="">
                  <div className="">
                    <h4 className="my-5 px-5 text-sm text-secondary">
                      {moment(league.date, 'YYYY-MM-DD').format('DD MMM YYYY')}
                    </h4>
                  </div>
                </div>

                {league?.matches?.map((match: IMatch) => (
                  <FixtureCard
                    key={match.id}
                    match={match}
                    large={true}
                    favoriteMatches={
                      userData?.data?.favorites?.matches || undefined
                    }
                    accessToken={accessToken}
                    user={user}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <NoDataFound />
        )}
      </div>
    );
  } else {
    return <NoDataFound />;
  }
}
