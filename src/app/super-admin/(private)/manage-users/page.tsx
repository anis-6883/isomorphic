import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi2';
import ManageUserIndex from './components/ManageUserIndex';

const pageHeader = {
  title: 'Manage Users',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Manage Users',
    },
  ],
};

export const metadata = {
  ...metaObject('Manage Users'),
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.manageUser}
          className="btn btn-primary btn-sm text-white"
        >
          <HiPlus className="text-lg" /> Add New User
        </Link>
      </PageHeader>
      <ManageUserIndex />
    </>
  );
}
