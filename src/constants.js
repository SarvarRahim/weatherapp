export const citiesList = [
  "Andijan",
  "Bukhoro",
  "Fergana",
  "Jizzakh",
  "Khorezm",
  "Khorazm",
  "Navoiy",
  "Qashqadaryo",
  "Samarqand",
  "Surkhondaryo",
  "Toshkent",
];

export const dayOfTheWeek = (day, month, year) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};
