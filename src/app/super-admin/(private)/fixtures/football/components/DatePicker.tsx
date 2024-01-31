import getDay from '@/utils/get-day';
import getIsToday from '@/utils/get-is-today';
import getMonth from '@/utils/get-month';
import 'flatpickr/dist/themes/dark.css';
import Image from 'next/image';
import React from 'react';
import Flatpickr from 'react-flatpickr';

function DatePicker(
  { dates, handleDate }: { dates: any; handleDate: any },
  flatpickrRef: any
) {
  return (
    <div className="grid grid-cols-1 gap-6 pt-5">
      <div className="panel">
        <div className="mb-5 flex items-center justify-between">
          <h5 className="dark:text-white-light text-lg font-semibold">
            Pick Your Date
          </h5>
        </div>
        <div className="mb-5 flex items-center justify-center overflow-x-scroll md:overflow-x-auto">
          <div className="m-auto flex w-9/12 justify-center border-b-[2px] border-dashed border-[#eaeaea] pb-5">
            {dates.map((item: any, index: number) => (
              <div
                onClick={() => handleDate(item)}
                key={index}
                className="flex justify-center"
              >
                <div
                  className={`ml-2 min-w-[5rem] cursor-pointer select-none rounded-full px-4 py-1  ${
                    index == 2
                      ? 'bg-primary font-bold text-white'
                      : 'bg-slate-100 font-medium text-slate-500'
                  }`}
                >
                  <div>
                    <span className="block text-center">
                      {getIsToday(item) ? 'TODAY' : getDay(item)}
                    </span>
                    <span className="m-0 block text-center">
                      {item.slice(8, 10)} {getMonth(item)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="ml-2 flex min-w-[5rem] cursor-pointer items-center justify-center rounded-full bg-slate-500">
              <Flatpickr
                ref={flatpickrRef}
                render={({ defaultValue, value, ...props }, ref) => (
                  <div ref={ref}>
                    <Image
                      src="/images/calendar.png"
                      alt="logo"
                      width={0}
                      // {...props}
                      height={0}
                      sizes="100vw"
                      className="h-6 w-6 cursor-pointer"
                    />
                  </div>
                )}
                options={{
                  onChange: function (selectedDates, dateStr) {
                    handleDate(dateStr);
                  },
                  disableMobile: true,
                }}
                className="form-input"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const forwardedDatePicker = React.forwardRef(DatePicker);

export default forwardedDatePicker;
