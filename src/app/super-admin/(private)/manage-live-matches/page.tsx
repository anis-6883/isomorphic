'use client';

import { routes } from '@/config/routes';
import LiveMatchIndex from './components/LiveMatchIndex';

const pageHeader = {
  title: 'Enhanced Table',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Enhanced',
    },
  ],
};

export default function Page() {
  return <LiveMatchIndex />;
}
