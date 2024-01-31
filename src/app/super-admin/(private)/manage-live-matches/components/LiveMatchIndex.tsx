'use client';

import { useGetLiveMatchesQuery } from '@/features/super-admin/live-match/liveMatchApi';
import { TModalElementType } from '@/types';
import { ColorScheme, MantineProvider, useMantineTheme } from '@mantine/core';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import moment from 'moment';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import LiveMatchActions from './LiveMatchActions';
import LiveMatchDeleteModal from './LiveMatchDeleteModal';

export default function LiveMatchIndex() {
  const { theme } = useTheme();
  const globalTheme = useMantineTheme();
  const [deleteItem, setDeleteItem] = useState<{
    id: number;
    description: string;
  } | null>(null);

  const [finalData, setFinalData] = useState([]);
  const [finalDataLoading, setFinalDataLoading] = useState(true);

  const {
    data: liveMatches,
    isLoading,
    isError,
    isFetching,
  } = useGetLiveMatchesQuery(undefined);

  useEffect(() => {
    if (!isLoading && !isError) {
      setFinalData(liveMatches?.data || []);
      setFinalDataLoading(false);
    }
  }, [isError, isLoading, liveMatches]);

  const handleDeleteModal = (deletedItem: {
    id: number;
    description: string;
  }) => {
    setDeleteItem(deletedItem);
    const modal = document.getElementById(
      'liveMatchDeleteModal'
    ) as TModalElementType;
    if (modal) {
      modal.showModal();
    }
  };

  const columns = useMemo<any>(
    () => [
      {
        accessorKey: 'team_one_name',
        header: 'Team One',
        id: 'team_one_image',
        Cell: ({
          row,
        }: {
          row: { original: { team_one_image: string; team_one_name: string } };
        }) => (
          <div className="flex items-center">
            {row?.original?.team_one_image ? (
              <Image
                className="h-10 w-10 rounded-full"
                src={row?.original?.team_one_image}
                width={0}
                height={0}
                sizes="100vw"
                alt={row?.original?.team_one_name}
              />
            ) : (
              <Image
                src="/default-placeholder.png"
                width={0}
                height={0}
                sizes="100vw"
                className="h-10 w-10 rounded-full"
                alt={row?.original?.team_one_name}
              />
            )}

            <span className="ml-2">{row?.original?.team_one_name}</span>
          </div>
        ),
      },
      {
        accessorKey: 'team_two_name',
        header: 'Team Two',
        id: 'team_two_image',
        Cell: ({
          row,
        }: {
          row: { original: { team_two_image: string; team_two_name: string } };
        }) => (
          <div className="flex items-center">
            {row?.original?.team_two_image ? (
              <Image
                className="h-10 w-10 rounded-full"
                src={row?.original?.team_two_image}
                width={0}
                height={0}
                sizes="100vw"
                alt={row?.original?.team_two_name}
              />
            ) : (
              <Image
                src="/default-placeholder.png"
                width={0}
                height={0}
                sizes="100vw"
                className="h-10 w-10 rounded-full"
                alt={row?.original?.team_two_name}
              />
            )}

            <span className="ml-2">{row?.original?.team_two_name}</span>
          </div>
        ),
      },
      {
        accessorKey: 'match_title',
        header: 'Title & Time',
        mantineTableHeadCellProps: {
          align: 'center',
        },
        mantineTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({
          row,
        }: {
          row: { original: { match_title: string; time: string } };
        }) => (
          <div>
            <p className="mb-1 text-center text-sm font-medium">
              {row.original.match_title}
            </p>
            <p className="text-center">
              {moment(row.original.time).format('MMMM Do YYYY / h:mm')}
            </p>
          </div>
        ),
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
          row: { original: { id: number; match_title: string } };
        }) => (
          <div>
            <LiveMatchActions
              id={row.original.id}
              handleDeleteModal={handleDeleteModal}
              description={`Are you sure you want to delete this "${row.original.match_title}" match?`}
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
    data: finalData, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    paginationDisplayMode: 'pages',
    mantinePaginationProps: {
      rowsPerPageOptions: ['5', '10', '20', '50', '100'],
      color: 'rgb(56, 114, 250)',
      withEdges: true,
    },
    rowCount: finalData.length as number,
    initialState: {
      density: 'xs',
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    enableDensityToggle: false,
    // enableFilters: false,
    // enableFullScreenToggle: false,
    // enableColumnVirtualization: false,
    // enableRowNumbers: true,
    // enablePinning: true,
    state: { isLoading: finalDataLoading, showProgressBars: isFetching },
    enableRowDragging: true,
    enableRowOrdering: true,
    enableSorting: false,
    autoResetPageIndex: false,
    mantineRowDragHandleProps: ({ table }) => ({
      onDragEnd: () => {
        const {
          draggingRow,
          hoveredRow,
        }: { hoveredRow: any; draggingRow: any } = table.getState();

        if (draggingRow && hoveredRow) {
          let copiedArray = [...(finalData as readonly any[])];
          const elementToMove = copiedArray.splice(
            draggingRow.index as number,
            1
          )[0];
          copiedArray.splice(hoveredRow.index, 0, elementToMove);

          const updatedArray = copiedArray.map((obj: any, index: number) => ({
            ...obj,
            position: index + 1,
          }));

          setFinalData(updatedArray as never[]);
        }
      },
    }),
  });

  return (
    <>
      <MantineProvider
        theme={{
          ...globalTheme,
          primaryShade: 5,
          colorScheme: (theme as ColorScheme) || 'light',
        }}
      >
        <MantineReactTable table={table} />
      </MantineProvider>
      <LiveMatchDeleteModal
        description={deleteItem?.description}
        id={deleteItem?.id}
      />
    </>
  );
}
