//implementing Backend
const nightmare = require("nightmare");
const Nightmare = nightmare();
const express = require("express");
const Express = express();
const cors = require("cors");
CONST MONGOO


Express.use(cors());

const url =
  "https://www.amazon.in/dp/B07WHSCG2C/ref=QAHzEditorial_en_IN_1?pf_rd_r=2VCXANG2DHFVMB52C9BR&pf_rd_p=28190779-68a3-4b32-a9a6-b13da9eb28c9&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-7&pf_rd_t=&pf_rd_i=1389401031&ie=UTF8&ref_=CLP_MH8_BSAffordable_1";

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

Express.get("/price", (req, res) => {
  res.send({
    price: priceTag,
  });
  console.log("success");
});

Express.listen(3000);
