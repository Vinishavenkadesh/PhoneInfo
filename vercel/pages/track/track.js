const submitTrackForm = document.getElementById("submitTrackForm");

const trackimg1 = new URL("/Track_img.jpg", import.meta.url).href;
document.getElementById(
  "trackimg1"
).style.backgroundImage = `url(${trackimg1})`;
const trackimg2 = new URL("/Track_img.jpg", import.meta.url).href;
document.getElementById(
  "trackimg2"
).style.backgroundImage = `url(${trackimg2})`;

submitTrackForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target[0].value;
  let site = e.target[1].value;
  let url = e.target[2].value;
  let price = e.target[3].value;
  let email = e.target[4].value;

  console.table(username, site, url, price, email);

  let body = {
    name: username,
    url: url,
    price: price,
    email: email,
    site: site,
  };

  // let host = "http://localhost:8000/addtrack";
  let host = "https://phoneinfo-rpzt.onrender.com/addtrack";
  fetch(host, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("SUCCESSFULLY ADDED YOUR TRACK");
    })
    .then(() => {
      window.location = "/index.html";
    })
    .catch((err) => alert(err));
});
