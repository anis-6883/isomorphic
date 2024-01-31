
import { useGetPlayerMatchesQuery } from '@/features/front-end/player/playerApi';
import PlayerMatchCard from './PlayerMatchCard';
import { INestedObject } from '@/types';
import MainLoading from '@/app/shared/MainLoading';

export default function PlayerMatches({ playerData } : { playerData : INestedObject}) {
  function getFixtureIds(latest : INestedObject) {
    return latest.map((fixture : INestedObject) => fixture.fixture_id);
  }

  const fixtureIds = getFixtureIds(playerData?.latest);

  // Fetch Player's all Matches Data
  const {
    isLoading: isLoadingPlayerMatches,
    data: playerMatchesData,
    refetch: refetchPlayerMatches,
  } = useGetPlayerMatchesQuery(fixtureIds , {skip:!fixtureIds});
    

  if (isLoadingPlayerMatches) {
    return <MainLoading/>;
  }

console.log("playerMatchesData" , playerMatchesData)

  return (
    <div>
      {playerMatchesData?.data
  ?.sort((a: any, b: any) => (new Date(b.starting_at) as any) - (new Date(a.starting_at) as any))
  .map((match:INestedObject) => (
    <PlayerMatchCard
      key={match?.id}
      match={match}
      playerData={playerData}
    />
  ))}
    </div>
  );
}
