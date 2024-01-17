'use client';

import { useGetLiveMatchesQuery } from '@/features/super-admin/live-match/liveMatchApi';

export default function LiveMatchIndex() {
  const {
    data: liveMatches,
    isLoading,
    isError,
  } = useGetLiveMatchesQuery(undefined);

  if (!isLoading && !isError) {
    console.log('liveMatches: ', liveMatches);
  }

  return <div>LiveMatchIndex</div>;
}
