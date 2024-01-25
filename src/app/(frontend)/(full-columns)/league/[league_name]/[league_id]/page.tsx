import { IParams } from '@/types';
import LeagueDetails from './components/LeagueDetails';

export default async function Page({ params }: { params: IParams }) {
  const leagueId =
    params?.league_id !== undefined ? Number(params?.league_id) : undefined;
  return leagueId !== undefined ? <LeagueDetails leagueId={leagueId} /> : null;
}
