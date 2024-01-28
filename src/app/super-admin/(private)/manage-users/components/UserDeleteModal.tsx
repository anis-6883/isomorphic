import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from '@/features/super-admin/user/userApi';
import { TModalElementType } from '@/types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { CgSpinner } from 'react-icons/cg';

export default function UserDeleteModal({
  description,
  id,
}: {
  description: string | undefined;
  id: string | undefined;
}) {
  const { refetch } = useGetUsersQuery(undefined);
  const [deleteUser, { data, isLoading, isError, isSuccess }] =
    useDeleteUserMutation();

  const deleteHandler = () => {
    deleteUser(id);
  };

  useEffect(() => {
    if (isSuccess && data?.status && !isError) {
      const modal = document.getElementById(
        'userDeleteModal'
      ) as TModalElementType;
      if (modal) {
        modal.close();
      }
      refetch();
      toast.success(data?.message);
    }
  }, [data, isError, isSuccess, refetch]);

  return (
    <dialog id="userDeleteModal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">Delete Confirmation!</h3>
        <p className="py-4">{description}</p>
        <div className="flex justify-end">
          <button
            className="btn btn-error btn-sm text-white disabled:bg-[#b1032d] disabled:text-[#ffdde5]"
            onClick={deleteHandler}
            disabled={isLoading}
          >
            Confirm{' '}
            {isLoading && <CgSpinner className="ml-1 animate-spin text-sm" />}
          </button>
        </div>
      </div>
    </dialog>
  );
}
