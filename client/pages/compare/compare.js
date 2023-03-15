const allPhones = document.querySelector("#allPhones");
const samsung = document.querySelector("#samsung");
const redmi = document.querySelector("#redmi");
const poco = document.querySelector("#poco");
const onePlus = document.querySelector("#onePlus");
const search = document.getElementById("search");
const result = document.querySelector("#result");
const compareBtn = document.querySelector("#compareBtn");
const compareLists = document.querySelector("#compare-lists");
const closeCompare = document.querySelector("#close-compare");
const displayCompareItemsDiv = document.querySelector("#display-compare-items");
const phoneExpandLists = document.getElementById("phone-expand-lists");
const closePhoneExpandBtn = document.getElementById("close-phone-expand");
const displayPhoneItems = document.getElementById("display-phone-items");
const phoneImage = document.querySelector(".phoneImageClickable");
const body = document.querySelector("#body");
const phonedisplayinput = document.querySelector("#phonedisplayinput");
const phoneNameCompare = document.querySelector("#phoneName");
const phoneImageCompare = document.querySelector("#phoneImage");
const phoneMemoryCompare = document.querySelector("#phoneMemory");
const phoneDisplayCompare = document.querySelector("#phoneDisplay");
const phoneCameraCompare = document.querySelector("#phoneCamera");
const phoneProcessorCompare = document.querySelector("#phoneProcessor");
const phoneBatteryCompare = document.querySelector("#phoneBattery");
const phoneECommerceCompare = document.querySelector("#phoneECommerce");


compareBtn.addEventListener("click", (e) => {
  // console.log("OPENED");

  if (compareItems.length > 1) {
    compareLists.style.display = "block";
    body.style.overflow = "hidden";
  } else {
    alert("To Compare atleast click two phones");
  }
});

closeCompare.addEventListener("click", (e) => {
  // console.log("CLOSED");
  compareLists.style.display = "none";
  body.style.overflow = "auto";
  body.style.overflowX = "hidden";
});

let compareItems = [];

function labelClicked(name) {
  if (compareItems.includes(name)) {
    var index = compareItems.indexOf(name);
    if (index !== -1) {
      compareItems.splice(index, 1);
    }
  } else if (compareItems.length < 3) {
    compareItems.push(name);
  } else {
    document.getElementById(name).checked = false;
  }

  phoneNameCompare.innerHTML = ``;
  phoneImageCompare.innerHTML = ``;
  phoneMemoryCompare.innerHTML = ``;
  phoneDisplayCompare.innerHTML = ``;
  phoneCameraCompare.innerHTML = ``;
  phoneBatteryCompare.innerHTML = ``;
  phoneProcessorCompare.innerHTML = ``;
  phoneECommerceCompare.innerHTML = ``;

  compareItems.forEach((val) => {
    let filPhones = phones.filter((res) => res.Name == val);
    phoneNameCompare.innerHTML += `<h1 class="font-medium">${filPhones[0].Name}</h1>`;
    phoneImageCompare.innerHTML += ` <img
    src="${filPhones[0].Image}"
    class="h-[170px] w-[170px] object-contain"
  />`;
    phoneMemoryCompare.innerHTML += `<h1 class="font-medium">${filPhones[0].Memory}</h1>`;
    phoneDisplayCompare.innerHTML += `<h1 class="font-medium">
  ${filPhones[0].Display}
</h1>`;
    phoneCameraCompare.innerHTML += `<h1 class="font-medium">${filPhones[0].Camera}</h1>`;
    phoneBatteryCompare.innerHTML += `<h1 class="font-medium">
  ${filPhones[0].Battery}
</h1>`;
    phoneProcessorCompare.innerHTML += `<h1 class="font-medium">
  ${filPhones[0].Processor}
</h1>`;
    phoneECommerceCompare.innerHTML += `<div><button class="px-3 py-1 bg-green-400 rounded-sm text-black mr-2">
    <a href="${filPhones[0].Amazon}">Amazon</a>
    </button>
    <button class="px-3 py-1 bg-green-400 rounded-sm text-black mr-2">
    <a href="${filPhones[0].Flipkart}">Flipkart</a>
    </button></div>`;
  });
}

