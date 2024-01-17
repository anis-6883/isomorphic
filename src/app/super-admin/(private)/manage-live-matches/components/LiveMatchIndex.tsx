'use client';

import { routes } from '@/config/routes';
import { useGetLiveMatchesQuery } from '@/features/super-admin/live-match/liveMatchApi';
import { ColorScheme, MantineProvider, useMantineTheme } from '@mantine/core';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

type Person = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: Person[] = [
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Zachary',
      lastName: 'Davis',
    },
    address: '261 Battle Ford',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Robert',
      lastName: 'Smith',
    },
    address: '566 Brakus Inlet',
    city: 'Westerville',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Yan',
    },
    address: '7777 Kuhic Knoll',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'John',
      lastName: 'Upton',
    },
    address: '722 Emie Stream',
    city: 'Huntington',
    state: 'Washington',
  },
  {
    name: {
      firstName: 'Nathan',
      lastName: 'Harris',
    },
    address: '1 Kuhic Knoll',
    city: 'Ohiowa',
    state: 'Nebraska',
  },
];

// export const metadata = {
//   ...metaObject('Enhanced Table'),
// };

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

export default function LiveMatchIndex() {
  const {
    data: liveMatches,
    isLoading,
    isError,
  } = useGetLiveMatchesQuery(undefined);

  if (!isLoading && !isError) {
    console.log('liveMatches: ', liveMatches);
  }

  const globalTheme = useMantineTheme();
  const { theme } = useTheme();

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'name.firstName', //access nested data with dot notation
        header: 'First Name',
      },
      {
        accessorKey: 'name.lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address', //normal accessorKey
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    paginationDisplayMode: 'pages',
    // enableDensityToggle: false,
    // enableFilters: false,
    // enableFullScreenToggle: false,
    // enableColumnVirtualization: false,
    // enableRowNumbers: true,
    // enablePinning: true,
    // state: { isLoading: loading },
  });

  return (
    <MantineProvider
      theme={{
        ...globalTheme,
        primaryShade: 5,
        colorScheme: (theme as ColorScheme) || 'light',
      }}
    >
      <MantineReactTable table={table} />
    </MantineProvider>
  );
}
