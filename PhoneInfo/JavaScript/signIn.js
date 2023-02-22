// const signUp = document.getElementById("signUp");
const authState = document.getElementById("authState");
const googleSignIn = document.getElementById("googleSignIn");
const eye = document.getElementById("eye");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const facebookSignIn = document.getElementById("facebookSignIn");
const authSubmit = document.getElementById("authSubmit");

// const signOut = document.getElementById("signOut")

togglePassword.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the icon
  this.classList.toggle("bi-eye");
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
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

authState.addEventListener("click", (e) => {
  const authentication = authState.innerHTML;
  if (authentication == "Login") {
    authState.innerHTML = `Sign Up`;
    authSubmit.innerHTML = `Login`;
  } else {
    authState.innerHTML = `Login`;
    authSubmit.innerHTML = `Sign Up`;
  }
});

authSubmit.addEventListener("click", async (e) => {
  const authentication = authSubmit.innerText;
  console.log(authentication);
  if (authentication == `SIGN UP`) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(authentication, email, password);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        sessionStorage.setItem("user", true);
        alert("User logged in");
        // ...
      })
      .then(() => {
        window.location = "/index.html";
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("ERRRORRR");
        alert(errorMessage);
        // ..
      });
  } else {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log(authentication, email, password);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        sessionStorage.setItem("user", true);
        alert("User logged in");
        // ...
      })
      .then(() => {
        window.location = "/index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
});

const googleProvider = new GoogleAuthProvider(app);
googleSignIn.addEventListener("click", async (e) => {
  await signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      sessionStorage.setItem("user", true);
      alert("User logged in");
      // ...
    })
    .then(() => {
      console.log("SESSION STORAGE : ", sessionStorage.getItem("user"));
      window.location = "/index.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });
});

const facebookProvider = new FacebookAuthProvider();

facebookSignIn.addEventListener("click", async (e) => {
  await signInWithPopup(auth, facebookProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      sessionStorage.setItem("user", true);
      alert("User logged in");
      // ...
    })
    .then(() => {
      window.location = "/index.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      alert(errorMessage);

      // ...
    });
});