// const url = "https://phoneinfo-rpzt.onrender.com/allphones";
const url = "http://localhost:8000/allphones";
// const url = new URL("/phones.json", import.meta.url).href;
console.log(url)
console.log("UPDATED");

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
  // console.log(samsungArr);
  samsungArr.forEach((val) => {
    samsung.innerHTML += `<div class="phonesOuterDiv">
  <img class="phoneDisplay phonesLoopSamsung phoneImageClickableSamsung" src="${val.Image}" />
  <h3 class="phoneName">${val.Name}</h3>
  <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input class="labelClickedSamsung" type="checkbox" id="${val.Name}">
    <label class="label" for="${val.Name}"><h3>Add to compare</h3></label>
  </div>
  </div>`;
  });

  const phonesLabelClickingSamsung = document.querySelectorAll(".labelClickedSamsung");
  phonesLabelClickingSamsung.forEach((phones,index) => { 
    phones.addEventListener ("click",(val) => {
      labelClicked(samsungArr[index].Name);
    })
  })

  const phonesLoopSamsung = document.querySelectorAll(".phonesLoopSamsung");
  phonesLoopSamsung.forEach((div, index) => {
    div.addEventListener("click", (e) => {
      showPhoneExpand(samsungArr[index]);
    });
  });
}

function redmiFun(e) {
  let redmiArr = e.filter((val) => val.Brand.toLowerCase() === "redmi");
  redmiArr.forEach((val) => {
    redmi.innerHTML += `
    <div class="phonesOuterDiv">
    <img class="phoneDisplay phonesLoopRedmi phoneImageClickable" src="${val.Image}">
    <h3 class="phoneName">${val.Name}</h3>
    <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input type="checkbox" class="labelClickedRedmi" id="${val.Name}">
    <label class="label" for="${val.Name}"><h3>Add to compare</h3></label>
    </div>
    </div>`;
  });
  const phonesLabelClickingRedmi = document.querySelectorAll(".labelClickedRedmi");
  phonesLabelClickingRedmi.forEach((phones,index) => { 
    phones.addEventListener ("click",(val) => {
      labelClicked(redmiArr[index].Name);
    })
  })

  const phonesLoopRedmi = document.querySelectorAll(".phonesLoopRedmi");
  phonesLoopRedmi.forEach((div, index) => {
    div.addEventListener("click", (e) => {
      showPhoneExpand(redmiArr[index]);
    });
  });
}

function pocoFun(e) {
  let pocoArr = e.filter((val) => val.Brand.toLowerCase() === "poco");
  pocoArr.forEach((val) => {
    poco.innerHTML += `
    <div class="phonesOuterDiv">
    <img class="phoneDisplay phonesLoopPoco phoneImageClickable" src="${val.Image}">
    <h3 class="phoneName">${val.Name}</h3>
    <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input type="checkbox" class="labelClickedPoco" id="${val.Name}">
    <label class="label" for="${val.Name}"><h3>Add to compare</h3></label>
    </div>
    </div>`;
  });

  const phonesLabelClickingPoco = document.querySelectorAll(".labelClickedPoco");
  phonesLabelClickingPoco.forEach((phones,index) => { 
    phones.addEventListener ("click",(val) => {
      labelClicked(pocoArr[index].Name);
    })
  })

  const phonesLoopPoco = document.querySelectorAll(".phonesLoopPoco");
  phonesLoopPoco.forEach((div, index) => {
    div.addEventListener("click", (e) => {
      showPhoneExpand(pocoArr[index]);
    });
  });
}

