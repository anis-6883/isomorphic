import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Admin Dashboard'),
};

export default function Page() {
  return <FileDashboard />;
}
