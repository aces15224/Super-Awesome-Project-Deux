$(document).ready(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCZi3hYSq6X4oe7iyXUwwQFC-TyPnHptJw",
    authDomain: "project-2-super-awesome.firebaseapp.com",
    databaseURL: "https://project-2-super-awesome.firebaseio.com",
    projectId: "project-2-super-awesome",
    storageBucket: "project-2-super-awesome.appspot.com",
    messagingSenderId: "272659106499",
    appId: "1:272659106499:web:2f1567247609fd67b6f076",
    measurementId: "G-VG9DZM1RZL"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
  // Initialize Firebase


  //listen for auth changes
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      return user;
    }
  });
  //sign up
  const signupForm = document.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user & add firestore data
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        bio: signupForm['signup-bio'].value
      });
    }).then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector('.error').innerHTML = ''
    }).catch(err => {
      signupForm.querySelector('.error').innerHTML = err.message;
    });
  });

  //Logout
  var logout = document.querySelector("#logout")
  logout.addEventListener("click", function e() {
    e.preventDefault();
    auth.signOut().then(() => {
    });
  });

  //Login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
      loginForm.querySelector('.error').innerHTML = err.message;
    });

  });
});