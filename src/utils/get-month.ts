export default function getMonth(date: string) {
  var newDate = new Date(date);
  return newDate.toLocaleString('en-US', { month: 'short' });
}
