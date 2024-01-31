import { Team } from '@/types';
import Image from 'next/image';

function calculateTeamScores(scores :any, teamId:string) {
  let teamOneScore = 0;
  let teamTwoScore = 0;

  scores?.forEach((item :any) => {
    if (item.description === 'CURRENT') {
      if (item.participant_id === parseInt(teamId)) {
        teamOneScore = item.score?.goals || 0;
      } else {
        teamTwoScore = item.score?.goals || 0;
      }
    }
  });

  return { teamOneScore, teamTwoScore };
}

export default function LastFiveMatchCard({ match, teamId } : { match:any ;teamId:string }) {
  const { scores, participants } = match;

  const { teamOneScore, teamTwoScore } = calculateTeamScores(scores, teamId);

  const status =
    teamOneScore === teamTwoScore
      ? 'D'
      : teamOneScore > teamTwoScore
        ? 'W'
        : 'L';

  const statusStyles = {
    D: 'bg-white text-black border border-black',
    W: 'bg-green-500 text-white',
    L: 'bg-red-500 text-white',
  };

  const awayTeam = participants.find((team :any) => team?.id != teamId);

  return (
    <div className="w-fit">
      <div
        className={`h-14 w-24 flex items-center justify-center ${statusStyles[status]}`}
      >
        {`${teamOneScore} - ${teamTwoScore}`}
      </div>
      {awayTeam && (
        <Image
          src={awayTeam.image_path}
          alt="team image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-12 h-12 rounded-full mx-auto mt-2 ring-1 ring-black p-0.5"
        />
      )}
    </div>
  );
}
