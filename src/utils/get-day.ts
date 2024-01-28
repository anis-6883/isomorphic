export default function getDay(date: string) {
  var newDate = new Date(date);
  return newDate.toString().split(' ')[0];
}
