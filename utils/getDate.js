const formatData = (input) => {
  if (input > 9) {
    return input;
  } else return `0${input}`;
};

const formatHour = (input) => {
  if (input > 12) {
    return input - 12;
  }
  return input;
};

export function getTimeAndDate(){
  const date = new Date();

const format = {
  dd: formatData(date.getDate()),
  mm: formatData(date.getMonth() + 1),
  yyyy: date.getFullYear(),
  HH: formatData(date.getHours()),
  hh: formatData(formatHour(date.getHours())),
  MM: formatData(date.getMinutes()),
  SS: formatData(date.getSeconds()),
};
  return `${format.mm}/${format.dd}/${format.yyyy} ${format.HH}:${format.MM}:${format.SS}`;

}