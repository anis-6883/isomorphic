import LeagueDetails from './components/LeagueDetails';

export default async function Page({ params }) {
  const leagueId = params.league_id;

  return <LeagueDetails leagueId={leagueId} />;
}
