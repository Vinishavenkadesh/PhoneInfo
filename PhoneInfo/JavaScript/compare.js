const allPhones = document.querySelector("#allPhones");
const samsung = document.querySelector("#samsung");
const redmi = document.querySelector("#redmi");
const poco = document.querySelector("#poco");
const result = document.querySelector("#result");
const onePlus = document.querySelector("#onePlus");
const search = document.getElementById("search");

// const url = "http://localhost:8000/allphones";

let compareItems = [];
{
  function labelClicked(name) {
    if (compareItems.includes(name)) {
      var index = compareItems.indexOf(name);
      if (index !== -1) {
        compareItems.splice(index, 1);
        console.log(compareItems)
      }
    } else if (compareItems.length < 3) {
      compareItems.push(name);
      console.log(compareItems);
    } else {
      alert("Cannot be clickable");
      }
      
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
  <img class="phoneDisplay" src="${val.Image}" />
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
}

fetch("phones").then((data) => showInfo(data));

function showInfo(data) {
  console.log(data);
}
