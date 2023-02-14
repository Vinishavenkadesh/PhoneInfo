//implementing Backend
const nightmare = require("nightmare");
const Nightmare = nightmare();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");

const Product = require("./models/mobileModels");
app.use(express.json());
app.use(cors());

dotenv.config({ path: "./.env" });

console.log(process.env.MONGOURL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("MongoDB is connected");
    // importData();=>importing of database function
  })
  .catch((error) => {
    console.log(error);
  });


// const data = JSON.parse(fs.readFileSync("./models/phones.jsonzz", "utf-8"));

// const importData = async () => {
//   try {
//     await Product.create(data);
//     console.log("data successfully imported");
//     // to exit the process
//     process.exit();
//   } catch (error) {
//     console.log("error", error);
//   }
// };

app.get("/allphones", async (req, res) => {
  const allPhones = await Product.find({});
  res.send(allPhones);
});

app.get("/allphones/:phonename", async (req, res) => {
  try {
    const phoneModel = req.params.phonename;
    const display = await Product.find({"Name":{$regex:phoneModel,$options:'i'}})
    res.send(display);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
// const url =
//   "https://www.amazon.in/dp/B07WHSCG2C/ref=QAHzEditorial_en_IN_1?pf_rd_r=2VCXANG2DHFVMB52C9BR&pf_rd_p=28190779-68a3-4b32-a9a6-b13da9eb28c9&pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=merchandised-search-7&pf_rd_t=&pf_rd_i=1389401031&ie=UTF8&ref_=CLP_MH8_BSAffordable_1";

// let priceTag;
// async function checkPrice() {
//   await Nightmare.goto(url)
//     .wait(".a-price-whole")
//     .evaluate(() => document.querySelector(".a-price-whole").innerText)
//     .end()
//     .then((val) => {
//       priceTag = val;
//       console.log("Inside the function:", priceTag);
//     });
// }
// checkPrice();
// console.log("Outside the function:", priceTag);

// app.get("/price", (req, res) => {
//   res.send({
//     price: priceTag,
//   });
//   console.log("success");
// });

app.listen(8000);
