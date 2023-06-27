let board = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

// when page first loads
// $(document).ready(function () {
//   let url = "https://example.com/";
//   postData(url, { answer: 42 }).then((data) => {});
// });



// page scraper from https://hackernoon.com/how-to-build-a-web-scraper-with-nodejs

const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;

const website = 'https://quotes.toscrape.com/author/Albert-Einstein/';

try {
  axios(website).then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);

    let content = [];

    $(".sdc-site-tile__headline", data).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");

      content.push({
        title,
        url
      });

      app.get("/", (req, res) => {
        res.json(content);
      });
    });
  });
} catch (error) {
  console.log(error, error.message);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// Example POST method implementation from MDN
// async function postData(url, data = {}) {
//   const response = await fetch(url, {
//     method: "POST", // *GET, POST, PUT, DELETE, etc. (* default)
//     mode: "no-cors", // no-cors, *cors, same-origin
//     cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: "same-origin", // include, *same-origin, omit
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: "follow", // manual, *follow, error
//     referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }
