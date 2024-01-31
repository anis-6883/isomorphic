import moment from 'moment';

export function convertTimestampToFormattedDate(timestamp: number) {
  const date = moment.unix(timestamp);
  const formattedDate = date.format('HH:mm');
  return formattedDate;
}
