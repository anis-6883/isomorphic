export default function getIsToday(date: string) {
  const today = new Date();
  const givenDate = new Date(date);
  return today.toDateString() === givenDate.toDateString();
}
