'use client';

import PencilIcon from '@/components/icons/pencil';
import TrashIcon from '@/components/icons/trash';
import { ActionIcon } from '@/components/ui/action-icon';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Text, Title } from '@/components/ui/text';
import { Tooltip } from '@/components/ui/tooltip';
import { routes } from '@/config/routes';
import {
  useDeleteLiveMatchMutation,
  useGetLiveMatchesQuery,
} from '@/features/super-admin/live-match/liveMatchApi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsSortUpAlt } from 'react-icons/bs';
import { FaRegClone } from 'react-icons/fa';
import { ImSpinner3 } from 'react-icons/im';
import { PiTrashFill } from 'react-icons/pi';

type LiveMatchActionsProps = {
  id: string;
  title: string;
  description: string;
};

export default function LiveMatchActions({
  id,
  title,
  description,
}: LiveMatchActionsProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { refetch } = useGetLiveMatchesQuery(undefined);
  const [deleteLiveMatch, { data, isLoading, isError, isSuccess }] =
    useDeleteLiveMatchMutation();

  const deleteHandler = () => {
    deleteLiveMatch(id);
  };

  useEffect(() => {
    if (isSuccess && data?.status && !isError) {
      setPopoverOpen(false);
      refetch();
      toast.success(data?.message);
    }
  }, [data, isError, isSuccess, refetch]);

  return (
    <div className="space-x-2">
      <Tooltip
        size="sm"
        content={() => 'Sources'}
        placement="top"
        color="invert"
      >
        <Link href={routes.manageLive.home}>
          <ActionIcon size="sm" variant="outline" aria-label={'Edit Product'}>
            <BsSortUpAlt className="h-4 w-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip size="sm" content={() => 'Clone'} placement="top" color="invert">
        <Link href={routes.manageLive.home}>
          <ActionIcon size="sm" variant="outline" aria-label={'Edit Product'}>
            <FaRegClone className="h-4 w-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip size="sm" content={() => 'Edit'} placement="top" color="invert">
        <Link href={routes.manageLive.home}>
          <ActionIcon size="sm" variant="outline" aria-label={'Edit Product'}>
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Popover
        isOpen={popoverOpen}
        placement="left"
        className="z-50"
        content={() => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="me-1.5 h-7"
                onClick={deleteHandler}
                disabled={isLoading}
              >
                Yes{' '}
                {isLoading && (
                  <ImSpinner3 className="ml-1 animate-spin text-sm" />
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                disabled={isLoading}
                onClick={() => setPopoverOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        )}
      >
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Delete Item'}
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
        >
          <TrashIcon
            className="h-4 w-4"
            onClick={() => setPopoverOpen(!popoverOpen)}
          />
        </ActionIcon>
      </Popover>
    </div>
  );
}
