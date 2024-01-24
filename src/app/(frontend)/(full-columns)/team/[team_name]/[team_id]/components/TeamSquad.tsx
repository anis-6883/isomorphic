import MainLoading from '@/app/shared/MainLoading';
import { useGetTeamSquadDataQuery } from '@/features/front-end/teams/teamsApi';
import Image from 'next/image';
import PlayerCard from './PlayerCard';

export default function TeamSquad({ teamDetails, teamId }) {
  const seasonId = teamDetails?.activeseasons[0]?.id;

  const activeCoach = teamDetails?.coaches.find((coach) => coach.active);

  const { isLoading: teamSquadLoading, data: teamSquadData } =
    useGetTeamSquadDataQuery(
      { seasonId, teamId },
      { skip: !seasonId && !teamId }
    );

  if (teamSquadLoading) {
    return <MainLoading />;
  }
  function groupSquadDataByPosition(squadData) {
    return squadData?.reduce((groupedData, player) => {
      const positionCode = player?.player?.position?.code;

      if (!groupedData[positionCode]) {
        groupedData[positionCode] = [];
      }

      groupedData[positionCode].push({
        playerId: player?.player?.id,
        displayName: player?.player?.display_name,
        imagePath: player?.player?.image_path,
        countryName: player?.player?.country?.name,
        countryImagePath: player?.player?.country?.image_path,
      });

      return groupedData;
    }, {});
  }

  const groupedData = groupSquadDataByPosition(teamSquadData?.data);

  return (
    <div className="rounded-2xl border-[1px] border-primary px-5 pb-5 text-xs md:text-base">
      <h4 className="mt-3 text-lg font-semibold uppercase text-secondary">
        COACH
      </h4>
      <div className="grid grid-cols-4 items-start gap-5 pb-6">
        <div className="my-2 flex flex-col items-center gap-2 text-white">
          <Image
            width={50}
            height={50}
            alt={activeCoach?.coach?.display_name}
            src={activeCoach?.coach?.image_path}
            className="h-20 w-20 rounded-full bg-white p-1 md:h-20 md:w-20"
          />

          <h4 className="mb-1 text-center text-xs font-semibold md:text-sm">
            {activeCoach?.coach?.display_name}
          </h4>
        </div>
      </div>

      <h4 className="mt-3 text-xs font-semibold uppercase text-secondary md:text-lg">
        Goal-keeper
      </h4>
      <div className="grid grid-cols-4 items-center justify-center gap-5 pb-6">
        {groupedData?.goalkeeper?.map((player) => (
          <PlayerCard key={player?.playerId} player={player} />
        ))}
      </div>

      <h4 className="mt-3 text-xs font-semibold uppercase text-secondary md:text-lg">
        DEFENDER
      </h4>
      <div className="grid grid-cols-4 items-center justify-center gap-5 pb-6">
        {groupedData?.defender?.map((player) => (
          <PlayerCard key={player?.playerId} player={player} />
        ))}
      </div>

      <h4 className="mt-3 text-xs font-semibold uppercase text-secondary md:text-lg">
        MIDFIELDER
      </h4>
      <div className="grid grid-cols-4 items-center justify-center gap-5 pb-6">
        {groupedData?.midfielder?.map((player) => (
          <PlayerCard key={player?.playerId} player={player} />
        ))}
      </div>

      <h4 className="mt-3 text-xs font-semibold uppercase text-secondary md:text-lg">
        ATTACKER
      </h4>
      <div className="grid grid-cols-4 items-center justify-center gap-5 pb-6">
        {groupedData?.attacker?.map((player) => (
          <PlayerCard key={player?.playerId} player={player} />
        ))}
      </div>
    </div>
  );
}
