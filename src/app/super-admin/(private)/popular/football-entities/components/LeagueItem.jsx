import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { ImBin } from 'react-icons/im';
import { MdDragIndicator } from 'react-icons/md';

function LeagueItem({ league, selectPointTableHandler, deleteLeagueHandler }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: league.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      className="mb-2 rounded-md bg-slate-100 p-2"
      ref={setNodeRef}
      style={style}
    >
      <div className="grid grid-cols-8 gap-4 md:grid-cols-12">
        <div className="col-span-12 flex items-center md:col-span-4">
          <MdDragIndicator
            className="cursor-grab text-xl outline-none"
            {...attributes}
            {...listeners}
          />
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-[40px] rounded-full"
            src={league?.image_path}
            alt="Logo"
          />
          <span className="ml-2 font-medium">{league?.name}</span>
        </div>
        <div className="col-span-12 flex items-center justify-center md:col-span-4">
          <div className="flex items-center gap-3">
            <span>Select Point Table</span>
            <input
              type="radio"
              name="select-point-table"
              className="radio-error radio"
              onChange={() => selectPointTableHandler(league.id)}
              checked={league.show_point_table === 1}
            />
          </div>
        </div>
        <div className="col-span-12 flex items-center justify-center md:col-span-4">
          <button
            className="btn btn-error btn-sm text-white"
            onClick={() => deleteLeagueHandler(league)}
          >
            Delete <ImBin className="text-base" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeagueItem;
