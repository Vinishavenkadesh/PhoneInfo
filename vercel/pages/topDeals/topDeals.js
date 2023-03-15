const tracking = document.querySelector("#track");
const phoneImage = document.querySelector("#phoneImageClickable");
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
          <img class="image" src=${val.image} 
          id="phoneImageClickable" 
          onclick="phoneExplanation('${(val.phone_name)}')">
          <h2 class="specs">Brand name : ${specs.brand}</h2>
        </div>`;
  });
}

function phoneExplanation(name) {
  console.log(name);
  // phoneImage.innerHTML += `<div class="border-2 border-gray-300 p-[30px]" >
  //   <img src="${val.Image}" class="h-[170px] w-[170px] pb-[10px] object-contain" alt="" srcset=""/>
  //   <h1 class="font-bold">Name : <span class="font-semibold">${val.Name}</span></h1>
  //   <h1 class="font-bold">Brand : <span class="font-semibold">${val.Brand}</span></h1>
  //   <h1 class="font-bold">Memory : <span class="font-semibold">${val.Memory}</span></h1>
  //   <h1 class="font-bold">Display : <span class="font-semibold">${val.Display}</span></h1>
  //   <h1 class="font-bold">Camera : <span class="font-semibold">${val.Camera}</span></h1>
  //   <h1 class="font-bold">Battery : <span class="font-semibold">${val.Battery}</span></h1>
  //   <h1 class="font-bold">Proccesor : <span class="font-semibold">${val.Processor}</span></h1>
  //  <h1 class="font-bold text-blue-500"><a href="${val.Amazon}">Amazon</a></h1>
  //   <h1 class="font-bold text-blue-500"><a href="${val.Flipkart}">Flipkart</a></h1>
  //   </div>`;
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
