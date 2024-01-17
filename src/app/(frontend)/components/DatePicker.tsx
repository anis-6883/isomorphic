import {
  setCheckLive,
  setSelectedDate,
} from '@/features/front-end/fixture/fixtureSlice';
import { RootState } from '@/features/store';
import getDateRange from '@/utils/get-date-range';
import 'flatpickr/dist/themes/dark.css';
import Flatpickr from 'react-flatpickr';
import { IoCalendarOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import FormattedDate from './FormattedDate';

export default function DatePicker({ live }: { live: boolean }) {
  const dispatch = useDispatch();
  const { checkLive, selectedDate } = useSelector(
    (state: RootState) => state.fixtureSlice
  );
  const dateRange = getDateRange(new Date(selectedDate));

  return (
    <div className="flex flex-col items-center">
      <div className=" relative w-full">
        <div className="grid h-full grid-cols-12 p-2">
          <div className="col-span-11 flex items-center justify-between px-2">
            {live && (
              <div
                onClick={() => dispatch(setCheckLive())}
                className={` ${
                  !checkLive ? 'bg-white text-error' : 'bg-[#F60049] text-white'
                } w-fit cursor-pointer rounded-md px-2 font-bold uppercase shadow-md`}
              >
                <span className="animate-pulse">Live</span>
              </div>
            )}
            {dateRange.map((date, index) => (
              <FormattedDate key={index} date={date} />
            ))}
          </div>

          <div className="relative col-span-1 my-auto flex items-center justify-center">
            <IoCalendarOutline className="absolute text-xl text-white " />

            <Flatpickr
              className="absolute h-6 w-6 cursor-pointer opacity-0"
              value={selectedDate}
              options={{
                onChange: function (selectedDates, dateStr) {
                  dispatch(setSelectedDate({ date: dateStr }));
                  // setIsRefetching(true);
                },
                disableMobile: true,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
