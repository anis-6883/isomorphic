import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi2';
import LiveMatchIndex from './components/LiveMatchIndex';

const pageHeader = {
  title: 'Manage Live',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Live Matches',
    },
  ],
};

export const metadata = {
  ...metaObject('Manage Live'),
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.manageLive.create}
          className="btn btn-primary btn-sm text-white"
        >
          <HiPlus className="text-lg" /> Add New Live
        </Link>
      </PageHeader>
      <LiveMatchIndex />
    </>
  );
}
