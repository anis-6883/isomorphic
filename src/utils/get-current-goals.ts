import { Score } from "@/types";

  export function getCurrentGoals(scores: Score[] | undefined): { tOne: number; tTwo: number } {
    let tOne = 0;
    let tTwo = 0;
  
    scores?.forEach((item) => {
      if (item.description === 'CURRENT') {
        if (item?.score?.participant === 'home') {
          tOne = item?.score?.goals || 0;
        } else if (item?.score?.participant === 'away') {
          tTwo = item?.score?.goals || 0;
        }
      }
    });
  
    return { tOne, tTwo };
  }