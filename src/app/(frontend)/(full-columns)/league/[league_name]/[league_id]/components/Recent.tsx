import FixtureCard from '@/app/(frontend)/components/FixtureCard';
import NoDataFound from '@/app/shared/NoDataFound';
import { filterSortAndGroupMatches } from '@/utils/filterSortAndGroupMatches';
import moment from 'moment';

export default function Recent({ latest }) {
  if (latest) {
    const filteredSortedGroupedMatches = filterSortAndGroupMatches(
      latest,
      false
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

                {league?.matches?.map((match) => (
                  <FixtureCard key={match.id} match={match} large={true} />
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
