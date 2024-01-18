import PageHeader from '@/app/shared/page-header';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
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
        <Link href={routes.manageLive.create} className="w-full @lg:w-auto">
          <Button
            tag="span"
            className="w-full @lg:w-auto dark:bg-gray-100 dark:text-white dark:active:bg-gray-100"
          >
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add New Live
          </Button>
        </Link>
      </PageHeader>
      <LiveMatchIndex />
    </>
  );
}
