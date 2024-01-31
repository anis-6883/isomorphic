import { useGetFixturesMatchStatisticsByIdQuery } from '@/features/front-end/fixture/fixtureApi';
import { INestedObject, Team } from '@/types';

export default function MatchStates({ matchData }:{matchData:INestedObject}) {
  const { isLoading: matchStatisticsLoading, data: matchStatisticsData } =
    useGetFixturesMatchStatisticsByIdQuery(matchData?.data.id);
  if (matchStatisticsLoading) {
    return <>Loading ....</>;
  }

  // Extract relevant statistics for home and away teams
  const homeTeamStats = matchStatisticsData?.data.statistics.filter(
    (stat : Team) => stat?.location === 'home'
  );
  const awayTeamStats = matchStatisticsData?.data.statistics.filter(
    (stat : Team) => stat?.location === 'away'
  );

  // Define the statistics you want to include in the formatted data
  const desiredStats = [
    {
      name: 'Possession',
      code: 'ball-possession',
      state: { home: 0, away: 0 },
    },
    { name: 'Total Shots', code: 'shots-total', state: { home: 0, away: 0 } },
    { name: 'Shots on Target', code: '', state: { home: 0, away: 0 } },
    { name: 'Fouls', code: 'fouls', state: { home: 0, away: 0 } },
    { name: 'Offsides', code: 'offsides', state: { home: 0, away: 0 } },
    { name: 'Corners Kicks', code: 'corners', state: { home: 0, away: 0 } },
    { name: 'Yellow Cards', code: 'yellowcards', state: { home: 0, away: 0 } },
    { name: 'Red Cards', code: 'redcards', state: { home: 0, away: 0 } },
  ];

  // Format the statistics for home team
  homeTeamStats.forEach((stat:INestedObject) => {
    const statType = stat.type.code;
    const formattedStat = desiredStats?.find((item) => item.code === statType);

    if (formattedStat) {
      formattedStat.state.home = stat.data.value;
    }
  });

  // Format the statistics for away team
  awayTeamStats.forEach((stat :INestedObject) => {
    const statType = stat.type.code;
    const formattedStat = desiredStats?.find((item) => item.code === statType);

    if (formattedStat) {
      formattedStat.state.away = stat.data.value;
    }
  });

  return (
    <div className="mb-20 mt-10 text-sm text-gray-500 md:mb-8">
      {desiredStats.map((stat, index) => (
        <div key={index} className="mx-auto w-fit ">
          <div className="mt-3 flex items-center justify-between">
            <h4 className="font-normal">{stat.state.home}</h4>
            <p>{`${stat.name} (%)`}</p>
            <h4 className="font-normal">{stat.state.away}</h4>
          </div>
          <div className="mt-3 flex gap-5">
            <progress
              className="progress progress-primary w-36 rotate-180 rounded-r-lg md:w-72"
              value={stat.state.home}
              max={stat.state.home + stat.state.away}
            ></progress>
            <progress
              className="progress progress-primary w-36 rounded-r-lg md:w-72"
              value={stat.state.away}
              max={stat.state.home + stat.state.away}
            ></progress>
          </div>
        </div>
      ))}
    </div>
  );
}
