const login = document.getElementById("login");
const signUp = document.getElementById("signUp");

console.log("login");

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDWWgDbdmd4_C90D7CmCrbmJ9Bh8YPRzHc",
  authDomain: "phoneinfo-23329.firebaseapp.com",
  databaseURL: "https://phoneinfo-23329-default-rtdb.firebaseio.com",
  projectId: "phoneinfo-23329",
  storageBucket: "phoneinfo-23329.appspot.com",
  messagingSenderId: "565839446144",
  appId: "1:565839446144:web:d2ff5ea5b5b014b9832665",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

signUp.addEventListener("click", (e) => {
let username = document.getElementById("username").value;
let email = document.getElementById("signup-email").value;
let password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("user created!");
      set(ref(database, "users/" + user.uid), {
        username: username,
        email: email,
      });
    })
    .then(()=>{
        window.location.href = "/index.html"
     })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
      // ..
    });
});

login.addEventListener("click", (e) => {
let email = document.getElementById("login-email").value;
let password = document.getElementById("login-password").value;

  console.log(email);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: dt,
        // ...
      });
      alert("User logged in!");

      if (alert("User logged in!") == "true") {
      }
    }).then(()=>{
        window.location.href = "/index.html"
     })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
  } else {
  }
});

// logout.addEventListener("click", (e) => {
//   const auth = getAuth();
//   signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//       alert("User logged out!");
//     })
//     .catch((error) => {
//       // An error happened.
//       const errorCode = error.code;
//       const errorMessage = error.message;

//       alert(errorMessage);
//     });
// });
