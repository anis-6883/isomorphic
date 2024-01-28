import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';

const pageHeader = {
  title: 'Fixtures',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Fixtures',
    },
    {
      name: 'Cricket',
    },
  ],
};

export const metadata = {
  ...metaObject('Fixtures - Cricket'),
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
    </>
  );
}
