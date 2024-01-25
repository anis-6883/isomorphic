import CricketFixtures from '@/app/(frontend)/components/CricketFixtures';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(),
};

export default function Page() {
  return <CricketFixtures />;
}
