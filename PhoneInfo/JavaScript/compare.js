const allPhones = document.querySelector("#allPhones");
const samsung = document.querySelector("#samsung");
const redmi = document.querySelector("#redmi");
const poco = document.querySelector("#poco");
const result = document.querySelector("#result");
const onePlus = document.querySelector("#onePlus");
const search = document.getElementById("search");
const compareBtn = document.querySelector("#compareBtn");
const compareLists = document.querySelector("#compare-lists");
const closeCompare = document.querySelector("#close-compare");
const displayCompareItemsDiv = document.querySelector("#display-compare-items");
const phoneImage = document.querySelector("#phoneImageClickable")

// const url = "http://localhost:8000/allphones";

compareBtn.addEventListener("click", (e) => {
  // console.log("OPENED");
  compareLists.style.display = "block";
});

closeCompare.addEventListener("click", (e) => {
  // console.log("CLOSED");
  compareLists.style.display = "none";
});

let compareItems = [];
{
  function labelClicked(name) {
    if (compareItems.includes(name)) {
      var index = compareItems.indexOf(name);
      if (index !== -1) {
        compareItems.splice(index, 1);
        console.log(compareItems);
      }
    } else if (compareItems.length < 3) {
      compareItems.push(name);
      console.log(compareItems);
    } else {
      alert("Cannot be clickable");
    }
    displayCompareItemsDiv.innerHTML = ``;
    compareItems.forEach((val) => {
      let filPhones = phones.filter((res) => res.Name == val);
      displayCompareItemsDiv.innerHTML += `
      <div class="border-2 border-gray-300 p-[30px]" >
      <img src="${filPhones[0].Image}" class="h-[170px] w-[170px] pb-[10px] object-contain" alt="" srcset=""/>
      <h1 class="font-bold">Name : <span class="font-semibold">${filPhones[0].Name}</span></h1>
      <h1 class="font-bold">Brand : <span class="font-semibold">${filPhones[0].Brand}</h1>
      <h1 class="font-bold">Memory : <span class="font-semibold">${filPhones[0].Memory}</h1>
      <h1 class="font-bold">Display : <span class="font-semibold">${filPhones[0].Display}</span></h1>
      <h1 class="font-bold">Camera : <span class="font-semibold">${filPhones[0].Camera}</span></h1>
      <h1 class="font-bold">Battery : <span class="font-semibold">${filPhones[0].Battery}</span></h1>
      <h1 class="font-bold">Proccesor : <span class="font-semibold">${filPhones[0].Processor}</span></h1>
      <h1 class="font-bold text-blue-500"><a href="${filPhones[0].Amazon}">Amazon</a></h1>
      <h1 class="font-bold text-blue-500"><a href="${filPhones[0].Flipkart}">Flipkart</a></h1>
      </div>`;
    });
  }
}

const url = "http://localhost:5173/JavaScript/Phones.json";
let phones = [];
fetch(url)
  .then((res) => res.json())
  .then((val) => {
    phones = val;
    samsungFun(phones);
    redmiFun(phones);
    pocoFun(phones);
    onePlusFun(phones);
  });

function samsungFun(e) {
  let samsungArr = e.filter((val) => val.Brand.toLowerCase() === "samsung");
  samsungArr.forEach((val) => {
    samsung.innerHTML += `<div>
  <img class="phoneDisplay" id="phoneImageClickable" src="${val.Image}" />
  <h3 class="phoneName">${val.Name}</h3>
  <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input type="checkbox" id="'${val.Name}'" onInput="labelClicked('${val.Name}')">
    <label class="label" for="'${val.Name}'"><h3>Add to compare</h3></label>
  </div>
</div>`;
  });
}

function redmiFun(e) {
  let redmiArr = e.filter((val) => val.Brand.toLowerCase() === "redmi");
  redmiArr.forEach((val) => {
    redmi.innerHTML += `
    <div>
    <img class="phoneDisplay" src="${val.Image}">
    <h3 class="phoneName">${val.Name}</h3>
    <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input type="checkbox" id="'${val.Name}'" onInput="labelClicked('${val.Name}')">
    <label class="label" for="'${val.Name}'"><h3>Add to compare</h3></label>
    </div>
    </div>`;
  });
}

function pocoFun(e) {
  let pocoArr = e.filter((val) => val.Brand.toLowerCase() === "poco");
  pocoArr.forEach((val) => {
    poco.innerHTML += `
    <div>
    <img class="phoneDisplay" src="${val.Image}">
    <h3 class="phoneName">${val.Name}</h3>
    <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input type="checkbox" id="'${val.Name}'" onInput="labelClicked('${val.Name}')">
    <label class="label" for="'${val.Name}'"><h3>Add to compare</h3></label>
    </div>
    </div>`;
  });
}

function onePlusFun(e) {
  let onePlusArr = e.filter((val) => val.Brand.toLowerCase() === "oneplus");
  onePlusArr.forEach((val) => {
    onePlus.innerHTML += `
    <div>
    <img class="phoneDisplay" src="${val.Image}">
    <h3 class="phoneName">${val.Name}</h3>
    <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input type="checkbox" id="'${val.Name}'" onInput="labelClicked('${val.Name}')">
    <label class="label" for="${val.Name}"><h3>Add to compare</h3></label>
    </div>
    </div>`;
  });
}

function getvalue() {
  result.style.display = "block";
  let text = search.value;
  let searchArr = phones.filter((val) => {
    return (
      val.Name.toLowerCase().includes(text) ||
      val.Brand.toLowerCase().includes(text)
    );
  });
  
  console.log(searchArr);
  if (text === "") {
    result.innerHTML = "";
  } else {
    result.innerHTML = "";
    searchArr.forEach((val) => {
      result.innerHTML += `<h2 class="searchBar">${val.Name}</h2>`;
    });
  }

  const searchBar = document.querySelectorAll(".searchBar");
  searchBar.forEach((element) => {
    element.addEventListener("click", (e) => {
      search.value = e.target.innerHTML;
      console.log(e.target.innerHTML);
      result.style.display = "none";
    });
  });
}

fetch("phones").then((data) => showInfo(data));

function showInfo(data) {
  console.log(data);
}

