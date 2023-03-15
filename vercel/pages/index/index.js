import "./style.css";

const phone1 = new URL("/phone1.jpg", import.meta.url).href;
document.getElementById("phone1").src = phone1;

const phone2 = new URL("/phone2.png", import.meta.url).href;
document.getElementById("phone2").src = phone2;

const scrollable = new URL("/scrollable.svg", import.meta.url).href;
document.getElementById("scrollable").src = scrollable;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6Qb9h0s2EbMA6qIEBcj3hJwrgQXAwfHo",
  authDomain: "phoneinfo-5a3d0.firebaseapp.com",
  databaseURL: "https://phoneinfo-5a3d0-default-rtdb.firebaseio.com",
  projectId: "phoneinfo-5a3d0",
  storageBucket: "phoneinfo-5a3d0.appspot.com",
  messagingSenderId: "532291497519",
  appId: "1:532291497519:web:7ec57d6894bad3f46360da",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const homeSignIn = document.getElementById("homeSignIn");

const user = sessionStorage.getItem("user");
console.log("SESSION STORAGE IN HOMEPAGE : ", sessionStorage.getItem("user"));
if (user) {
  homeSignIn.innerText = `Log Out`;
}
homeSignIn.addEventListener("click", async (e) => {
  const homeSign = homeSignIn.innerHTML;
  if (homeSign == "Log Out") {
    sessionStorage.removeItem("user");
    await signOutAuth();
  } else {
    window.location = "/HTML/signIn.html";
  }
});

async function signOutAuth() {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Signed out Successfully");
    })
    .then(() => {
      window.location = "/HTML/signIn.html";
    })
    .catch((error) => {
      // An error happened.

      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}
