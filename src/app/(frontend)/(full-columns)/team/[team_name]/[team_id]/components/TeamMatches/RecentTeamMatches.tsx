'use client';

import FixtureCard from '@/app/(frontend)/components/FixtureCard';
import { INestedObject } from '@/types';
import moment from 'moment';

// const MatchCard = ({ match, teamId }) => {
//   const [isStarClicked, setIsStarClicked] = useState(false);

//   const handleButtonClick = (event) => {
//     event.preventDefault();
//     setIsStarClicked(!isStarClicked);
//   };

//   const { participants, scores, state } = match;

//   const homeTeam = participants.find(
//     (participant) => participant.meta.location === 'home'
//   );
//   const awayTeam = participants.find(
//     (participant) => participant.meta.location === 'away'
//   );

//   // Get the current score for home and away teams
//   const homeScore =
//     scores.find((score) => score.participant_id === homeTeam.id)?.score.goals ||
//     0;
//   const awayScore =
//     scores.find((score) => score.participant_id === awayTeam.id)?.score.goals ||
//     0;

//   const selectedTeam =
//     parseInt(
//       scores.find((score) => score.participant_id === parseInt(teamId))?.score
//         .goals,
//       10
//     ) || 0;

//   const otherTeam =
//     parseInt(
//       scores.find((score) => score.participant_id !== parseInt(teamId))?.score
//         .goals,
//       10
//     ) || 0;

//   let status;

//   if (selectedTeam === otherTeam) {
//     status = 'D';
//   } else if (selectedTeam > otherTeam) {
//     status = 'W';
//   } else {
//     status = 'L';
//   }

//   const statusStyles = {
//     D: 'bg-black text-white border border-black',
//     W: 'bg-green-500 text-white',
//     L: 'bg-red-500 text-white',
//   };

//   return (
//     <div className="relative w-full">
//       <p>
//         {moment
//           .unix(match?.starting_at_timestamp)
//           .local()
//           .format('DD MMMM YYYY')}
//       </p>
//       <Link
//         href={`/match/details/${getSlugify(homeTeam.name)}-vs-${getSlugify(
//           awayTeam.name
//         )}/${match?.id}`}
//         className="w-full"
//       >
//         <div className={`h-auto w-full mb-1`}>
//           <div className={`p-2 grid grid-cols-12 items-center gap-2`}>
//             <p className="col-span-1 text-gray-400 text-sm font-semibold">
//               {state?.short_name}
//             </p>
//             <div className="col-span-3 flex items-center">
//               <Image
//                 src={homeTeam.image_path}
//                 alt={homeTeam.name}
//                 height={0}
//                 width={0}
//                 sizes="100vw"
//                 className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
//               />
//               <h4 className="text-sm font-semibold uppercase">
//                 {getShortName(homeTeam.name, homeTeam?.short_code)}
//               </h4>
//             </div>

//             <div
//               className={`col-span-3 w-16 h-16 rounded-full flex text-xs  items-center justify-center mx-auto  ${statusStyles[status]}`}
//             >
//               <p>{homeScore}</p>
//               <p>-</p>
//               <p>{awayScore}</p>
//             </div>

//             <div className="col-span-3 flex items-center">
//               <Image
//                 src={awayTeam.image_path}
//                 alt={awayTeam.name}
//                 height={0}
//                 width={0}
//                 sizes="100vw"
//                 className="w-7 h-7 ring-1 ring-primary mr-3 rounded-full"
//               />
//               <h4 className="text-sm font-semibold uppercase">
//                 {getShortName(awayTeam.name, awayTeam?.short_code)}
//               </h4>
//             </div>
//           </div>
//         </div>
//       </Link>

//       <button
//         className="col-span-2 mx-auto absolute top-6 right-5"
//         onClick={handleButtonClick}
//       >
//         <svg
//           className={`w-6 h-6 ${isStarClicked ? 'text-green-500' : ''}`}
//           viewBox="0 0 15 15"
//           version="1.1"
//           id="star"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             id="path4749-2-8-2"
//             d="M7.5,0l-2,5h-5l4,3.5l-2,6l5-3.5&#xA;&#x9;l5,3.5l-2-6l4-3.5h-5L7.5,0z"
//             fill={`${isStarClicked ? '#f39c12' : '#fffffff'}`}
//           />
//         </svg>
//       </button>
//     </div>
//   );
// };

const RecentTeamMatches = ({ recentMatches } : { recentMatches:INestedObject }) => {
  return (
    <div className="">
      {recentMatches?.map((match :INestedObject) => (
        <div key={match.id}>
          <p className="px-3 text-secondary">
            {moment
              .unix(match?.starting_at_timestamp)
              .local()
              .format('DD MMM YYYY')}
          </p>
          <FixtureCard key={match.id} large={true} match={match} />
        </div>
      ))}
    </div>
  );
};

export default RecentTeamMatches;
