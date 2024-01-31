'use client';

import getDateRange from '@/utils/get-date-range';
import { Instance } from 'flatpickr/dist/types/instance';
import React, { useRef, useState } from 'react';
import DatePicker from './DatePicker';
import FixtureList from './FixtureList';

export default function FixtureContainer() {
  const [isFetching, setIsFetching] = useState(true);
  const dateList = getDateRange(undefined);
  const flatpickrRef: React.RefObject<{ flatpickr: Instance }> = useRef(null);
  const [dates, setDates] = useState(dateList);
  const [pickerDate, setPickerDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const handleDate = (date: string) => {
    setIsFetching(true);
    const newDate = new Date(date);
    const dateList = getDateRange(newDate);
    setDates(dateList);
    setPickerDate(date);
    flatpickrRef?.current?.flatpickr?.setDate(date);
  };

  return (
    <div>
      <DatePicker ref={flatpickrRef} dates={dates} handleDate={handleDate} />
      <FixtureList pickerDate={pickerDate} />
    </div>
  );
}
