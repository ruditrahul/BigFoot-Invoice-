const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const data = require("./data.json");

console.log(data);

let count = 1;

var templateHtml = fs.readFileSync(
  path.join(process.cwd(), "index.html"),
  "utf8"
);
var template = handlebars.compile(templateHtml);
var html = template(data);

(async () => {
  // launch a new chrome instance
  const browser = await puppeteer.launch({
    headless: true,
  });

  // create a new page
  const page = await browser.newPage();

  // set your html as the pages content
  await page.setContent(html, {
    waitUntil: "domcontentloaded",
  });

  // or a .pdf file
  await page.pdf({
    format: "A4",
    path: `${__dirname}/invoice${count}.pdf`,
  });

  count = count + 1;
  console.log("Pdf Generated Done");

  // close the browser
  await browser.close();
})();
