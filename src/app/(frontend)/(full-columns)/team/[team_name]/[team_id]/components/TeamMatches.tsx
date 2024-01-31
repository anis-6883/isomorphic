import UpcomingTeamMatches from './TeamMatches/UpcomingTeamMatches';

export default function TeamMatches({ teamDetails }:{ teamDetails:any }) {
  const upcomingMatches = teamDetails?.upcoming;
  const recentMatches = teamDetails?.latest;
  // const [currentTab, setCurrentTab] = useState(0);

  // const matchesTabs = ['Upcoming', 'Recent'];

  // const matchTabContents = [
  //   <UpcomingTeamMatches
  //     key={'team_matches_tab_001'}
  //     teamId={teamId}
  //     upcomingMatches={upcomingMatches}
  //     recentMatches={recentMatches}
  //   />,
  // ];

  // const handleTabChange = (tab) => {
  //   setCurrentTab(tab);
  // };

  return (
    <div className="rounded-2xl border-[1px] border-primary pb-5">
      <div className="mt-3">
        <UpcomingTeamMatches
          upcomingMatches={upcomingMatches}
          recentMatches={recentMatches}
        />
      </div>
    </div>
  );
}
