import { metaObject } from '@/config/site.config';
import Fixtures from '../components/Fixtures';

export const metadata = {
  ...metaObject(),
};

export default function Page() {
  return <Fixtures/>;
}