function onePlusFun(e) {
  let onePlusArr = e.filter((val) => val.Brand.toLowerCase() === "oneplus");
  onePlusArr.forEach((val) => {
    onePlus.innerHTML += `
    <div class="phonesOuterDiv">
    <img class="phoneDisplay phonesLoopOnePlus phoneImageClickable" src="${val.Image}">
    <h3 class="phoneName">${val.Name}</h3>
    <h2 class="phoneBrand">Brand : ${val.Brand}</h2>
    <div class="toCompare"><input type="checkbox" class="labelClickedOnePlus" id="${val.Name}">
    <label class="label" for="${val.Name}"><h3>Add to compare</h3></label>
    </div>
    </div>`;
  });

  const phonesLabelClickingOnePlus = document.querySelectorAll(".labelClickedOnePlus");
  phonesLabelClickingOnePlus.forEach((phones,index) => { 
    phones.addEventListener ("click",(val) => {
      labelClicked(onePlusArr[index].Name);
    })
  })

  const phonesLoopOnePlus = document.querySelectorAll(".phonesLoopOnePlus");
  phonesLoopOnePlus.forEach((div, index) => {
    div.addEventListener("click", (e) => {
      showPhoneExpand(onePlusArr[index]);
    });
  });
}



search.addEventListener("input",()=>{
  getvalue();
})

function getvalue() {
  result.style.display = "block";
  let text = search.value;
  let searchArr = phones.filter((val) => {
    return (
      val.Name.toLowerCase().includes(text.toLowerCase()) ||
      val.Name.toLowerCase().includes(text)
    );
  });
  

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
      const targetPhone = phones.filter((value) => {
        return value.Name == search.value;
      });
      showPhoneExpand(targetPhone[0]);
      // console.log(targetPhone);
      search.value = "";
      result.style.display = "none";
    });
  });
}

closePhoneExpandBtn.addEventListener("click", () => {
  phoneExpandLists.style.display = "none";
  body.style.overflowX = "auto";
  body.style.overflowY = "auto";
});

function showPhoneExpand(val) {
  const name = val.Name;
  const img = val.Image;
  const brand = val.Brand;
  const memory = val.Memory;
  const display = val.Display;
  const camera = val.Camera;
  const battery = val.Battery;
  const processor = val.Processor;
  const amazon = val.Amazon;
  const flipkart = val.Flipkart;
  const price = val.Price;
  console.log(val);

  phoneExpandLists.style.display = "block";
  window.scrollTo(0, 0);
  body.style.overflow = "hidden";

  const innerHTMLVal = `
    <img
    src="${img}"
    class=" w-[45%] h-[80vh] object-contain "
  />
  <div class=" w-[55%]">
    <!-- about the product -->
    <div>
      <div
        class="bg-yellow-300 h-12 w-full flex justify-start items-center"
      >
        <h1 class="pr-2 font-medium sm:text-[25px] md:text-2xl">ABOUT THE PRODUCT</h1>
      </div>
      <h1 class="sm:text-l md:text-xl font-medium">${name}</h1>
      <h1 class="mt-3 font-semibold text-xl">
        <h2 class="mt-2 font-normal sm:text-l text-gray-500">${brand}</h2>
        Memory: <span class="text-base">${memory}</span>
        <br />
        Display : <span class="text-base">${display}</span>
        <br />
        Camera : <span class="text-base">${camera}</span
        ><br />
        Battery : <span class="text-base">${battery}</span
        ><br />
        Processor : <span class="text-base">${processor}</span>
      </h1>
      <div class="mt-4 flex">
        <button
        onclick="NewTab('${amazon}')"
          class="px-3 py-1 bg-green-400 rounded-sm text-black mr-2"
        >
          AMAZON
        </button>
        <button
        onclick="NewTab('${flipkart}')"
        class="px-3 py-1 bg-green-400 rounded-sm text-black mr-2">
          FLIPKART
        </button>
      </div>
    </div>
    <canvas id="priceTrackerGraph"
    style="display: block; box-sizing: border-box; height: 240px; width: 90%; margin-top: 2rem"
    ></canvas>
  </div>`;

  displayPhoneItems.innerHTML = innerHTMLVal;
  drawPriceGraph(price);
}

function drawPriceGraph(price) {
  const ctx = document.getElementById("priceTrackerGraph");

  const data = price;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: "Amazon price history",
          data: data.map((row) => row.value),
          borderColor: "#FF6384",
          backgroundColor: "#FFB1C1",
        },
      ],
    },
  });
}

function NewTab(url) {
  window.open(url, "_blank");
}
