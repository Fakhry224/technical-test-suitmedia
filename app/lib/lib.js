export const imageParser = (content) => {
  return `/images/dummy-photo-${Math.round(Math.random() * 1) + 1}.jpg`;
};

export const publishedDateConverter = (dateString) => {
  const months_arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = months_arr[date.getMonth()];
  const day = date.getDate();

  return day + " " + month + " " + year;
};
