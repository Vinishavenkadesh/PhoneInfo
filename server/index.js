//implementing Backend
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const fs = require("fs");
const TrackModel = require("./models/TrackSchema");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
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
    const display = await Product.find({
      Name: { $regex: phoneModel, $options: "i" },
    });
    res.send(display);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

// TRACKING
app.post("/addtrack", async (req, res) => {
  const track = new TrackModel(req.body);
  try {
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(500).send(error);
  }
});

async function trackPrice(url, expectedPrice, email, site) {
  console.log("-----------CHECKING------------");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let tag;

  if (site === "amazon") {
    tag = ".a-price-whole";
    console.log("amazon");
  } else if (site === "flipkart") {
    tag = ".";
  } else {
    tag = "#price";
  }

  const price = await page.$eval(tag, (el) => el.textContent);
  console.log(price);

  if (price <= expectedPrice) {
    sendEmail(email, price, expectedPrice, url);
  } else {
    console.log("THE PRICE IS HIGH");
  }
  await browser.close();
}

async function sendEmail(email, price, expectedPrice, url) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // https://youtu.be/thAP7Fvrql4  <-- refer this video
        user: "vinishav.ece2020@citchennai.net", // enter you mail here
        pass: "welcometocit", // enter yor password but not the direct password app password
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });
    let info = await transporter.sendMail({
      from: "PhoneINFO",
      to: email,
      subject: "Request for a product",
      html: `
                <div>
                    <h2>This is a email from Phone Info</h2>
                    <p>The product that you have expected is reduced by its price : ${price}</p>
                    <a href = "${url}"> <h1>Go and check out your product</h1> </a>
                </div>`,
    });
    console.log(info.response);
    console.log(`successfully sent the email to : ${email}`);
  } catch (error) {
    console.log(error);
  }
}

app.get("/allTracks", async (req, res) => {
  const trackDetails = await TrackModel.find({});
  res.send(trackDetails);
});

async function trackContinuous() {
  const trackDetails = await TrackModel.find({});
  for (const track of trackDetails) {
    trackPrice(track.url, track.price, track.email, track.site);
  }
}

// setInterval(() => {
trackContinuous();
// }, 5000);

app.listen(8000);
