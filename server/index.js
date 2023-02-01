const nightmare = require("nightmare");
const Nightmare = nightmare();
const express = require("express");
const Express = express();
// express import
const url =
  "https://www.amazon.in/dp/B09WQY65HN/ref=?pf_rd_r=A3SGG6CCANF9GXKZPZME&pf_rd_p=a3ffd7d5-0dd2-4d6e-baee-351f6aed1a61&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-9&pf_rd_t=&pf_rd_i=1389401031&ie=UTF8&ref_=CLP_MH9_BSMidrange_1&th=1";

let priceTag;
async function checkPrice() {
  await Nightmare.goto(url)
    .wait(".a-price-whole")
    .evaluate(() => document.querySelector(".a-price-whole").innerText)
    .end()
    .then((val) => {
      priceTag = val;
      console.log("Inside the function:", priceTag);
    });
}
checkPrice();
console.log("Outside the function:", priceTag);
//get function
//listen

