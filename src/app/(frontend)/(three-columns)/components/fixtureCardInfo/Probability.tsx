'use client';

import ProbabilityCol1 from './ProbabilityCol1';
import ProbabilityCol2 from './ProbabilityCol2';
export default function Probability() {
  return (
    <div className="grid grid-cols-2 py-2 rounded-lg">
      <div>
        <ProbabilityCol1 />
      </div>

      <div className="">
        <ProbabilityCol2 />
      </div>
    </div>
  );
}
