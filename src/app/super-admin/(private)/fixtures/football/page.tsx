import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import FixtureContainer from './components/FixtureContainer';

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
      name: 'Football',
    },
  ],
};

export const metadata = {
  ...metaObject('Fixtures - Football'),
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <FixtureContainer />
    </>
  );
}
