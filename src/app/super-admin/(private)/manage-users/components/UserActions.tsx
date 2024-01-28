'use client';

import PencilIcon from '@/components/icons/pencil';
import TrashIcon from '@/components/icons/trash';
import { ActionIcon } from '@/components/ui/action-icon';
import { Tooltip } from '@/components/ui/tooltip';

type UserActionsProps = {
  id: string;
  description: string;
  handleDeleteModal: (deletedItem: { id: string; description: string }) => void;
};

export default function UserActions({
  id,
  description,
  handleDeleteModal,
}: UserActionsProps) {
  return (
    <div className="space-x-2">
      <Tooltip size="sm" content={() => 'Edit'} placement="top" color="invert">
        <ActionIcon size="sm" variant="outline" aria-label={'Edit Live Match'}>
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
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
