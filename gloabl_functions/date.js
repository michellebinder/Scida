export default function dateToWeekParser(dateStart, dateEnd) {
  if (dateStart == undefined) {
    //Error case
    dateStart = "0000-00-00";
  }
  if (dateEnd == undefined) {
    //Error case
    dateEnd = "0000-00-00";
  }
  let dateString = "";
  dateString =
    dateStart.substring(8, 10) +
    "." +
    dateStart.substring(5, 7) +
    ". - " +
    dateEnd.substring(8, 10) +
    "." +
    dateEnd.substring(5, 7) +
    "." +
    dateEnd.substring(0, 4);
  return dateString;
}

export function dateParser(date) {
  if (date == undefined) {
    //Error case
    date = "0000-00-00";
  }
  let dateString = "";
  dateString =
    date.substring(8, 10) +
    "." +
    date.substring(5, 7) +
    "." +
    date.substring(0, 4);
  return dateString;
}

export function stringToDate(date) {
  // Assuming it's the year 2023
  const yearPrefix = "20";
  // Parse the input date
  const [day, month, year] = date.split(".");
  // Assuming it's the year 2023, you can adjust this as needed
  const fullYear = yearPrefix + year;
  // Format it as YYYY-MM-DD
  const outputDate = fullYear + "-" + month + "-" + day;
  return outputDate;
}
