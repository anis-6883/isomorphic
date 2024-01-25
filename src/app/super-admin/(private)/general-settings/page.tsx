import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import SettingsMainForm from './components/SettingsMainForm';

const pageHeader = {
  title: 'General Settings',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'General Settings',
    },
  ],
};

export const metadata = {
  ...metaObject('General Settings'),
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>
      <SettingsMainForm />
    </>
  );
}
