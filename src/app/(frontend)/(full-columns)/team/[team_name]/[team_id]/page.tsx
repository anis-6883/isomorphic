import TeamDetails from './components/TeamDetails';

export default async function Page({
  params,
}: {
  params: { team_id: string };
}) {
  const teamId = params.team_id;

  return <TeamDetails teamId={teamId} />;
}
