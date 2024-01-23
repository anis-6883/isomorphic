import MatchDetails from '../../../components/MatchDetails';

export default async function Page({
  params,
}: {
  params: { match_status: string; fixture_id: string };
}) {
  const { match_status, fixture_id } = params;
  return <MatchDetails status={match_status} fixtureId={fixture_id} />;
}
