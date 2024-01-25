import { metaObject } from '@/config/site.config';
import FootballFixtures from '../../components/FootballFixtures';

export const metadata = {
  ...metaObject(),
};

export default function Page() {
  return <FootballFixtures />;
}
