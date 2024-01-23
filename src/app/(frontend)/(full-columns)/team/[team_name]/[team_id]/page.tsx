import TeamDetails from './components/TeamDetails';

export default async function Page({ params }) {
  const teamId = params.team_id;

  return <TeamDetails teamId={teamId} />;
}
