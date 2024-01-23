import PlayerDetails from './_components/PlayerDetails';

export default async function page({ params }) {
  const playerId = params?.player_id;

  return <PlayerDetails playerId={playerId} />;
}
