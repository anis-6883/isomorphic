import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import LiveMatchCreate from '../components/LiveMatchCreate';

const pageHeader = {
  title: 'Create A Live Match',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      href: routes.manageLive.home,
      name: 'Live Matches',
    },
    {
      name: 'Create',
    },
  ],
};

export const metadata = {
  ...metaObject('Manage Live'),
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <LiveMatchCreate />
    </>
  );
}
