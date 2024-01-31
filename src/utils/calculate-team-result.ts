export function calculateTeamResults(teamId: number, matches: any) {
  const results: any[] = [];

  matches.forEach((match: any) => {
    const teamOne = match.team_one;
    const teamTwo = match.team_two;

    if (teamOne.id === teamId) {
      if (teamOne.goal > teamTwo.goal) {
        results.push('win');
      } else if (teamOne.goal < teamTwo.goal) {
        results.push('lose');
      } else {
        results.push('draw');
      }
    } else if (teamTwo.id === teamId) {
      if (teamTwo.goal > teamOne.goal) {
        results.push('win');
      } else if (teamTwo.goal < teamOne.goal) {
        results.push('lose');
      } else {
        results.push('draw');
      }
    }
  });

  return results;
}
