'use client';

import { useGetUsersQuery } from '@/features/super-admin/user/userApi';
import { TModalElementType } from '@/types';
import { ColorScheme, MantineProvider, useMantineTheme } from '@mantine/core';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import { useTheme } from 'next-themes';
import { useMemo, useState } from 'react';
import UserActions from './UserActions';
import UserDeleteModal from './UserDeleteModal';

export default function ManageUserIndex() {
  const { theme } = useTheme();
  const globalTheme = useMantineTheme();
  const { data: users, isLoading, isFetching } = useGetUsersQuery(undefined);
  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    description: string;
  } | null>(null);

  const handleDeleteModal = (deletedItem: {
    id: string;
    description: string;
  }) => {
    setDeleteItem(deletedItem);
    const modal = document.getElementById(
      'userDeleteModal'
    ) as TModalElementType;
    if (modal) {
      modal.showModal();
    }
  };

  interface IUser {
    _id: string;
    phone: string;
    name: string;
    email: string;
    status: string;
    country: string;
  }

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: 'phone',
        header: 'Phone',
        id: 'phone',
      },
      {
        accessorKey: 'country',
        header: 'Country',
        id: 'country',
      },
      {
        accessorKey: 'name',
        header: 'Name',
        id: 'name',
      },
      {
        accessorKey: 'Email',
        header: 'Email',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        columnDefType: 'display',
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ row }: { row: { original: { status: string } } }) => {
          return row.original.status == '1' ? (
            <span className="badge rounded-full bg-success">Active</span>
          ) : (
            <span className="bg-danger badge rounded-full">Inactive</span>
          );
        },
      },
      {
        id: 'edit',
        header: 'Action',
        columnDefType: 'display',
        enableColumnOrdering: false,
        Cell: ({
          row,
        }: {
          row: { original: { _id: string; phone: string } };
        }) => (
          <div>
            <UserActions
              id={row.original._id}
              handleDeleteModal={handleDeleteModal}
              description={`Are you sure you want to delete this "${row.original.phone}" user?`}
            />
          </div>
        ),
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: users?.data || [], //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    paginationDisplayMode: 'pages',
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '20', '50', '100'],
      color: 'rgb(56, 114, 250)',
      withEdges: true,
    },
    rowCount: users?.data.length as number,
    initialState: {
      density: 'xs',
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    enableDensityToggle: false,
    enableRowNumbers: true,
    state: { isLoading: isLoading, showProgressBars: isFetching },
  });

  return (
    <div>
      <MantineProvider
        theme={{
          ...globalTheme,
          primaryShade: 5,
          colorScheme: (theme as ColorScheme) || 'light',
        }}
      >
        <MantineReactTable table={table} />
      </MantineProvider>
      <UserDeleteModal
        description={deleteItem?.description}
        id={deleteItem?.id}
      />
    </div>
  );
}
