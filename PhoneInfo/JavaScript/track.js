const tracking = document.querySelector("#track");
let phonesArr;

const url = "https://phone-specs-api.azharimm.dev/latest";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    phonesArr = data.data.phones;
    buildPhones(phonesArr);
  });

function buildPhones(phonesArr) {
  phonesArr.forEach(async (val) => {
    const details = val.detail;
    let specs = await gettingDetails(details);
    tracking.innerHTML += ` 
        <div class = "phoneDiv"><h1 class = "phonename">${val.phone_name}</h1>
          <img class="image" src=${val.image} onclick = phoneExplanation() alt="">
          <h2 class="specs">Brand name : ${specs.brand}</h2>
        </div>`;
  });
}

function phoneExplanation() {
  phoneExplanation.innerHTML += ` <div class="container">
  <div class="img_div" >
  </div>
  <div class="content">
  </div>
</div>`;
}

let phoneSpecification;
async function gettingDetails(details) {
  await fetch(details)
    .then((res) => res.json())
    .then((data) => {
      phoneSpecification = {
        brand: data.data.brand,
        dimension: data.data.dimension,
        os: data.data.os,
        storage: data.data.storage,
      };
    });
  return phoneSpecification;
}

{
  /* <h3 class="specs">Dimension : ${specs.dimension}</h3>
<h3 class="specs">OS : ${specs.os}</h3>
<h3 class="specs">Storage : ${specs.storage}</h3> */
}
