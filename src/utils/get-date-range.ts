export default function getDateRange(initialDate: Date | undefined) {
  const currentDate = initialDate ? new Date(initialDate) : new Date();

  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 2);

  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + 2);

  const dayList = getDaysArray(startDate, endDate);
  const formattedDateRange = dayList.map((date) => formatDate(date));

  return formattedDateRange;
}

const getDaysArray = (startDate: Date, endDate: Date) => {
  const daysArray = [];
  for (
    let currentDate = new Date(startDate);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    daysArray.push(new Date(currentDate));
  }
  return daysArray;
};

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};
