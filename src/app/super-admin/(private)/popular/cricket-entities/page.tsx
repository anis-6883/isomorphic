import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
// import SettingsMainForm from './components/SettingsMainForm';

const pageHeader = {
  title: 'Popular Cricket Entities',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Popular Cricket Entities',
    },
  ],
};

export const metadata = {
  ...metaObject('Popular Cricket Entities'),
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      {/* <SettingsMainForm /> */}
    </>
  );
}
