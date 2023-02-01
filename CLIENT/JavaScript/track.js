const tracking = document.querySelector("#track")

const arr = [
    {
        name : "Vivo",
        img : "https://m.media-amazon.com/images/I/71AvQd3VzqL._SL1500_.jpg",
        price : 23000,
    },
    {
        name : "Poco",
        img : "https://m.media-amazon.com/images/I/71AvQd3VzqL._SL1500_.jpg",
        price : 30000,
    },
    {
        name : "OnePlus",
        img : "https://m.media-amazon.com/images/I/71AvQd3VzqL._SL1500_.jpg",
        price : 3000,
    },
    {
        name : "Samsung",
        img : "https://m.media-amazon.com/images/I/71AvQd3VzqL._SL1500_.jpg",
        price : 2000,
    },
    {
        name : "Nokia",
        img : "https://m.media-amazon.com/images/I/71AvQd3VzqL._SL1500_.jpg",
        price : 200000,
    }
]

arr.forEach((val)=>{
    tracking.innerHTML+=
    `<div class = "phoneDiv"><h1>${val.name}</h1>
    <img class="image" src=${val.img} alt="">
    <h3>${val.price}</h3></div>`
})