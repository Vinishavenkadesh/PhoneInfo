const googleSignIn = document.getElementById("googleSignIn")
const facebookSignIn = document.getElementById("facebookSignIn")

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCjLWGUlpizjZiLy3-1sRPS31q7_k3RVm8",
    authDomain: "phoneinfo-c80ec.firebaseapp.com",
    projectId: "phoneinfo-c80ec",
    storageBucket: "phoneinfo-c80ec.appspot.com",
    messagingSenderId: "428767746427",
    appId: "1:428767746427:web:a8ae6753110f792f4ac5de"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(app);

  googleSignIn.addEventListener("click",(e)=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    alert("Logged Successfully")
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).then(()=>{
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
    alert(errorMessage)
    // ...
  });

  googleSignIn.addEventListener("click",(e)=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      alert("Signed Out")
    }).catch((error) => {
      // An error happened.
      alert(error)
    });
  })

  
  })
  
