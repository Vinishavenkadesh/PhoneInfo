//implementing Backend
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const TrackModel = require("./models/TrackSchema");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const Product = require("./models/mobileModels");
const Track = require("./models/TrackSchema");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000

dotenv.config({ path: "./.env" });

process.env.CI = true

// console.log(process.env.MONGOURL);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("MongoDB is connected");
    // importData();
  })
  .catch((error) => {
    console.log(error);
  });

const data = JSON.parse(
  fs.readFileSync("./models/phonesUpdated.json", "utf-8")
);

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
  // try {
  //   fs.writeFileSync("./models/phonesUpdated.json", JSON.stringify(allPhones))
  // } catch (err) {
  //   console.error(err)
  // }
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

async function trackPrice(id, url, expectedPrice, email, site) {
  console.log("-----------CHECKING------------");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  let tag;
  tag = ".a-price-whole";
  console.log(tag);
  if (site === "amazon") {
    tag = ".a-price-whole";
    console.log("Amazon");
  } else if (site === "flipkart") {
    tag = "._30jeq3";
    console.log("Flipkart");
  } else {
    tag = "#price";
  }

  // const price = await page.$eval(tag, (el) => el.textContent);
  // console.log(price);

  const priceGet = await page.$eval(tag, (el) => el.textContent);
  console.log(priceGet);
  const orgPriceStr = priceGet
    .replace(",", "")
    .replace(".", "")
    .replace("₹", "");
  const price = parseInt(orgPriceStr);

  if (price <= expectedPrice) {
    sendEmail(id, email, price, expectedPrice, url);
  } else {
    console.log("THE PRICE IS HIGH");
  }
  await browser.close();
}

async function sendEmail(id, email, price, expectedPrice, url) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "phoneinfo2k23@gmail.com",
        pass: process.env.EMAIL_TEST_APP_PSWD,
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
      <!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Email" />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>

  <body
    marginheight="0"
    topmargin="0"
    marginwidth="0"
    style="margin: 0px; background-color: #f2f3f8; overflow: hidden;"
    leftmargin="0"
  >
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#000000"
      style="
        @import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700);
        font-family: 'Open Sans', sans-serif;
      "
    >
      <tr>
        <td>
          <table
            style="background-color: #000000; max-width: 670px; margin: 0 auto"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
               <h1 style="color:whitesmoke">Phone<span style="color:teal">Info</span></h1>
                </a>
              </td>
            </tr>
            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="
                    max-width: 670px;
                   background-image: linear-gradient(to bottom right,teal, black);
                    border-radius: 3px;
                    text-align: center;
                    -webkit-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    -moz-box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.06);
                  "
                >
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                  <tr>
                    <td style="padding: 0 35px">
                        <h1 style="font-weight: 600;
                        font-size: 35px;
                        color: whitesmoke;">Woohoo!</h1>
                      <h1
                        style="
                          color: whitesmoke;
                          font-weight: 300;
                          margin: 0;
                          font-size: 20px;
                          font-family: 'Rubik', sans-serif;
                        "
                      >
                        The product that you have been added in PhoneInfo is reduced its price below your budget level.
                      </h1>
                      <span
                        style="
                          display: inline-block;
                          vertical-align: middle;
                          margin: 29px 0 26px;
                          border-bottom: 1px solid #e9e3e3;
                          width: 100px;
                        "
                      ></span>
                      <h1
                      <p
                       <h1   style="
                       color: #d9f3f3;
                       font-size: 15px;
                       line-height: 24px;
                       margin: 0;
                     "
                   >
                    Your Budget : ₹${expectedPrice}
                    </h1>
                    <h1
                    <p
                     <h1   style="
                     color: #d9f3f3;
                     font-size: 15px;
                     line-height: 24px;
                     margin: 0;
                   "
                 >
                  Current Price : ₹${price}
                  </h1>
                    
                      <a
                        href="${url}"
                        style="
                          background: teal;
                          text-decoration: none !important;
                          font-weight: 500;
                          margin-top: 35px;
                          color: #fff;
                          text-transform: uppercase;
                          font-size: 14px;
                          padding: 10px 24px;
                          display: inline-block;
                          border-radius: 50px;
                        "
                        >Get Now</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td style="height: 40px">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="height: 20px">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align: center">
                <p
                  style="
                    font-size: 14px;
                    color: rgba(101, 113, 119, 0.741);
                    line-height: 18px;
                    margin: 0 0 0;
                  "
                >
                  &copy; <strong>www.PhoneInfo.com</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height: 80px">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
      `,
    });
    console.log(info.response);
    console.log(`successfully sent the email to : ${email}`);
    try {
      await Track.deleteOne({ _id: id });
    } catch (error) {
      console.log(error)
    }
    
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
    await trackPrice(
      track._id,
      track.url,
      track.price,
      track.email,
      track.site
    );
  }
}

// setInterval(() => {
// trackContinuous();
// }, 5000);

async function dailyPriceTracking() {
  console.log("-----------PRICE TRACKING------------");

  const allPhones = await Product.find({});

  // getting today value
  var today = new Date();
  // var dd = String(today.getDate()).padStart(2, "0");
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // var yyyy = today.getFullYear();
  // today = mm + "/" + dd + "/" + yyyy;
  today = 03 + "/" + 13 + "/" + 2023;

  for (const phone of allPhones) {
    console.log(phone.Name);
    const priceArr = phone.Price;
    console.log(priceArr);

    if (priceArr[priceArr.length - 1].date !== today) {
      try {
        //
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(phone.Amazon);

        const price = await page.$eval(
          ".a-price-whole",
          (el) => el.textContent
        );
        await browser.close();

        // price parsing
        const orgPriceStr = price.replace(",", "").replace(".", "");
        const priceInt = parseInt(orgPriceStr);

        priceArr.push({
          date: today,
          value: priceInt,
        });

        console.log(`The ${phone.Name} current price is : `, priceInt);

        //updating the price value array
        await Product.findByIdAndUpdate(phone._id, {
          $set: {
            Price: priceArr,
          },
        });
        console.log("UPDATED SUCCESSFULLY");
      } catch (error) {
        console.log(error.message);
        console.log(priceArr[priceArr.length - 1]);
        await Product.findByIdAndUpdate(phone._id, {
          $set: {
            Price: priceArr[priceArr.length - 1],
          },
        });
      }
    }
  }
}

// setInterval(() => {
// dailyPriceTracking();
// }, 86400000);


app.get("/",(req,res)=>{
 res.send(`Server running Successfully`)
})
app.listen(PORT , ()=>{
  console.log(`Listening to the port ` + PORT)
});
