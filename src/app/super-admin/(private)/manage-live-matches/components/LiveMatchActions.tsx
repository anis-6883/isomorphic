'use client';

import PencilIcon from '@/components/icons/pencil';
import TrashIcon from '@/components/icons/trash';
import { ActionIcon } from '@/components/ui/action-icon';
import { Tooltip } from '@/components/ui/tooltip';
import { routes } from '@/config/routes';
import Link from 'next/link';
import { BsSortUpAlt } from 'react-icons/bs';
import { FaRegClone } from 'react-icons/fa';

type LiveMatchActionsProps = {
  id: number;
  description: string;
  handleDeleteModal: (data: { id: number; description: string }) => void;
};

export default function LiveMatchActions({
  id,
  description,
  handleDeleteModal,
}: LiveMatchActionsProps) {
  return (
    <div className="space-x-2">
      <Tooltip
        size="sm"
        content={() => 'Sources'}
        placement="top"
        color="invert"
      >
        <Link href={routes.manageLive.home}>
          <ActionIcon
            size="sm"
            variant="outline"
            aria-label={'Sorting Sources'}
          >
            <BsSortUpAlt className="h-4 w-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip size="sm" content={() => 'Clone'} placement="top" color="invert">
        <Link href={routes.manageLive.home}>
          <ActionIcon
            size="sm"
            variant="outline"
            aria-label={'Clone Live Match'}
          >
            <FaRegClone className="h-4 w-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip size="sm" content={() => 'Edit'} placement="top" color="invert">
        <Link href={routes.manageLive.edit(id)}>
          <ActionIcon
            size="sm"
            variant="outline"
            aria-label={'Edit Live Match'}
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Link>
      </Tooltip>
      <Tooltip
        size="sm"
        content={() => 'Delete'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Delete Live Match'}
          onClick={() => handleDeleteModal({ id, description })}
        >
          <TrashIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}
