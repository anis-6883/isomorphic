import { IParams } from '@/types';
import PlayerDetails from './_components/PlayerDetails';

export default async function page({ params }: { params: IParams }) {
  const playerId = params?.player_id;

  return <PlayerDetails playerId={playerId} />;
}
