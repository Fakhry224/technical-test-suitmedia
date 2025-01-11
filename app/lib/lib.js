export const imageParser = (content) => {
  if (!content)
    return `/images/dummy-photo-${Math.round(Math.random() * 1) + 1}.jpg`;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");

  const images = doc.querySelectorAll("img");

  for (const image of images) {
    const src = image.getAttribute("src");
    if (src && src.endsWith(".jpg")) {
      console.log("URL Cover valid dengan ekstensi .jpg:", src);
      return src;
    }
  }

  console.log("Tidak ada gambar dengan ekstensi .jpg.");
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
